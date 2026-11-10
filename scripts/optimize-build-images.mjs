import sharp from 'sharp';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const files = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) await collect(file);
    else if (/\.png$/i.test(file)) files.push(file);
  }
}
await collect(dist);
sharp.cache(false);
let index = 0, saved = 0, optimized = 0;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (index < files.length) {
    const file = files[index++];
    const input = await readFile(file);
    const original = await sharp(input).metadata();
    // Leave higher-depth, non-sRGB and animated PNGs byte-for-byte unchanged.
    // JPEG, WebP and every other format are never re-encoded by this script.
    if ((original.pages || 1) > 1 || original.depth !== 'uchar' || original.space !== 'srgb') continue;
    const output = await sharp(input).keepMetadata()
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer();
    if (output.length >= input.length) continue;
    const result = await sharp(output).metadata();
    if (result.width !== original.width || result.height !== original.height || result.format !== original.format
      || result.depth !== original.depth || result.orientation !== original.orientation
      || !Buffer.from(result.icc || []).equals(Buffer.from(original.icc || []))) {
      continue;
    }
    const before = await sharp(input).ensureAlpha().raw().toBuffer();
    const after = await sharp(output).ensureAlpha().raw().toBuffer();
    // Never write a candidate unless its decoded pixels are exactly identical.
    if (!before.equals(after)) continue;
    await writeFile(file, output);
    saved += input.length - output.length;
    optimized++;
  }
}));
console.log(`Losslessly compressed ${optimized}/${files.length} PNG assets; saved ${(saved / 1024 / 1024).toFixed(2)} MB. Decoded pixels are identical; JPEG/WebP and source photos are untouched.`);
