import { parse } from '@babel/parser';
import { File } from '@babel/types';
import { OPTIONS } from './consts';
import { IErrorType, ISpecifier } from './interfaces';

const options: object = {
  plugins: [
    'jsx',
    'dynamicImport',
    'classProperties',
    'optionalChaining',
    'objectRestSpread',
    'exportNamespaceFrom',
    'flow',
  ],
  sourceType: 'module',
};

const { directoriesToValidate } = OPTIONS;
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

export const reduceBadImports = (fileTree: any[], domain: string | null) => fileTree.reduce(
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

export const validateData = (file: string, fileName: string): IErrorType => {
  const fileRegex: RegExp = /(?<=src\/).*?(?=.js)/gm;
  const fileTrimmed: RegExpExecArray | null = fileRegex.exec(fileName);
  const relativeFileName = fileTrimmed ? fileTrimmed[0] : '';
  const domain = findDomain(relativeFileName);
  
  try {
    const parsedFile: File = parse(file, options);
    const badImports = reduceBadImports(parsedFile.program.body, domain);
  
    return {
      badImports,
      domain,
      fileName: relativeFileName,
    };
  }
  catch (error) {
    throw new Error(`Found issue during reading file: ${relativeFileName}. Try add proper babel-parser plugin in options`);
  }
};
