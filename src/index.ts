import { getFiles } from './getFiles';
import { validateImports } from './utils';

function processAsyncArray(array: string[], func: void) {
  const promises = array.map(func);

  return Promise.all(promises);
}

const logger = dataToLog => {
  dataToLog.forEach(loggInfo => {
    console.info(`◌${loggInfo.fileName} \n  ◌ has crossdomain imports:`);
    loggInfo.badImports.forEach(element => {
      console.info('\x1b[33m%s\x1b[0m', `    → ${element.source} -> ${element.specifiers}`);
    })
    console.info('\n');
  });
}

const processFiles = (er: any, files: string[]) => {
  processAsyncArray(files, validateImports).then(responses => {
    const importIssues = responses.reduce((importIssuesList, importIssue) => {
      if(importIssue.badImports.length) {
        return [...importIssuesList, importIssue]
      }

      return importIssuesList;
    }, []);

    logger(importIssues);
  });
};

getFiles(processFiles);
