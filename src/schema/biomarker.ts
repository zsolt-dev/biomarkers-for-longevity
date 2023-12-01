import { z } from 'zod';

import interventionForOutOfRange from './interventionForOutOfRange';
import rangeSource from './rangeSource';
import reasonForOutOfRange from './reasonForOutOfRange';
import unit from './unit';

// limits like .max(6) are here to prevent slowing down the GPT response
const biomarker = z
  .object({
    alternativeShortCodes: z.array(z.string()),
    displayName: z.string(),
    unit,
    rangeSources: z.array(rangeSource).min(1).max(6),
    reasonsForLow: z.array(reasonForOutOfRange).max(6).optional(),
    reasonsForHigh: z.array(reasonForOutOfRange).max(6).optional(),
    interventionsForLow: z.array(interventionForOutOfRange).max(6).optional(),
    interventionsForHigh: z.array(interventionForOutOfRange).max(6).optional(),
  })
  .strict(); // This will cause an error if any additional properties are present in the object;

export default biomarker;

export type Biomarker = z.infer<typeof biomarker>;
