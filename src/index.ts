#!/usr/bin/env node
/* tslint:disable no-console */

import * as pjson from 'pjson';
import { getFiles } from './getFiles';
import { filterImports, processAsyncArray, validateImports } from './utils';

try {
  const processFiles = (er: any, files: string[]) => {
    processAsyncArray(files, validateImports).then(filterImports);
  };

  getFiles(processFiles);
} catch (error) {
  throw new Error('Add cdil config to package.json');
}
