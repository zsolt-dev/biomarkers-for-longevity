import { z } from 'zod';

import url from './url.js';

const reasonForOutOfRange = z
  .object({
    reason: z.string().min(5).max(100),
    description: z.string().min(10).max(500).optional(),
    sources: z.array(url).min(1).max(5),
  })
  .strict();

export default reasonForOutOfRange;

export type ReasonForOutOfRange = z.infer<typeof reasonForOutOfRange>;
