import { parse } from '@babel/parser';
import { File } from '@babel/types';
import { IErrorType, ISpecifier } from './interfaces';

const options: object = {
  plugins: [
    'jsx',
    'dynamicImport',
    'classProperties',
    'optionalChaining',
    'objectRestSpread',
    'exportNamespaceFrom',
  ],
  sourceType: 'module',
};

const directoriesToValidate = ['components', 'containers'];
const regexDirectoriesToValidate = directoriesToValidate.join('|');
const validateImportRegex = new RegExp(
  `.*(${regexDirectoriesToValidate}).*`,
  'gm'
);

const reduceSpecifiers = (spec: ISpecifier[]): string =>
  spec.reduce((specifiers, specifier) => {
    if (specifier.type === 'ImportSpecifier') {
      return `${specifiers}${specifiers.length ? ',' : ''} ${
        specifier.imported.name
      }`;
    }

    return specifiers;
  }, '');

const findDomain = (path: string): string | null => {
  const findDomainRegex = new RegExp(
    `(?<=(${regexDirectoriesToValidate})\/).*?(?=\/)`,
    'g'
  );
  const fileDomain = findDomainRegex.exec(path);
  return fileDomain ? fileDomain[0] : '';
};

export const validateData = (file: string, fileName: string): IErrorType => {
  const parsedFile: File = parse(file, options);
  const fileRegex: RegExp = /(?<=src\/).*?(?=.js)/gm;
  const fileTrimmed: RegExpExecArray | null = fileRegex.exec(fileName);
  const relativeFileName = fileTrimmed ? fileTrimmed[0] : '';
  const domain = findDomain(relativeFileName);

  const badImports = parsedFile.program.body.reduce(
    (reducedImports: any, node: any) => {
      if (node.type === 'ImportDeclaration') {
        const source = node.source.value;
        const sourceDomain = findDomain(source);
        const canAddImport =
          validateImportRegex.test(node.source.value) &&
          sourceDomain !== domain &&
          sourceDomain !== 'common';

        if (canAddImport) {
          return [
            ...reducedImports,
            {
              source,
              specifiers: reduceSpecifiers(node.specifiers),
            },
          ];
        }

        return reducedImports;
      }

      return reducedImports;
    },
    []
  );

  return {
    badImports,
    domain,
    fileName: relativeFileName,
  };
};
