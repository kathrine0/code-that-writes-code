import { libraryGenerator } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';
import {
  formatFiles,
  generateFiles,
  getProjects,
  names,
  Tree,
  updateJson
} from '@nx/devkit';
import * as j from 'jscodeshift';
import * as path from 'path';
import { parse } from 'recast/parsers/typescript';
import { GeneratorOptions, heroLibGeneratorSchema } from './schema';

export async function heroLibGenerator(
  tree: Tree,
  options: heroLibGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  const schema: Schema = {
    ...normalizedOptions,
    name: names(options.name).className,
    buildable: true,
    publishable: true,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
  };

  await libraryGenerator(tree, schema);

  modifyItemsJson(tree, normalizedOptions);

  modifyAppRoutes(tree, normalizedOptions);

  generateAdditionalFiles(tree, normalizedOptions);

  await formatFiles(tree);
}

function normalizeOptions(
  tree: Tree,
  options: heroLibGeneratorSchema
): GeneratorOptions {

  return {
    ...options,
    directory: options.directory || names(options.name).fileName,
    route: names(options.name).fileName,
    importPath: `@kathrine0/${names(options.name).fileName}`,
    componentName: names(options.name).className,
    selector: `lib-${names(options.name).fileName}`,
  };
}

function modifyItemsJson(tree: Tree, options: GeneratorOptions) {
  const targetProjectRoot = getProjects(tree).get(
    options.targetApp
  )?.sourceRoot;

  if (!targetProjectRoot) {
    throw new Error(`Target project "${options.targetApp}" not found.`);
  }

  const itemsPath = path.join(targetProjectRoot, 'items.json');

  if (!tree.exists(itemsPath)) {
    tree.write(itemsPath, JSON.stringify([], null, 2));
  }

  updateJson(tree, itemsPath, (json) => {
    if (!json.some((p) => p.name === options.name)) {
      json.push({
        name: options.name,
        image: options.image,
        route: options.route,
      });
    }

    return json;
  });
}

function modifyAppRoutes(tree: Tree, options: GeneratorOptions) {
  const targetProjectRoot = getProjects(tree).get(
    options.targetApp
  )?.sourceRoot;

  const routesPath = path.join(targetProjectRoot, 'app', 'app.routes.ts');

  const routeTemplate = `
    ({
      path: '${options.route}',
      loadComponent: () => import('${options.importPath}').then((m) => m.${options.componentName})
    })
  `;

  const content = tree.read(routesPath, 'utf-8');

  const newContent = j(content, { parser: { parse } })
    .find(j.ExportNamedDeclaration)
    .find(j.VariableDeclaration)
    .find(j.ArrayExpression)
    .forEach((path) => {
      const tsNode = j(routeTemplate).find(j.ObjectExpression).get(0).node;
      path.node.elements.push(tsNode);
    })
    .toSource({ quote: 'single', trailingComma: true });

  tree.write(routesPath, newContent);
}

function generateAdditionalFiles(tree: Tree, options: GeneratorOptions) {
  const srcFolder = path.join(__dirname, 'files');

  const target = path.relative(
    path.join(tree.root),
    path.join(
      process.cwd(),
      options.directory,
      'src',
      'lib',
      options.componentName
    )
  );

  tree.delete(target);

  generateFiles(tree, srcFolder, target, options);
}

export default heroLibGenerator;
