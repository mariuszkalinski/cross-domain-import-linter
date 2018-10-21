import * as glob from 'glob';

const options = {
  absolute: true,
  cwd:
    '/Users/mariuszkalinski/projects/cross-domain-import-linter/sample_files',
  root:
    '/Users/mariuszkalinski/projects/cross-domain-import-linter/sample_files',
};

export const getFiles = (callback: void) => glob('**/*.js', options, callback);
