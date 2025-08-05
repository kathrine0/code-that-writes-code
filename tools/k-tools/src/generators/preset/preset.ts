import { names, Tree } from '@nx/devkit';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  return await import('../k-app/k-app').then(({ kAppGenerator }) =>
    kAppGenerator(tree, {
      ...options,
      directory: `apps/${names(options.name).fileName}`,
    })
  );
}

export default presetGenerator;
