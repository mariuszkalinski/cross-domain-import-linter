import * as fs from 'fs';
import {
  IErrorType,
 } from './interfaces';
 import { logger } from './logger';
import { validateData } from './parse';

export const validateImports = (file: string): Promise<{}> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(validateData(data, file));
    });
  });
};

export const processAsyncArray = (array: string[], func: any) => {
  const promises = array.map(func);

  return Promise.all(promises);
}


export const filterImports = (responses: any) => {
  const importIssues = responses
    .reduce((
      importIssuesList: IErrorType[],
      importIssue: IErrorType,
      ) => {
      if (importIssue.badImports.length) {
        return [...importIssuesList, importIssue];
      }

      return importIssuesList;
    }, []);

  logger(importIssues);
}