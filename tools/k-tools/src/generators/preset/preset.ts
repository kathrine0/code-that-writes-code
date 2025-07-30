import { Tree } from '@nx/devkit';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  return await import('../k-app/k-app').then(({ kAppGenerator }) =>
    kAppGenerator(tree, options)
  );
}

export default presetGenerator;
