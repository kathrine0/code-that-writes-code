# Code that writes code

## Basic Generator

nx add @nx/plugin
nx generate @nx/plugin:plugin tools/k-tools
nx generate @nx/plugin:generator tools/k-tools/src/generators/basic-generator/basic-generator

nx generate @kathrine0/k-tools:basic-generator first-lib

## Angular Library Generator

nx generate generator tools/k-tools/src/generators/k-lib/k-lib

## Angular App Generator

nx generate generator tools/k-tools/src/generators/k-app/k-app

## Preset

nx generate generator tools/k-tools/src/generators/preset/preset

### Release

nx local-registry

nx release version --specifier=

npm run publish:k-tools
npm run publish:create-workspace

npx create-nx-workspace my-workspace --preset=@kathrine0/k-tools

## Installer

nx generate create-package tools/create-workspace --project k-tools --name create-workspace

change namespace to @kathrine0/create-workspace
add dependency to @kathrine0/k-tools

npx @kathrine0/create-workspace my-other-workspace

## Migration

nx generate @nx/plugin:migration --path=tools/k-tools/src/generators/k-migration/k-migration --packageVersion=0.0.54

### run migration

nx migrate @kathrine0/k-tools@0.0.54
npm install
npx nx migrate --run-migrations

## Executor

nx generate executor tools/k-tools/src/executors/version-publish/version-publish

"version-publish": {
  "executor": "@kathrine0/k-tools:version-publish",
  "options": {}
}

nx run k-tools:version-publish --specifier=<version>

## Composable Executor

nx generate executor tools/k-tools/src/executors/publish-all/publish-all

"publish-all": {
  "executor": "@kathrine0/k-tools:publish-all"
}


nx publish-all --specifier=<version>
