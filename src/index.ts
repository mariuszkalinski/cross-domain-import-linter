import * as fs from 'fs';
import { validateImports } from './utils';
import { getFiles } from './getFiles';

function processAsyncArray(array, func) {
  const promises = array.map(func);

  return Promise.all(promises);
}

const processFiles = (er: any, files: string[]) => {
  processAsyncArray(files, validateImports).then(responses =>
    console.log(responses)
  );
};

getFiles(processFiles);
