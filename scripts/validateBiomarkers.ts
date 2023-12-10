import { biomarkersDictionary } from '../src/biomarkers/index.js';
import biomarkerSchema from '../src/schema/biomarker.js';

let exitCode = 0;
Object.entries(biomarkersDictionary).forEach(([shortCode, biomarker]) => {
  try {
    // eslint-disable-next-line no-console -- CLI
    console.log(`Validating: ${shortCode}`);
    biomarkerSchema.parse(biomarker);
  } catch (e) {
    exitCode = 1;
    console.error(`Error in biomarker: ${shortCode}`, e);
  }
});

process.exit(exitCode);
