import { names, Tree } from '@nx/devkit';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  return await import('../fandom-app/fandom-app').then(({ fandomAppGenerator }) =>
    fandomAppGenerator(tree, {
      ...options,
      directory: `apps/${names(options.name).fileName}`,
    })
  );
}

export default presetGenerator;
