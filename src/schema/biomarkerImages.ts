import { z } from 'zod';

const displayEnum = z.enum(['wholeRow']);

const biomarkerImagesSchema = z.array(
  z.object({
    fileName: z.string(),
    text: z.string(),
    sources: z.array(z.string()),
    credits: z.array(z.string()),
    display: displayEnum.optional(),
  }),
);

export default biomarkerImagesSchema;

export type BiomarkerImages = z.infer<typeof biomarkerImagesSchema>;
