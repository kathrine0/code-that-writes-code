import {
  addDependenciesToPackageJson,
  generateFiles,
  GeneratorCallback,
  joinPathFragments,
  runTasksInSerial,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { PresetGeneratorSchema } from './schema';
import { applicationGenerator, E2eTestRunner } from '@nx/angular/generators';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const tasks: GeneratorCallback[] = [];

  await applicationGenerator(tree, {
    ...options,
    skipFormat: true,
    e2eTestRunner: E2eTestRunner.None,
    style: 'scss',
  });

  generateAdditionalFiles(tree, options);

  tasks.push(
    addDependenciesToPackageJson(tree, { '@angular/material': '~20.1.0' }, {})
  );

  return runTasksInSerial(...tasks);
}

export default presetGenerator;

function generateAdditionalFiles(tree: Tree, options: PresetGeneratorSchema) {
  const projectRoot = options.directory;
  const srcFolder = path.join(__dirname, 'files');

  const target = path.relative(
    path.join(tree.root),
    path.join(process.cwd(), projectRoot)
  );

  tree.delete(joinPathFragments(target, 'src', 'app'));

  generateFiles(tree, srcFolder, target, {
    ...options,
    prettyName: prettifyName(options.directory),
  });
}

function prettifyName(directory: string): string {
  const parts = directory.split('/');
  return parts[parts.length - 1]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
