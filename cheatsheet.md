# Code that writes code

## Basic Generator

nx add @nx/plugin
nx generate @nx/plugin:plugin tools/k-tools
nx generate @nx/plugin:generator tools/k-tools/src/generators/basic-generator/basic-generator

nx generate @kathrine0/k-tools:basic-generator first-lib

## Angular Library Generator

nx generate @nx/plugin:generator tools/k-tools/src/generators/k-lib/k-lib

## Angular App Generator

nx generate @nx/plugin:generator tools/k-tools/src/generators/k-app/k-app

### Preset

nx generate @nx/plugin:generator tools/k-tools/src/generators/preset/preset

### Release

nx local-registry
