import { KAppGeneratorSchema } from './schema';
import { applicationGenerator, E2eTestRunner } from '@nx/angular/generators';
import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  joinPathFragments,
  logger,
  runTasksInSerial,
  Tree,
} from '@nx/devkit';
import * as path from 'path';

export async function kAppGenerator(tree: Tree, options: KAppGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const normalizedOptions = {
    ...options,
    directory: `apps/${options.name}`,
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

export default kAppGenerator;

function generateAdditionalFiles(
  tree: Tree,
  normalizedOptions: KAppGeneratorSchema & { directory: string }
) {
  const projectRoot = normalizedOptions.directory;
  const srcFolder = path.join(__dirname, 'files');

  const target = path.relative(
    path.join(tree.root),
    path.join(process.cwd(), projectRoot)
  );

  tree.delete(joinPathFragments(target, 'src', 'app'));

  generateFiles(tree, srcFolder, target, {
    ...normalizedOptions,
    prettyName: prettifyName(normalizedOptions.name),
  });
}

function prettifyName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
