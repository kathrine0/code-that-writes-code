# Code that writes code

- add plugin
- add library generator
  - run it
  - insert `libraryGenerator`
  - extend schema.json `lib1-schema`
  - extend schema.d.ts `lib2-schema-implementation`
  - normalize options `lib3-normalize-options` & `lib4-normalize-options-implementation`
  - modify plugin.json `lib5-modify-plugin-json`
  - modify-app-routes `lib6-modify-app-routes`
- add app generator

## Setup

nx add @nx/plugin
nx generate plugin tools

## Angular Library Generator

nx generate generator tools/src/generators/hero-lib/hero-lib

nx generate @kathrine0/tools:hero-lib my-lib

## Angular App Generator

nx generate generator tools/src/generators/fandom-app/fandom-app

nx generate @kathrine0/tools:fandom-app my-app

## Preset

nx generate generator tools/src/generators/preset/preset

### Release

nx local-registry

nx release version --specifier=

npm run publish:tools
npm run publish:create-workspace

npx create-nx-workspace my-workspace --preset=@kathrine0/tools

## Installer

nx generate create-package create-workspace --project tools --name create-workspace

change namespace to @kathrine0/create-workspace
add dependency to @kathrine0/tools

npx @kathrine0/create-workspace my-other-workspace

## Migration

nx generate @nx/plugin:migration --path=tools/src/generators/k-migration/k-migration --packageVersion=0.0.54

### run migration

nx migrate @kathrine0/tools
npm install
npx nx migrate --run-migrations

## Executor

nx generate executor tools/src/executors/version-publish/version-publish

"version-publish": {
  "executor": "@kathrine0/tools:version-publish",
  "options": {}
}

nx run tools:version-publish --specifier=<version>

## Composable Executor

nx generate executor tools/src/executors/publish-all/publish-all

"publish-all": {
  "executor": "@kathrine0/tools:publish-all"
}

nx publish-all --specifier=<version>

## package.json publish

"publish:k-tools": "npm publish ./dist/tools",
"publish:create-workspace": "npm publish ./dist/create-workspace"

# cleanup

find . -type d -empty -delete
rm -rf .nx .angular dist
