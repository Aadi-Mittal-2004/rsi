/** Build the sitemap and readable HTML from the same data as the application. */
import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = 'https://www.roopstoneimpex.in';
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
process.env.NODE_ENV = 'production';
const server = await createServer({ root, mode: 'production', configFile: false, resolve: { alias: { '@': resolve(root, 'src') } }, esbuild: { jsx: 'automatic' }, ssr: { noExternal: ['react-helmet-async'] }, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true, hmr: false, watch: null, preTransformRequests: false }, appType: 'custom', logLevel: 'error' });
try {
  const { getSeoRoutes, prerenderPaths, blogPosts } = await server.ssrLoadModule('/src/seo/routes.ts');
  const { blogPath } = await server.ssrLoadModule('/src/lib/seo.ts');
  const routes = [...new Map(getSeoRoutes().map(r => [r.path, r])).values()];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routes.map(route => {
    const post = blogPosts.find(p => blogPath(p) === route.path);
    const family = post?.guide?.translationOf || post?.slug;
    const editions = post ? blogPosts.filter(p => p.slug === family || p.guide?.translationOf === family) : [];
    const defaultEdition = editions.find(p => p.slug === family) || post;
    const links = editions.length > 1 ? [...editions.map(p => ({ language: p.language || 'en', path: blogPath(p) })), { language: 'x-default', path: blogPath(defaultEdition) }] : [];
    return `  <url><loc>${escapeXml(site + route.path)}</loc>${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}${links.map(l => `<xhtml:link rel="alternate" hreflang="${l.language}" href="${escapeXml(site + l.path)}" />`).join('')}</url>`;
  }).join('\n')}\n</urlset>\n`;
  await writeFile(resolve(root, 'public/sitemap.xml'), xml);
  await writeFile(resolve(root, 'dist/sitemap.xml'), xml);
  const manifest = JSON.parse(await readFile(resolve(root, 'dist/.vite/manifest.json'), 'utf8'));
  const assets = Object.entries(manifest).filter(([key]) => key.startsWith('src/')).map(([key, value]) => [`/${key}`, encodeURI(`/${value.file}`)]);
  const resolveAssets = html => {
    for (const [source, output] of assets) html = html.replaceAll(source, output).replaceAll(encodeURI(source), output);
    return html;
  };
  let template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  // Each rendered page supplies its own metadata and schemas. Retain fonts, CSS,
  // favicon, theme tags and the same client bundle used by the SPA.
  template = template.replace(/<title[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name|property)="(?:description|keywords|robots|googlebot|author|og:[^"]+|twitter:[^"]+|geo\.[^"]+|ICBM)"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/gi, '')
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/gi, '');
  const { renderSeoPage } = await server.ssrLoadModule('/src/seo/render.tsx');
  for (const path of prerenderPaths) {
    const rendered = renderSeoPage(path);
    const html = resolveAssets(template.replace('<html lang="en">', `<html lang="${rendered.language}">`).replace('</head>', `${rendered.head}\n</head>`).replace('<div id="root"></div>', `<div id="root">${rendered.body}</div>`));
    if (!html.includes('<h1') || !html.includes('rel="canonical"')) throw new Error(`Incomplete prerender: ${path}`);
    const output = resolve(root, `dist${path}/index.html`);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
  }
  console.log(`Generated ${routes.length} sitemap URLs and ${prerenderPaths.length} readable HTML pages.`);
} finally {
  await server.close();
}
