import { z } from 'zod';

import consequenceForOutOfRange from './consequenceForOutOfRange.js';
import interventionForOutOfRange from './interventionForOutOfRange.js';
import rangeSource from './rangeSource.js';
import reasonForOutOfRange from './reasonForOutOfRange.js';
import unit from './unit.js';

// limits like .max(6) are here to prevent slowing down the GPT response
const biomarker = z
  .object({
    alternativeShortCodes: z.array(z.string()),
    displayName: z.string(),
    longName: z.string(),
    unit: unit.nullable(),
    description: z.string().max(250).optional(),
    rangeSources: z.array(rangeSource).min(1).max(6),
    consequencesForLow: z.array(consequenceForOutOfRange).max(6).optional(),
    consequencesForHigh: z.array(consequenceForOutOfRange).max(6).optional(),
    reasonsForLow: z.array(reasonForOutOfRange).max(6).optional(),
    reasonsForHigh: z.array(reasonForOutOfRange).max(6).optional(),
    interventionsForLow: z.array(interventionForOutOfRange).max(6).optional(),
    interventionsForHigh: z.array(interventionForOutOfRange).max(6).optional(),
  })
  .strict(); // This will cause an error if any additional properties are present in the object;

export default biomarker;

export type Biomarker = z.infer<typeof biomarker>;
