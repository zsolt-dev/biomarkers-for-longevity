import { z } from 'zod';

export const possibleUnits = [
  'g/dL',
  'pg/mL',
  'mg/dL',
  'mg/L',
  'ng/mL',
  'ng/dL',
  'µg/L',
  'nmol/L',
  'µmol/L',
  '%',
  'µIU/mL',
  'mIU/mL',
  'IU/mL',
  'U/L',
  'ratio',
  '%',
] as const;

const unit = z.enum(possibleUnits);

export default unit;

export type Unit = z.infer<typeof unit>;
