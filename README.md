# Code That Writes Code: Supercharge Your Nx Workspace with Generators and Executors

This is the repository for the "Code That Writes Code: Supercharge Your Nx Workspace with Generators and Executors" talk.

## Run demo app

install dependencies:

```bash
npm install
```

start project:

```bash
nx serve dc-fandom
```

## Run library generator

```bash
npx nx generate @kathrine0/k-tools:k-lib --image=batman.jpg --name=batman
```

## Run workspace generator

If you want to test workspace creation from preset, first publish the tools packages in the local npm registry.

After packages are available, run

```bash
npx create-nx-workspace my-workspace --preset=@kathrine0/k-tools
```

or

```bash
npx @kathrine0/create-workspace my-other-workspace
```

## Run custom executors

```bash
nx run k-tools:version-publish --specifier=<version>
```

```bash
nx publish-all --specifier=<version>
```

## Talk Abstract

Nx generators and executors can automate your workflow, eliminate boilerplate, and bring consistency to your monorepo. In this talk, you’ll learn how to create custom generators that scaffold code, build powerful executors for running tasks, and integrate both seamlessly into your Nx workspace.

## Slides

[https://bit.ly/3HuLmQf](https://bit.ly/3HuLmQf)
