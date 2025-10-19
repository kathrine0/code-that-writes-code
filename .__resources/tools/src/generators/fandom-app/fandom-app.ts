import { applicationGenerator, E2eTestRunner } from '@nx/angular/generators';
import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  joinPathFragments,
  names,
  runTasksInSerial,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { GeneratorOptions, fandomAppGeneratorSchema } from './schema';

export async function fandomAppGenerator(tree: Tree, options: fandomAppGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const normalizedOptions: GeneratorOptions = {
    ...options,
    directory: options.directory || names(options.name).fileName,
  };

  await applicationGenerator(tree, {
    ...normalizedOptions,
    skipFormat: true,
    e2eTestRunner: E2eTestRunner.None,
    style: 'scss',
  });

  generateAdditionalFiles(tree, normalizedOptions);

  tasks.push(
    addDependenciesToPackageJson(
      tree,
      { '@angular/material': '~20.1.0', '@angular/cdk': '~20.1.0' },
      {}
    )
  );

  await formatFiles(tree);

  return runTasksInSerial(...tasks);
}

export default fandomAppGenerator;

function generateAdditionalFiles(
  tree: Tree,
  options: GeneratorOptions
) {
  const srcFolder = path.join(__dirname, 'files');

  const target = path.relative(
    path.join(tree.root),
    path.join(process.cwd(), options.directory)
  );

  tree.delete(joinPathFragments(target, 'src', 'app'));

  generateFiles(tree, srcFolder, target, options);
}
