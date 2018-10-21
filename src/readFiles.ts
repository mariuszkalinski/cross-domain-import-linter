import * as fs from 'fs';

export function readFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err: any, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
