export interface fandomAppGeneratorSchema {
  name: string;
  directory?: string;
}

export interface GeneratorOptions extends fandomAppGeneratorSchema {
  directory: string;
}
