import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { biomarkerImages } from '../src/biomarkerImages/index.js';
import { biomarkers } from '../src/biomarkers/index.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const rootDir = path.resolve(currentDir, '../');

const jsonsDistDir = path.resolve(rootDir, 'dist/jsons/');
const imagesDistDir = path.resolve(rootDir, 'dist/images/');
createDirectoryIfNotExists(jsonsDistDir);
createDirectoryIfNotExists(imagesDistDir);

// write json files
await writeJSON(biomarkers, 'biomarkers.json');
await writeJSON(biomarkerImages, 'biomarkerImages.json');
// await writeJSON('indexes');

// copy images
biomarkerImages.forEach(({ shortCode, images }) => {
  images.forEach(({ fileName }) => {
    const src = path.resolve(rootDir, `src/biomarkerImages/${shortCode}/${fileName}`);
    const dest = path.resolve(rootDir, `dist/images/${shortCode}_${fileName}`);
    fs.copyFileSync(src, dest);
  });
});

async function writeJSON(object, fileName) {
  const jsonFilePath = path.resolve(jsonsDistDir, fileName);
  await fsPromises.writeFile(jsonFilePath, JSON.stringify(object, undefined, 2));
}

function createDirectoryIfNotExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}
