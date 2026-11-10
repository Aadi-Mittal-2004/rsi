import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.env.NODE_ENV = 'production';
const server = await createServer({
  root, configFile: false,
  resolve: { alias: { '@': resolve(root, 'src') } }, esbuild: { jsx: 'automatic' },
  ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, hmr: false, watch: null, preTransformRequests: false },
  appType: 'custom', logLevel: 'error',
});

try {
  const { renderSeoPage } = await server.ssrLoadModule('/src/seo/render.tsx');
  const { products } = await server.ssrLoadModule('/src/data/products.ts');
  const { getAllApplicationSlugs } = await server.ssrLoadModule('/src/data/seoPages.ts');
  const { buildProductPageStructuredData } = await server.ssrLoadModule('/src/lib/productStructuredData.ts');
  const pages = [...products.map(product => `/products/${product.id}`), ...getAllApplicationSlugs().map(page => `/stone/${page.slug}`)];
  const reported = new Set([
    '/stone/michel-angelo-marble-for-facade',
    '/stone/new-bronze-marble-for-facade',
    '/stone/smoky-brown-marble-for-wall-cladding',
  ]);
  let priced = 0, quoteOnly = 0;
  for (const path of pages) {
    const { head, body } = renderSeoPage(path);
    const html = head + body;
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    const main = schemas.filter(schema => schema['@type'] === 'Product' || schema['@type'] === 'WebPage');
    assert.equal(main.length, 1, `Expected one page schema: ${path}`);
    const schema = main[0];
    assert.equal(schema.url, `https://www.roopstoneimpex.in${path}`);
    assert.equal((body.match(/<h1\b/g) || []).length, 1, `Missing page content: ${path}`);
    assert(head.includes('index, follow'), `Page must remain indexable: ${path}`);
    assert(!schema.review && !schema.aggregateRating, `No invented reviews: ${path}`);
    if (reported.has(path)) {
      assert.equal(schema['@type'], 'WebPage', `Quote-only regression: ${path}`);
      reported.delete(path);
    }
    if (schema['@type'] === 'Product') {
      priced++;
      assert.equal(schema.offers?.['@type'], 'Offer', `Missing offers: ${path}`);
      assert.equal(schema.offers.priceCurrency, 'USD');
      assert(Number.isFinite(Number(schema.offers.price)) && Number(schema.offers.price) > 0, `Invalid public price: ${path}`);
      assert(body.includes(`$${schema.offers.price}`), `Offer must match a visible price: ${path}`);
      assert.equal(schema.offers.url, schema.url);
      assert.equal(schema.offers.priceSpecification.referenceQuantity.unitCode, 'FTK');
      assert(schema.image?.startsWith('https://www.roopstoneimpex.in/'), `Absolute product image: ${path}`);
    } else {
      quoteOnly++;
      assert(!JSON.stringify(schema).includes('"@type":"Product"'), `Nested invalid Product: ${path}`);
      assert(!schema.offers, `Quote-only page must not invent an offer: ${path}`);
      assert(body.includes('Request a Quote'), `Enquiry remains available: ${path}`);
    }
  }
  for (const price of [undefined, null, 0, -1, NaN, Infinity]) {
    assert.equal(buildProductPageStructuredData({ name: 'Quote-only stone', description: 'Custom stone', sku: 'sample', category: 'stone', url: '/products/sample', price })['@type'], 'WebPage');
  }
  assert.equal(reported.size, 0, 'All three reported routes must be checked');
  assert.equal(pages.length, 1038, 'Expected all 152 products and 886 application pages');
  assert(priced > 0 && quoteOnly > 0);
  console.log(`Product schema checks passed across ${pages.length} routes: ${priced} priced Product pages, ${quoteOnly} quote-only WebPages; all three reported URLs covered.`);
} finally {
  await server.close();
}
