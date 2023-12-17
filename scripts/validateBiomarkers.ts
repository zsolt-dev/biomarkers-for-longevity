import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { biomarkerImagesDictionary } from '../src/biomarkerImages/index.js';
import { biomarkersDictionary } from '../src/biomarkers/index.js';
import biomarkerSchema from '../src/schema/biomarker.js';
import biomarkerImagesSchema from '../src/schema/biomarkerImages.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const rootDir = path.resolve(currentDir, '../');
const biomarkersDir = path.join(rootDir, 'src/biomarkers');
const biomarkerImagesDir = path.join(rootDir, 'src/biomarkerImages');

let exitCode = 0;

//
// Biomarkers
//

// eslint-disable-next-line no-console -- CLI
console.log(`\n\nValidate all imported biomarkers against zod schema:\n`);
Object.entries(biomarkersDictionary).forEach(([shortCode, biomarker]) => {
  try {
    biomarkerSchema.parse(biomarker);
    // eslint-disable-next-line no-console -- CLI
    console.log(`  - valid: ${shortCode}`);
  } catch (e) {
    exitCode = 1;
    console.error(`Error in biomarker: ${shortCode}`, e);
  }
});

// eslint-disable-next-line no-console -- CLI
console.log(`\n\nChecking if all biomarkers are imported:\n`);

const biomarkerJsonFilesWithoutExtension = fs
  .readdirSync(biomarkersDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.slice(0, -5));

// biomarkerJsonFilesWithoutExtension.sort();
biomarkerJsonFilesWithoutExtension.sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }));

biomarkerJsonFilesWithoutExtension.forEach((shortCode) => {
  if (!biomarkersDictionary[shortCode]) {
    exitCode = 1;
    console.error(`  - NOT IMPORTED - ${shortCode}`);
  } else {
    // eslint-disable-next-line no-console -- CLI
    console.log(`  - imported: ${shortCode}`);
  }
});

//
// Biomarker Images
//

// eslint-disable-next-line no-console -- CLI
console.log(`\n\nValidate all imported biomarker images against zod schema:\n`);
Object.entries(biomarkerImagesDictionary).forEach(([shortCode, images]) => {
  try {
    biomarkerImagesSchema.parse(images);
    if (!biomarkersDictionary[shortCode]) throw new Error(`Biomarker not found: ${shortCode}`);

    // check if images exists
    images.forEach((image) => {
      const imageFilePath = path.join(biomarkerImagesDir, shortCode, image.fileName);
      if (!fs.existsSync(imageFilePath)) throw new Error(`Image not found: ${imageFilePath}`);
    });

    // eslint-disable-next-line no-console -- CLI
    console.log(`  - valid: ${shortCode}`);
  } catch (e) {
    exitCode = 1;
    console.error(`Error in biomarker images: ${shortCode}`, e);
  }
});

// eslint-disable-next-line no-console -- CLI
console.log(`\n\nChecking if all biomarker images folders are imported:\n`);

// return all directories in biomarkerImagesDir
const biomarkerImagesDirectories = fs
  .readdirSync(biomarkerImagesDir)
  .filter((file) => fs.statSync(path.join(biomarkerImagesDir, file)).isDirectory());

biomarkerImagesDirectories.sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }));

biomarkerImagesDirectories.forEach((shortCode) => {
  if (!biomarkerImagesDictionary[shortCode]) {
    exitCode = 1;
    console.error(`  - NOT IMPORTED - ${shortCode}`);
  } else {
    // eslint-disable-next-line no-console -- CLI
    console.log(`  - imported: ${shortCode}`);
  }
});

process.exit(exitCode);
