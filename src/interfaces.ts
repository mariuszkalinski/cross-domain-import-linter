export interface IBadImportsType {
  source: string,
  specifiers: string,
}

export interface IErrorType {
  badImports: IBadImportsType[],
  fileName: string,
}

export interface ISpecifier {
  type: string,
  imported: {
    name: string,
  },
}

export interface INode {
  type: string,
  source: {
    value: string,
  },
  specifiers: ISpecifier[],
}