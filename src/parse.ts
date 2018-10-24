import { parse } from '@babel/parser';
import {
  IErrorType,
  ISpecifier,
} from './interfaces';
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
      return `${specifiers}, ${specifier.imported.name}`;
    }

    return specifiers;
  }, '');

export const validateData = (file: string, fileName: string): IErrorType => {
  const parsedFile = parse(file, options);

  const badImports = parsedFile.program.body.reduce(
    (reducedImports: any, node: any) => {
      if (node.type === 'ImportDeclaration') {
        const canAddImport = validateImportRegex.test(node.source.value);

        if (canAddImport) {
          return [
            ...reducedImports,
            {
              source: node.source.value,
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
    fileName,
  };
};
