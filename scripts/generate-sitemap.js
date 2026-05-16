/**
 * Sitemap Generator for Programmatic SEO
 * Run: node scripts/generate-sitemap.js
 * Auto-runs as postbuild via package.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://roopstoneimpex.in';
const TODAY = new Date().toISOString().split('T')[0];

// ── Import product data directly (simple parse) ────────────
// We parse the products.ts to extract IDs rather than running TS
const productsFile = readFileSync(resolve(__dirname, '../src/data/products.ts'), 'utf8');
const productIdRegex = /id:\s*["']([^"']+)["']/g;
const categoryRegex = /category:\s*["']([^"']+)["']/g;
const productIds = [];
const productCategories = [];
let m;
while ((m = productIdRegex.exec(productsFile))) productIds.push(m[1]);
while ((m = categoryRegex.exec(productsFile))) productCategories.push(m[1]);

// ── Static pages ───────────────────────────────────────────
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/products', priority: '0.9', changefreq: 'weekly' },
  { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/incubator', priority: '0.5', changefreq: 'monthly' },
  { url: '/apply', priority: '0.4', changefreq: 'monthly' },
];

// ── Product pages ──────────────────────────────────────────
const productPages = productIds.map(id => ({
  url: `/products/${id}`, priority: '0.8', changefreq: 'monthly',
}));

// ── Application definitions (mirrored from seoPages.ts) ────
const applications = [
  'patio-paving', 'driveway', 'wall-cladding', 'flooring',
  'pool-surround', 'garden-path', 'roofing', 'countertop',
  'fireplace', 'facade', 'landscape', 'bathroom',
  'commercial-flooring', 'step-treads-copings',
];

const appCategories = {
  'patio-paving': ['sandstone', 'limestone', 'quartzite', 'slate'],
  'driveway': ['sandstone', 'limestone', 'quartzite'],
  'wall-cladding': ['quartzite', 'sandstone', 'slate', 'marble'],
  'flooring': ['limestone', 'marble', 'quartzite', 'sandstone', 'slate'],
  'pool-surround': ['sandstone', 'limestone', 'quartzite'],
  'garden-path': ['sandstone', 'limestone', 'slate', 'quartzite'],
  'roofing': ['slate'],
  'countertop': ['quartzite', 'marble', 'limestone'],
  'fireplace': ['quartzite', 'slate', 'sandstone'],
  'facade': ['sandstone', 'quartzite', 'limestone', 'marble'],
  'landscape': ['sandstone', 'limestone', 'quartzite', 'slate'],
  'bathroom': ['marble', 'limestone', 'slate', 'quartzite'],
  'commercial-flooring': ['limestone', 'quartzite', 'marble'],
  'step-treads-copings': ['sandstone', 'limestone', 'quartzite'],
};

// Read product names from file for slug generation
const nameRegex = /name:\s*["']([^"']+)["']/g;
const productNames = [];
while ((m = nameRegex.exec(productsFile))) productNames.push(m[1]);

// Build application pages
const applicationPages = [];
for (const app of applications) {
  const cats = appCategories[app] || [];
  for (let i = 0; i < productIds.length && i < productNames.length && i < productCategories.length; i++) {
    if (cats.includes(productCategories[i]) && productCategories[i] !== 'mosaic') {
      const stoneSlug = productNames[i].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      applicationPages.push({
        url: `/stone/${stoneSlug}-for-${app}`,
        priority: '0.7',
        changefreq: 'monthly',
      });
    }
  }
}

// ── Comparison pages ───────────────────────────────────────
const comparisonSlugs = [
  'kandla-grey-vs-raj-green-sandstone', 'autumn-brown-vs-raveena-sandstone',
  'buff-vs-dholpur-beige-sandstone', 'teakwood-vs-rainbow-sandstone',
  'agra-red-vs-heritage-pink-sandstone', 'monsoon-black-vs-chocolate-sandstone',
  'gwalior-mint-vs-raj-green-sandstone', 'fossil-vs-lalitpur-yellow-sandstone',
  'kota-blue-vs-kadappa-black-limestone', 'kota-brown-vs-kota-blue-limestone',
  'jaisalmer-yellow-vs-ita-gold-limestone', 'pearl-gold-vs-shabad-yellow-limestone',
  'silver-shine-vs-silver-grey-quartzite', 'deoli-green-vs-ocean-green-quartzite',
  'copper-vs-golden-quartzite', 'himachal-white-vs-silver-shine-quartzite',
  'jak-black-vs-california-gold-slate', 'indian-autumn-vs-kund-multi-slate',
  'sandstone-vs-limestone-paving', 'quartzite-vs-sandstone-cladding',
  'slate-vs-sandstone-paving', 'quartzite-vs-limestone-flooring',
  'marble-vs-quartzite-countertops', 'slate-vs-quartzite-cladding',
];

const comparisonPages = comparisonSlugs.map(slug => ({
  url: `/compare/${slug}`, priority: '0.7', changefreq: 'monthly',
}));

// ── Export pages ───────────────────────────────────────────
const exportCountries = {
  usa: ['quartzite', 'sandstone', 'slate', 'marble'],
  uk: ['sandstone', 'limestone', 'slate', 'quartzite'],
  australia: ['sandstone', 'quartzite', 'limestone'],
  canada: ['quartzite', 'slate', 'sandstone'],
  uae: ['marble', 'limestone', 'sandstone'],
  germany: ['quartzite', 'sandstone', 'slate'],
  france: ['limestone', 'sandstone', 'marble'],
  'saudi-arabia': ['marble', 'limestone', 'sandstone'],
  'south-africa': ['sandstone', 'quartzite', 'slate'],
  italy: ['marble', 'quartzite', 'limestone'],
};

const exportPages = [];
for (const [country, cats] of Object.entries(exportCountries)) {
  for (const cat of cats) {
    exportPages.push({
      url: `/export/${cat}-to-${country}`, priority: '0.7', changefreq: 'monthly',
    });
  }
}

// ── Generate XML ───────────────────────────────────────────
const allPages = [...staticPages, ...productPages, ...applicationPages, ...comparisonPages, ...exportPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outPath = resolve(__dirname, '../dist/sitemap.xml');
try {
  writeFileSync(outPath, xml);
  console.log(`✅ Sitemap generated: ${allPages.length} URLs → dist/sitemap.xml`);
} catch {
  // dist/ might not exist yet during dev — write to public/
  const pubPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(pubPath, xml);
  console.log(`✅ Sitemap generated: ${allPages.length} URLs → public/sitemap.xml`);
}
