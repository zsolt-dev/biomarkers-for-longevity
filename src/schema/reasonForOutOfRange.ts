import { z } from 'zod';

import url from './url';

const reasonForOutOfRange = z.object({
  reason: z.string().min(5).max(60),
  description: z.string().min(10).max(250).optional(),
  // lot of sources slows down the GPT response, so they are limited to 5
  sources: z.array(url).min(1).max(5),
});

export default reasonForOutOfRange;

export type ReasonForOutOfRange = z.infer<typeof reasonForOutOfRange>;
