import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { biomarkersDictionary } from '../src/biomarkers/index.js';
import biomarkerSchema from '../src/schema/biomarker.js';

let exitCode = 0;

// eslint-disable-next-line no-console -- CLI
console.log(`\n\nValidate all imported biomarkers against zod schema:\n`);
Object.entries(biomarkersDictionary).forEach(([shortCode, biomarker]) => {
  try {
    // eslint-disable-next-line no-console -- CLI
    console.log(`  - valid: ${shortCode}`);
    biomarkerSchema.parse(biomarker);
  } catch (e) {
    exitCode = 1;
    console.error(`Error in biomarker: ${shortCode}`, e);
  }
});

// eslint-disable-next-line no-console -- CLI
console.log(`\n\nChecking if all biomarkers are imported:\n`);

// get list of .json files in the biomarkers folder

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const rootDir = path.resolve(currentDir, '../');

const biomarkersFolder = path.join(rootDir, 'src/biomarkers');
const files = fs.readdirSync(biomarkersFolder);
const jsonFiles = files.filter((file) => file.endsWith('.json'));
jsonFiles.forEach((file) => {
  // strip .json extension
  const shortCode = file.slice(0, -5);
  if (!biomarkersDictionary[shortCode]) {
    exitCode = 1;
    console.error(`  - NOT IMPORTED - ${shortCode}`);
  } else {
    // eslint-disable-next-line no-console -- CLI
    console.log(`  - imported: ${shortCode}`);
  }
});

process.exit(exitCode);
