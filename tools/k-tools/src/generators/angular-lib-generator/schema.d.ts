export interface AngularLibGeneratorGeneratorSchema {
  directory: string;
  targetApp: string;
  name?: string;
  subtitle?: string;
  description?: string;
}

export interface GeneratorOptions {
  name: string;
  prettyName: string;
  subtitle: string;
  description: string;
  route: string;
  importPath: string;
  directory: string;
  targetApp: string;
  subtitle?: string;
  description?: string;
  componentName: string;
}
