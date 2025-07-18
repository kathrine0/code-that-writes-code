import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import { AngularLibGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';

export async function angularLibGeneratorGenerator(
  tree: Tree,
  options: AngularLibGeneratorGeneratorSchema
) {

  const schema: Schema = {
    ...options,
    buildable: true,
    publishable: true,
    importPath: `@kathrine0/${options.name}`,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
  }

  await libraryGenerator(tree, schema);


  // const projectRoot = `libs/${options.name}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  // await formatFiles(tree);
}

export default angularLibGeneratorGenerator;
