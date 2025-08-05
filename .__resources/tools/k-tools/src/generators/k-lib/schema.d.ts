export interface KLibGeneratorSchema {
  name: string;
  image: string;
  targetApp: string;
  directory?: string;
}

export interface GeneratorOptions extends KLibGeneratorSchema {
  directory: string;
  route: string;
  importPath: string;
  componentName: string;
}
