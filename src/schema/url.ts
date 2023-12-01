import { z } from 'zod';

// so people don't put in super long urls (with tracking etc) that slow down the GPT response
const url = z.string().url().max(150);

export default url;

export type Url = z.infer<typeof url>;
