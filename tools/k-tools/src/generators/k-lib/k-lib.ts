import { formatFiles, getProjects, Tree, updateJson, names } from '@nx/devkit';
import { GeneratorOptions, KLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';
import * as path from 'path';
import * as j from 'jscodeshift';
import { parse } from 'recast/parsers/typescript';

export async function kLibGenerator(tree: Tree, options: KLibGeneratorSchema) {
  const normalizedOptions = normalizeOptions(options);

  const schema: Schema = {
    ...normalizedOptions,
    buildable: true,
    publishable: true,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
  };

  await libraryGenerator(tree, schema);

  // modify items.json file
  modifyItemsJson(tree, normalizedOptions);

  // modify routing
  modifyAppRoutes(tree, normalizedOptions);

  // format files
  await formatFiles(tree);
}

export default kLibGenerator;

function normalizeOptions(options: KLibGeneratorSchema): GeneratorOptions {
  return {
    ...options,
    directory: options.directory || names(options.name).fileName,
    route: names(options.name).fileName,
    importPath: `@kathrine0/${names(options.name).fileName}`,
    componentName: names(options.name).className,
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
