import { type BiomarkerImages } from '../schema/biomarkerImages.js';

export const biomarkerImagesDictionary = {
  'S-hsCRP': (await import('./S-hsCRP/S-hsCRP.json')).default as BiomarkerImages,
  'S-GLU': (await import('./S-GLU/S-GLU.json')).default as BiomarkerImages,
} as const;

type BiomarkerShortCode = keyof typeof biomarkerImagesDictionary;

export type BiomarkerImagesWithShortCode = { shortCode: BiomarkerShortCode; images: BiomarkerImages };

export const biomarkerImages = Object.entries(biomarkerImagesDictionary).map(([shortCode, images]) => ({
  shortCode,
  images,
})) as readonly BiomarkerImagesWithShortCode[];
