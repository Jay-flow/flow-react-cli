# flow-react-cli

![npm](https://img.shields.io/npm/v/flow-react-cli)
![NPM](https://img.shields.io/npm/l/flow-react-cli)
![npm](https://img.shields.io/npm/dt/flow-react-cli)

![logo](./design/logo.jpg)

# Documentation

- [About flow-react-cli](https://github.com/Jay-flow/flow-react-cli#)
- [Installation](https://flutter.dev/docs)
- [Usage](https://github.com/flutter/flutter/wiki)
- [Preview](https://github.com/flutter/flutter/blob/master/CONTRIBUTING.md)
- [Contributing to flow-react-cli](https://github.com/flutter/flutter/wiki)

# About flow-react-cli

This CLI program is a package that creates the boilerplate and components needed to develop React.
Using flow-react-cli, you can increase the productivity of React.

The two main features of this CLI program are as follows:

1. Create a React or Next.js project that has completed the installation and setup of the Typescip, Eslint, Pretty, and CSS libraries (styled-components or Tailwind CSS).
2. When you create a functional component page, you can create a page where the boilerplate was created.

# 📢 Notes

> This program was inspired by [dooboo-cli](https://github.com/dooboolab/dooboo-cli) and created by referring to the code in the dooboo-cli.
>
> The difference between flow-react-cli and dooboo-cli is shown below.
>
> 1.  When you create a project, you can automatically update and use the most recent update of the packages that have dependencies.the name.
> 2.  When you create a React project, you can install the CSS library together.
> 3.  You can create any project when you create a component. This means that you can create components, even if they are not projects created using that package.
> 4.  When creating a project or component, there is no restriction on

> flow-react-cli updates packages for dependencies using the [npm-check-updates]() package when you create or update a project.

# Installation

`npm install -g flow-react-cli`
or `yarn global add flow-react-cli`

# Usage

```
Usage: flow [command]

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  init                        Initialize the React or Next.js project, including the Boilerplate.
  update                      Use the npm-check-updates package to update the package in the project.
  page <fileName> <filePath>  Generate page(screen) component.
  help [command]              display help for command
```

# Preview

![preview](./design/preview.gif)

# Contributing to flow-react-cli
