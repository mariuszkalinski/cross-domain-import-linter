import * as fs from 'fs';
import { validateData } from './parse';

export const validateImports = (file: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);

      resolve(validateData(data, file));
    });
  });
};
