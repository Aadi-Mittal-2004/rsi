
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const srcAssets = path.join(projectRoot, 'src', 'assets');
const outputDir = path.join(projectRoot, 'output');
const mosaicDir = path.join(outputDir, 'mosic');
const targetProductDir = path.join(srcAssets, 'products');

// ensure target directory exists
if (!fs.existsSync(targetProductDir)) {
  fs.mkdirSync(targetProductDir, { recursive: true });
}

async function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    console.log(`Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
    return false;
  }
}

async function processImages() {
  console.log('Starting image conversion...');

  // 1. Convert existing assets
  const assetFiles = fs.readdirSync(srcAssets).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
  for (const file of assetFiles) {
    const inputPath = path.join(srcAssets, file);
    const outputPath = path.join(srcAssets, path.parse(file).name + '.webp');
    await convertToWebP(inputPath, outputPath);
  }

  // 2. Process 'output' folder (Specific identified products)
  const productFiles = fs.readdirSync(outputDir).filter(f => f.match(/\.(jpg|jpeg)$/i));
  for (const file of productFiles) {
    const inputPath = path.join(outputDir, file);
    // standardize filename to lowercase and replace spaces with hyphens
    const newName = path.parse(file).name.toLowerCase().replace(/\s+/g, '-') + '.webp';
    const outputPath = path.join(targetProductDir, newName);
    await convertToWebP(inputPath, outputPath);
  }

  // 3. Process 'mosic' folder
  if (fs.existsSync(mosaicDir)) {
      const mosaicFiles = fs.readdirSync(mosaicDir).filter(f => f.match(/\.(jpg|jpeg)$/i));
      for (const file of mosaicFiles) {
        const inputPath = path.join(mosaicDir, file);
        // Use original name but cleaned up
        const newName = 'mosaic-' + path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.webp';
        const outputPath = path.join(targetProductDir, newName);
        await convertToWebP(inputPath, outputPath);
      }
  }

  console.log('Image conversion complete!');
}

processImages();
