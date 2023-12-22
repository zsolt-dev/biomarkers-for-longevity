import { z } from 'zod';

export const units = [
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
  '10^12/L',
  '10^9/L',
  'fL',
] as const;

const unit = z.enum(units);

export default unit;

export type Unit = z.infer<typeof unit>;
