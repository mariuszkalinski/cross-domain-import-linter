import * as glob from 'glob';
import { OPTIONS } from './consts';

const options = {
  realpath: true,
  strict: true,
};

export const getFiles = (callback: (er: any, files: string[]) => void) =>
  glob(OPTIONS.globRegex, options, callback);
