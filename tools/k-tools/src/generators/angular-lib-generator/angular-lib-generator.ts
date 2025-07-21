import {
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import { AngularLibGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';
import * as path from 'path';

export async function angularLibGeneratorGenerator(
  tree: Tree,
  options: AngularLibGeneratorGeneratorSchema
) {
  const name = options.name ?? getLastPartOfPath(options.directory);

  const schema: Schema = {
    ...options,
    name,
    buildable: true,
    publishable: true,
    importPath: `@kathrine0/${name}`,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
  };

  await libraryGenerator(tree, schema);

  // generate app files
  generateAdditionalFiles(tree, options);


  // modify plugins.json file
  // modify routing


  // format files
  await formatFiles(tree);

}

export default angularLibGeneratorGenerator;

function generateAdditionalFiles(
  tree: Tree,
  options: AngularLibGeneratorGeneratorSchema
) {
  const projectRoot = options.directory;
  const name = options.name ?? extractNameFromDirectory(options.directory);
  const subtitle = options.subtitle ?? `${name} Subtitle`;
  const description =
    options.description ??
    `This is the default description for the ${name} library. It provides essential features and functionalities that enhance the overall user experience.`;
  const route = getLastPartOfPath(options.directory).toLowerCase();

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    path.relative(path.join(tree.root), path.join(process.cwd(), projectRoot)),
    {
      name,
      subtitle,
      description,
      route,
    }
  );
}

function extractNameFromDirectory(directory: string): string {
  return getLastPartOfPath(directory)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getLastPartOfPath(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1];
}
