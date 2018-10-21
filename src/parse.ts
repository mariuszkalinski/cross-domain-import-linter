import { parse } from '@babel/parser';

const options: object = {
  plugins: ['jsx', 'dynamicImport', 'classProperties', 'optionalChaining', 'objectRestSpread'],
  sourceType: 'module',
};

// console.log(parsedFile.program.body[0]);
const reduceSpecifiers = spec =>
  spec.reduce((specifiers, specifier) => {
    if (specifier.type === 'ImportSpecifier') {
      return [...specifiers, specifier.imported.name];
    }

    return specifiers;
  }, []);

export const validateData = (file: string) => {
  const parsedFile = parse(file, options);

  return parsedFile.program.body.reduce((reducedImports: any, node: any) => {
    if (node.type === 'ImportDeclaration') {
      return [
        ...reducedImports,
        {
          source: node.source.value,
          specifiers: reduceSpecifiers(node.specifiers),
        },
      ];
    }

    return reducedImports;
  }, []);
};
