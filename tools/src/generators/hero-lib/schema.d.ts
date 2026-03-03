export interface HeroLibGeneratorSchema {
  name: string;
  image: string;
  targetApp: string;
  directory?: string;
}

export interface GeneratorOptions extends HeroLibGeneratorSchema {
  directory: string;
  route: string;
  importPath: string;
  componentName: string;
  selector: string;
}
