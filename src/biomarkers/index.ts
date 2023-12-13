import { type Biomarker } from '../schema/biomarker.js';

export const biomarkersDictionary = {
  'B-HbA1c-DCCT': (await import('./B-HbA1c-DCCT.json')).default as Biomarker,
  'HOMA-IR': (await import('./HOMA-IR.json')).default as Biomarker,
  'P-HCY': (await import('./P-HCY.json')).default as Biomarker,
  'S-ApoB': (await import('./S-ApoB.json')).default as Biomarker,
  'S-E2': (await import('./S-E2.json')).default as Biomarker,
  // ageSpecificRange not supported yet
  // 'S-fTST': (await import('./S-fTST.json')).default as Biomarker,
  'S-HDL': (await import('./S-HDL.json')).default as Biomarker,
  'S-hsCRP': (await import('./S-hsCRP.json')).default as Biomarker,
  'S-INS': (await import('./S-INS.json')).default as Biomarker,
  'S-LDL': (await import('./S-LDL.json')).default as Biomarker,
  'S-Lp(a)': (await import('./S-Lp(a).json')).default as Biomarker,
  'S-TSH': (await import('./S-TSH.json')).default as Biomarker,
  'S-TAG': (await import('./S-TAG.json')).default as Biomarker,
  'S-UA': (await import('./S-UA.json')).default as Biomarker,
  'S-VLDL': (await import('./S-VLDL.json')).default as Biomarker,
} as const;

export type BiomarkerShortCode = keyof typeof biomarkersDictionary;

export type BiomarkerWithShortCode = Biomarker & { readonly shortCode: BiomarkerShortCode };

export const biomarkers = Object.entries(biomarkersDictionary).map(([shortCode, rest]) => ({
  shortCode,
  ...rest,
})) as readonly BiomarkerWithShortCode[];
