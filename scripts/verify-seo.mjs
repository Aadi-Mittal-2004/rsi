import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const site = 'https://www.roopstoneimpex.in';
const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URLs');
assert(locations.every(url => url.startsWith(site + '/') && !url.includes('?') && !url.includes('#')), 'Noncanonical sitemap URL');
const paths = new Set(locations.map(url => new URL(url).pathname));
let htmlFiles = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.name === 'index.html' && path !== resolve(dist, 'index.html')) htmlFiles.push(path);
  }
}
await collect(dist);
assert.equal(htmlFiles.length, 50, 'Expected 45 articles, three journal indexes and two hubs');
const pages = new Map();
let articles = 0, localized = 0;
const languageCounts = { en: 0, ru: 0, de: 0 };
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Heading count: ${file}`);
  assert.equal((html.match(/<title\b/g) || []).length, 1, `Title count: ${file}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Canonical count: ${file}`);
  assert.equal((html.match(/name="description"/g) || []).length, 1, `Description count: ${file}`);
  assert(!html.includes('/src/assets/'), `Unbuilt image: ${file}`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(paths.has(new URL(canonical).pathname), `Missing sitemap entry: ${canonical}`);
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  assert(['en', 'de', 'ru'].includes(lang));
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const article = schemas.find(s => s['@type'] === 'BlogPosting');
  if (article) {
    articles++;
    languageCounts[lang]++;
    if (lang !== 'en') localized++;
    assert.equal(article.inLanguage, lang);
    assert.equal(article.mainEntityOfPage['@id'], canonical);
    assert(new Date(article.dateModified) >= new Date(article.datePublished), `Article dates: ${canonical}`);
    assert(article.image.startsWith(site + '/assets/'), `Article image: ${canonical}`);
    assert(html.includes('<article') && html.includes('prose'), `Missing readable article: ${canonical}`);
  }
  for (const image of html.matchAll(/<img[^>]*src="([^"]+)"/g)) {
    const url = new URL(image[1], site);
    if (url.origin === site) await access(resolve(dist, '.' + decodeURIComponent(url.pathname)));
  }
  for (const link of html.matchAll(/href="(\/[^"]*)"/g)) {
    const target = new URL(link[1].replaceAll('&amp;', '&'), site).pathname;
    assert(paths.has(target) || /\.(?:png|webp|css|js|ico|json)$/.test(target), `Broken internal route ${target} in ${canonical}`);
  }
  pages.set(canonical, html);
}
let languageLinks = 0;
for (const [canonical, html] of pages) {
  const alternatives = [...html.matchAll(/rel="alternate" href="([^"]+)" hreflang="([^"]+)"/gi)];
  for (const [, target, language] of alternatives) {
    languageLinks++;
    assert(pages.has(target), `Missing language edition ${target}`);
    assert(pages.get(target).includes(`href="${canonical}"`), `Nonreciprocal language link ${canonical} to ${target}`);
    if (language !== 'x-default') assert(pages.get(target).includes(`<html lang="${language}">`));
  }
}
assert.equal(articles, 45);
assert.equal(localized, 22);
assert.deepEqual(languageCounts, { en: 23, ru: 16, de: 6 });
assert.equal(languageLinks, 96, 'Expected reciprocal language links across all ten translated article families');
console.log(`SEO integration checks passed: ${locations.length} sitemap URLs, ${articles} readable articles, ${localized} non-English articles, images, metadata, internal routes and reciprocal languages.`);
