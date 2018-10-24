import * as glob from 'glob';

const options = {
  absolute: true,
  cwd: '/Users/mariuszkalinski/projects/cross-domain-import-linter/',
  ignore: '/node_modules',
};

export const getFiles = (
  callback: (er: any, files: string[]) => void
) => glob('sample_files/src/components/**/*.js', options, callback);
