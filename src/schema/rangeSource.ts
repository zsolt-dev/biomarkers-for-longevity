import { z } from 'zod';

import url from './url.js';

const min = z.number().nullable();
const max = z.number().nullable();

const minMaxObject = z.object({
  min,
  max,
});

const genericRange = z
  .object({
    type: z.literal('generic'),
    min,
    max,
  })
  .strict();

const ageSpecificRange = z
  .object({
    type: z.literal('ageSpecific'),
    ageGroups: z.record(minMaxObject),
  })
  .strict()
  .refine(({ ageGroups }) => isValidAgeGroups(ageGroups), {
    message: 'ageGroups have to cover ages from 18-120 with no gaps or overlaps and have to be sorted by age',
  });

const genderSpecificRange = z
  .object({
    type: z.literal('genderSpecific'),
    // ageSpecificRange not supported yet
    // male: z.union([minMaxObject, ageSpecificRange]),
    // female: z.union([minMaxObject, ageSpecificRange]),
    male: minMaxObject.nullable(),
    female: minMaxObject.nullable(),
  })
  .strict()
  .refine((data) => data.male || data.female, {
    message: "At least one of 'male' or 'female' is required",
  });

const rangeSource = z
  .object({
    source: z.object({
      name: z.string().min(3).max(60),
      url: url.optional(),
    }),
    note: z.string().min(3).max(300).optional(),
    // ageSpecificRange not supported yet
    // range: z.union([genericRange, genderSpecificRange, ageSpecificRange])
    range: z.union([genericRange, genderSpecificRange]),
  })
  .strict();

export default rangeSource;

export type MinMaxObject = z.infer<typeof minMaxObject>;
export type AgeSpecificRange = z.infer<typeof ageSpecificRange>;
export type GenderSpecificRange = z.infer<typeof genderSpecificRange>;
export type RangeSource = z.infer<typeof rangeSource>;

type AgeGroups = {
  [key: string]: any;
};

function isValidAgeGroups(ageGroups: AgeGroups): boolean {
  // Convert age group keys to sorted numeric ranges
  const ranges = Object.keys(ageGroups).map((key) => key.split('-').map(Number));

  const sortedRanges = ranges.toSorted((a, b) => a[0] - b[0]);

  if (JSON.stringify(ranges) !== JSON.stringify(sortedRanges)) {
    console.error('ageGroups were not provided already sorted');
    return false;
  }

  // Check for complete coverage from 18 to 120
  if (ranges[0][0] > 18 || ranges[ranges.length - 1][1] < 120) {
    console.error('ageGroups are not covering 18-120 age range');
    return false;
  }

  // Check for overlaps and gaps
  for (let i = 0; i < ranges.length - 1; i += 1) {
    if (ranges[i][1] >= ranges[i + 1][0]) {
      console.error('ageGroups Overlap detected');
      return false;
    }
    if (ranges[i][1] < ranges[i + 1][0] - 1) {
      console.error('ageGroups Gap detected');
      return false;
    }
  }

  return true;
}
