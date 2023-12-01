import { type Biomarker } from '../schema/biomarker';

export const biomarkersDictionary = {
  'S-LDL': (await import('./S-LDL.json')).default as Biomarker,
  'S-Lp(a)': (await import('./S-Lp(a).json')).default as Biomarker,
  'S-E2': (await import('./S-E2.json')).default as Biomarker,
  'S-fTST': (await import('./S-fTST.json')).default as Biomarker,
};

export const biomarkers = Object.entries(biomarkersDictionary).map(([shortCode, rest]) => ({ shortCode, ...rest }));
