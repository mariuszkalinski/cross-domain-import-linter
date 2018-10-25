import { getFiles } from './getFiles';
import { filterImports, processAsyncArray, validateImports } from './utils';

const processFiles = (er: any, files: string[]) => {
  processAsyncArray(files, validateImports).then(filterImports);
};

getFiles(processFiles);
