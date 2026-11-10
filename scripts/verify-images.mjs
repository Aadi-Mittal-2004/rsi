import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const manifest = JSON.parse(await readFile(resolve(dist, '.vite/manifest.json'), 'utf8'));
const images = new Map();
const imageExtension = /\.(?:png|jpe?g|webp|gif|avif|svg|ico|tiff?|bmp)$/i;
for (const [source, asset] of Object.entries(manifest)) {
  if (source.startsWith('src/') && imageExtension.test(asset.file)) {
    images.set(resolve(dist, asset.file), resolve(root, source));
  }
}
async function collectPublic(directory, relative = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const child = resolve(directory, entry.name);
    const childRelative = `${relative}${entry.name}`;
    if (entry.isDirectory()) await collectPublic(child, `${childRelative}/`);
    else if (imageExtension.test(entry.name)) images.set(resolve(dist, childRelative), child);
  }
}
await collectPublic(resolve(root, 'public'));
assert(images.size > 0, 'Expected built image assets');
let unchanged = 0, lossless = 0;
for (const [outputFile, sourceFile] of images) {
  const original = await readFile(sourceFile);
  const built = await readFile(outputFile);
  if (original.equals(built)) { unchanged++; continue; }
  assert.equal(extname(sourceFile).toLowerCase(), '.png', `Non-PNG photo was altered: ${sourceFile}`);
  const input = await sharp(original).metadata();
  const output = await sharp(built).metadata();
  assert.equal(input.depth, 'uchar', `Higher-depth PNG must remain untouched: ${sourceFile}`);
  assert.equal(input.space, 'srgb', `Non-sRGB PNG must remain untouched: ${sourceFile}`);
  for (const field of ['format', 'width', 'height', 'depth', 'space', 'orientation']) {
    assert.equal(output[field], input[field], `Changed ${field}: ${sourceFile}`);
  }
  assert(Buffer.from(input.icc || []).equals(Buffer.from(output.icc || [])), `Changed colour profile: ${sourceFile}`);
  const pixelsBefore = await sharp(original).ensureAlpha().raw().toBuffer();
  const pixelsAfter = await sharp(built).ensureAlpha().raw().toBuffer();
  assert(pixelsBefore.equals(pixelsAfter), `Image pixels changed: ${sourceFile}`);
  lossless++;
}
console.log(`Photo preservation checks passed: ${images.size} images; ${unchanged} byte-identical, ${lossless} PNGs with exactly identical decoded pixels. No resizing, format conversion or lossy recompression.`);
