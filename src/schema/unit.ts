import { z } from 'zod';

export const possibleUnits = ['pg/mL', 'mg/dL', 'µmol/L', '%', 'µIU/mL', 'ratio', '%'] as const;

const unit = z.enum(possibleUnits);

export default unit;

export type Unit = z.infer<typeof unit>;
