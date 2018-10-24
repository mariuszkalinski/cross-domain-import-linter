import {
  IBadImportsType,
  IErrorType,
 } from './interfaces';

export const logger = (dataToLog: IErrorType[]) => {

  dataToLog.forEach(loggInfo => {
    console.info(`◌${loggInfo.fileName} \n  ◌ has crossdomain imports:`);
    loggInfo.badImports.forEach((element: IBadImportsType) => {
      console.info(
        '\x1b[33m%s\x1b[0m',
        `    → ${element.source} -> ${element.specifiers}`
      );
    });
    console.info('\n');
  });
};