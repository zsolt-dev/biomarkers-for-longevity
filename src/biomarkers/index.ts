import { type Biomarker } from '../schema/biomarker.js';

export const biomarkersDictionary = {
  'B-HbA1c-DCCT': (await import('./B-HbA1c-DCCT.json')).default as Biomarker,
  HGB: (await import('./HGB.json')).default as Biomarker,
  'HOMA-IR': (await import('./HOMA-IR.json')).default as Biomarker,
  LYM: (await import('./LYM.json')).default as Biomarker,
  MCHC: (await import('./MCHC.json')).default as Biomarker,
  MCV: (await import('./MCV.json')).default as Biomarker,
  PLT: (await import('./PLT.json')).default as Biomarker,
  'P-HCY': (await import('./P-HCY.json')).default as Biomarker,
  RBC: (await import('./RBC.json')).default as Biomarker,
  'S-ALT': (await import('./S-ALT.json')).default as Biomarker,
  'S-ApoB': (await import('./S-ApoB.json')).default as Biomarker,
  'S-E2': (await import('./S-E2.json')).default as Biomarker,
  'S-AST': (await import('./S-AST.json')).default as Biomarker,
  'S-aTPO': (await import('./S-aTPO.json')).default as Biomarker,
  'S-Cystatin-C': (await import('./S-Cystatin-C.json')).default as Biomarker,
  'S-FSH': (await import('./S-FSH.json')).default as Biomarker,
  'S-fT3': (await import('./S-fT3.json')).default as Biomarker,
  'S-fT4': (await import('./S-fT4.json')).default as Biomarker,
  'S-fTST': (await import('./S-fTST.json')).default as Biomarker,
  'S-Ferritin': (await import('./S-Ferritin.json')).default as Biomarker,
  'S-LH': (await import('./S-LH.json')).default as Biomarker,
  'S-SHBG': (await import('./S-SHBG.json')).default as Biomarker,
  // ageSpecificRange not supported yet
  // 'S-fTST': (await import('./S-fTST.json')).default as Biomarker,
  'S-HDL': (await import('./S-HDL.json')).default as Biomarker,
  'S-hsCRP': (await import('./S-hsCRP.json')).default as Biomarker,
  'S-INS': (await import('./S-INS.json')).default as Biomarker,
  'S-LDL': (await import('./S-LDL.json')).default as Biomarker,
  'S-Lp(a)': (await import('./S-Lp(a).json')).default as Biomarker,
  'S-rT3': (await import('./S-rT3.json')).default as Biomarker,
  'S-TSH': (await import('./S-TSH.json')).default as Biomarker,
  'S-TST': (await import('./S-TST.json')).default as Biomarker,
  'S-TAG': (await import('./S-TAG.json')).default as Biomarker,
  'S-tBIL': (await import('./S-tBIL.json')).default as Biomarker,
  'S-tPSA': (await import('./S-tPSA.json')).default as Biomarker,
  'S-UA': (await import('./S-UA.json')).default as Biomarker,
  'S-GLU': (await import('./S-GLU.json')).default as Biomarker,
  'S-vitamin-D': (await import('./S-vitamin-D.json')).default as Biomarker,
  'S-VLDL': (await import('./S-VLDL.json')).default as Biomarker,
  WBC: (await import('./WBC.json')).default as Biomarker,
} as const;

export type BiomarkerShortCode = keyof typeof biomarkersDictionary;

export type BiomarkerWithShortCode = Biomarker & { readonly shortCode: BiomarkerShortCode };

export const biomarkers = Object.entries(biomarkersDictionary).map(([shortCode, rest]) => ({
  shortCode,
  ...rest,
})) as readonly BiomarkerWithShortCode[];
