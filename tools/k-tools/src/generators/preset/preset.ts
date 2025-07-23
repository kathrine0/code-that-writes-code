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
import { PresetGeneratorSchema } from './schema';
import { applicationGenerator, E2eTestRunner } from '@nx/angular/generators';


export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  return await import('../basic-generator/basic-generator').then(({ basicGeneratorGenerator }) =>
    basicGeneratorGenerator(tree, options),
  );
}

export default presetGenerator;


// export async function presetGenerator(
//   tree: Tree,
//   options: PresetGeneratorSchema
// ) {
//   const tasks: GeneratorCallback[] = [];

//   logger.log(
//     `Generating a new Angular application with the name: ${options.name}`
//   );

//   const normalizedOptions = {
//     ...options,
//     directory: options.name // `apps/${options.name}`,
//   };

//   logger.log(
//     `Creating application in directory: ${normalizedOptions.directory}`
//   );

//   await applicationGenerator(tree, {
//     ...normalizedOptions,
//     skipFormat: true,
//     e2eTestRunner: E2eTestRunner.None,
//     style: 'scss',
//   });

//   logger.log(
//     `Generating additional files for the application: ${normalizedOptions.name}`
//   );

//   generateAdditionalFiles(tree, normalizedOptions);

//   logger.log(
//     `Adding Angular Material dependencies to the application: ${normalizedOptions.name}`
//   );

//   tasks.push(
//     addDependenciesToPackageJson(
//       tree,
//       { '@angular/material': '~20.1.0', '@angular/cdk': '~20.1.0' },
//       {}
//     )
//   );

//   logger.log(
//     `Formatting files for the application: ${normalizedOptions.name}`
//   );


//   await formatFiles(tree);

//   logger.log(
//     `Preset generator completed for the application: ${normalizedOptions.name}`
//   );

//   return runTasksInSerial(...tasks);
// }

// export default presetGenerator;

// function generateAdditionalFiles(
//   tree: Tree,
//   normalizedOptions: PresetGeneratorSchema & { directory: string }
// ) {
//   const projectRoot = normalizedOptions.directory;
//   const srcFolder = path.join(__dirname, 'files');

//   const target = path.relative(
//     path.join(tree.root),
//     path.join(process.cwd(), projectRoot)
//   );

//   tree.delete(joinPathFragments(target, 'src', 'app'));

//   generateFiles(tree, srcFolder, target, {
//     ...normalizedOptions,
//     prettyName: prettifyName(normalizedOptions.name),
//   });
// }

// function prettifyName(name: string): string {
//   return name
//     .split('-')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }
