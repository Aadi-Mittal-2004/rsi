import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { normalizeNpmEnvironment } from './vercel-npm.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const legacy = { npm_config_cache_dir: '/tmp/old-cache', PATH: '/bin' };
assert.deepEqual(normalizeNpmEnvironment(legacy), { npm_config_cache: '/tmp/old-cache', PATH: '/bin' });
assert.equal(legacy.npm_config_cache_dir, '/tmp/old-cache', 'Do not mutate the parent environment');
assert.deepEqual(normalizeNpmEnvironment({ NPM_CONFIG_CACHE: '/tmp/current', 'NPM_CONFIG_CACHE-DIR': '/tmp/old' }), { NPM_CONFIG_CACHE: '/tmp/current' });
const npmCheck = spawnSync(process.execPath, [resolve(root, 'scripts/vercel-npm.mjs'), '--version'], {
  cwd: root, encoding: 'utf8',
  env: { ...process.env, npm_config_cache_dir: resolve(root, 'node_modules/.cache/npm-validation') },
});
assert.equal(npmCheck.status, 0, npmCheck.stderr);
assert(!npmCheck.stderr.includes('Unknown env config'), 'Hosting cache option must be normalized before npm starts');

const manifest = JSON.parse(await readFile(resolve(root, 'dist/.vite/manifest.json'), 'utf8'));
const app = manifest['index.html'];
assert(app?.isEntry);
assert(app.dynamicImports?.length >= 10, 'Secondary routes should load on demand');
assert(manifest['src/pages/BlogPost.tsx']?.isDynamicEntry, 'Articles remain reachable');
assert(manifest['src/pages/ProductDetails.tsx']?.isDynamicEntry, 'Product details remain reachable');
const bundles = [];
for (const name of await readdir(resolve(root, 'dist/assets'))) {
  if (!name.endsWith('.js')) continue;
  const size = (await stat(resolve(root, 'dist/assets', name))).size;
  assert(size <= 500_000, `Oversized JavaScript chunk: ${name} (${size} bytes)`);
  bundles.push({ name, size });
}
const largest = Math.max(...bundles.map(bundle => bundle.size));
console.log(`Build checks passed: ${bundles.length} JavaScript chunks, largest ${(largest / 1024).toFixed(1)} KB; route splitting and legacy npm cache normalization verified.`);
