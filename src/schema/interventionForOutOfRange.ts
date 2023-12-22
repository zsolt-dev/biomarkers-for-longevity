import { z } from 'zod';

import url from './url.js';

const interventionForOutOfRange = z.object({
  intervention: z.string().min(5).max(100),
  description: z.string().min(10).max(500).optional(),
  sources: z.array(url).min(1).max(5),
});

export default interventionForOutOfRange;

export type InterventionForOutOfRange = z.infer<typeof interventionForOutOfRange>;
