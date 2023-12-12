import { type Biomarker } from '../schema/biomarker.js';

export const biomarkersDictionary = {
  'S-LDL': (await import('./S-LDL.json')).default as Biomarker,
  'S-Lp(a)': (await import('./S-Lp(a).json')).default as Biomarker,
  'S-E2': (await import('./S-E2.json')).default as Biomarker,
  // ageSpecificRange not supported yet
  // 'S-fTST': (await import('./S-fTST.json')).default as Biomarker,
} as const;

export type BiomarkerShortCode = keyof typeof biomarkersDictionary;

export type BiomarkerWithShortCode = Biomarker & { readonly shortCode: BiomarkerShortCode };

export const biomarkers = Object.entries(biomarkersDictionary).map(([shortCode, rest]) => ({
  shortCode,
  ...rest,
})) as readonly BiomarkerWithShortCode[];
