import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { biomarkers } from '../src/biomarkers/index.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const rootDir = path.resolve(currentDir, '../');

// create a build directory if does not exists
const distDir = path.resolve(rootDir, 'dist/json/');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

await writeJSON(biomarkers, 'biomarkers.json');
// await writeJSON('indexes');

async function writeJSON(object, fileName) {
  const jsonFilePath = path.resolve(distDir, fileName);
  await fsPromises.writeFile(jsonFilePath, JSON.stringify(object, undefined, 2));
}
