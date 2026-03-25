export interface FandomAppGeneratorSchema {
  name: string;
  directory?: string;
}

export interface GeneratorOptions extends FandomAppGeneratorSchema {
  directory: string;
}
