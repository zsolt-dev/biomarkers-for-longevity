import { type BiomarkerImages } from '../schema/biomarkerImages.js';

export const biomarkerImagesDictionary = {
  LYM: (await import('./LYM/LYM.json')).default as BiomarkerImages,
  PLT: (await import('./PLT/PLT.json')).default as BiomarkerImages,
  'S-Folate': (await import('./S-Folate/S-Folate.json')).default as BiomarkerImages,
  'S-GLU': (await import('./S-GLU/S-GLU.json')).default as BiomarkerImages,
  'P-HCY': (await import('./P-HCY/P-HCY.json')).default as BiomarkerImages,
  'S-hsCRP': (await import('./S-hsCRP/S-hsCRP.json')).default as BiomarkerImages,
} as const;

type BiomarkerShortCode = keyof typeof biomarkerImagesDictionary;

export type BiomarkerImagesWithShortCode = { readonly shortCode: BiomarkerShortCode; images: BiomarkerImages };

export const biomarkerImages = Object.entries(biomarkerImagesDictionary).map(([shortCode, images]) => ({
  shortCode,
  images,
})) as readonly BiomarkerImagesWithShortCode[];
