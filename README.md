# bystro

### A CLI utility library for scaffolding code templates and boilerplates.

Sometimes, you can find yourself copypasting a whole folder of files which represents some component (f.e. React component) and then renaming filenames, variables, etc. to satisfy your needs. Bystro helps you to automate this process.

![NPM Version](https://img.shields.io/npm/v/bystro)
![TravisCI Build](https://badgen.net/travis/streletss/bystro?label=build)
![Code Coverage](https://img.shields.io/coveralls/github/streletss/bystro)

## Install

```console
$ npm install -D bystro
```

## Usage

```console
$ bystro <template_name> <path>
```

> **Note**: You can alternatively run `npx bystro <template_name> <path>` without install step.

##### Arguments

`<template_name>` - Name of the template you want to scaffold.

`<path>`- Path to scaffold template in.

List of available templates can be found [here](https://github.com/streletss/bystro/tree/main/templates)

## Creating a template

To create a local template start by making a `.bystro` directory in the current working directory:

```console
$ mkdir .bystro
```

After that you can add templates:

```console
$ mkdir .bystro/my_template
$ mkdir .bystro/my_template/__Name__
$ echo 'import "./__Name__.css";' > .bystro/my_template/__Name__.js
$ echo '// hello from __Name__' > .bystro/my_template/__Name__.css
$ touch .bystro/my_template/.templaterc
```

##### Configuration

`.templaterc` is required to tell `bystro` how to process it. To make the above template to work add the following to its `.templaterc`:

```json
{
  "variablePrefix": "__",
  "variableSuffix": "__",
  "variables": [
    {
      "name": "Name",
      "description": "Component name"
    }
  ]
}
```

##### Scaffolding

To scaffold the above template run `npx bystro my_template <path>` and you'll be prompted to fill the variable values:

```shell
? Enter Name (Component name): MyComponent
```

And that's it. Goto `<path>` to view the scaffolded template tree:

```shell
|____MyComponent
| |____MyComponent.js
| |      import "./MyComponent.css";
| |____MyComponent.css
|        // hello from __Name__
```

##### Publish

To make your template globally available just create a PR including your template in the [`templates` folder](https://github.com/streletss/bystro/tree/main/templates).

## Maintainers

- [Nikita Streletss](https://github.com/streletss)
