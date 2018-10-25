export interface IBadImportsType {
  source: string;
  specifiers: string;
}

export interface IErrorType {
  badImports: IBadImportsType[];
  domain: string | null;
  fileName: string | null;
}

export interface ISpecifier {
  type: string;
  imported: {
    name: string;
  };
}

export interface INode {
  type: string;
  source: {
    value: string;
  };
  specifiers: ISpecifier[];
}
