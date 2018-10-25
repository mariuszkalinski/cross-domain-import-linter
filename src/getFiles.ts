import * as glob from 'glob';

const options = {
  cwd: '../sample_files/src/components',
  realpath: true,
};

export const getFiles = (callback: (er: any, files: string[]) => void) =>
  glob('**/*.js', options, callback);
