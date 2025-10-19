export interface heroLibGeneratorSchema {
  name: string;
  image: string;
  targetApp: string;
  directory?: string;
}

export interface GeneratorOptions extends heroLibGeneratorSchema {
  directory: string;
  route: string;
  importPath: string;
  componentName: string;
}
