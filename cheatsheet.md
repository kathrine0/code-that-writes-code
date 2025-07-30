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

nx build k-tools
cd dist/tools/k-tools

npx create-nx-workspace my-workspace --preset=@kathrine0/k-tools

## Installer

nx generate create-package tools/create-workspace --project k-tools --name create-workspace

change namespace to @kathrine0/create-workspace
add dependency to @kathrine0/k-tools

npx @kathrine0/create-workspace my-other-workspace
