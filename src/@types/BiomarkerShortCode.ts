import { biomarkersDictionary } from '../biomarkers/index.js';

type BiomarkerShortCode = keyof typeof biomarkersDictionary;

export default BiomarkerShortCode;
