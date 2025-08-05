export interface KAppGeneratorSchema {
  name: string;
  directory?: string;
}

export interface GeneratorOptions extends KAppGeneratorSchema {
  directory: string;
}
