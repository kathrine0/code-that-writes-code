import {
  formatFiles,
  generateFiles,
  getProjects,
  Tree,
  updateJson,
  names,
} from '@nx/devkit';
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

  // generate app files
  generateAdditionalFiles(tree, normalizedOptions);

  // modify plugins.json file
  modifyPluginJson(tree, normalizedOptions);

  // modify routing
  modifyAppRoutes(tree, normalizedOptions);

  // format files
  await formatFiles(tree);
}

export default kLibGenerator;

function normalizeOptions(
  options: KLibGeneratorSchema
): GeneratorOptions {
  const name =
    options.name ?? getLastPartOfPath(options.directory).toLowerCase();

  const componentName = names(name).className;
  const prettyName = prettifyName(name);
  const subtitle = options.subtitle ?? `${prettyName} Subtitle`;
  const description =
    options.description ??
    `This is the default description for the ${prettyName} library. It provides essential features and functionalities that enhance the overall user experience.`;
  const route = names(name).fileName;
  const importPath = `@kathrine0/${names(name).fileName}`;

  return {
    ...options,
    name,
    componentName,
    subtitle,
    description,
    route,
    importPath,
    prettyName,
  };
}

function prettifyName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getLastPartOfPath(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1];
}


function generateAdditionalFiles(tree: Tree, options: GeneratorOptions) {
  const projectRoot = options.directory;

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    path.relative(path.join(tree.root), path.join(process.cwd(), projectRoot)),
    options
  );
}

interface PluginConfig {
  name: string;
  subtitle: string;
  description: string;
  route: string;
}

function modifyPluginJson(tree: Tree, options: GeneratorOptions) {
  const targetProjectRoot = getProjects(tree).get(
    options.targetApp
  )?.sourceRoot;

  if (!targetProjectRoot) {
    throw new Error(`Target project "${options.targetApp}" not found.`);
  }

  const pluginsPath = path.join(targetProjectRoot, 'plugins.json');
  if (!tree.exists(pluginsPath)) {
    tree.write(pluginsPath, JSON.stringify([], null, 2));
  }

  updateJson(tree, pluginsPath, (json: PluginConfig[]) => {
    if (!json.some((p: PluginConfig) => p.name === options.name)) {
      json.push({
        name: options.prettyName,
        subtitle: options.subtitle,
        description: options.description,
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

  if (!targetProjectRoot) {
    throw new Error(`Target project "${options.targetApp}" not found.`);
  }

  const routesPath = path.join(targetProjectRoot, 'app', 'app.routes.ts');

  if (!tree.exists(routesPath)) {
    throw new Error(`Routes file "${routesPath}" does not exist.`);
  }

  const routeTemplate = `
    ({
      path: '${options.route}',
      loadComponent: () => import('${options.importPath}').then((m) => m.${options.componentName})
    })
  `;
  const tsNode = j(routeTemplate).find(j.ObjectExpression).get(0).node;

  const content = tree.read(routesPath, 'utf-8');
  if (!content) {
    throw new Error(`Could not read routes file "${routesPath}".`);
  }

  const newContent = j(content, { parser: { parse } })
    .find(j.ExportNamedDeclaration)
    .find(j.VariableDeclaration)
    .find(j.ArrayExpression)
    .forEach((path) => {
      path.node.elements.push(tsNode);
    })
    .toSource({ quote: 'single', trailingComma: true });

  tree.write(routesPath, newContent);
}
