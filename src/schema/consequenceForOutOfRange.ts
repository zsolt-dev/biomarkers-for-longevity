import { z } from 'zod';

import url from './url.js';

const consequenceForOutOfRange = z.object({
  consequence: z.string().min(5).max(120),
  description: z.string().min(10).max(500).optional(),
  sources: z.array(url).min(1).max(5),
});

export default consequenceForOutOfRange;

export type ConsequenceForOutOfRange = z.infer<typeof consequenceForOutOfRange>;
