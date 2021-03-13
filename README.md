# flow-react-cli

![npm](https://img.shields.io/npm/v/flow-react-cli)
![NPM](https://img.shields.io/npm/l/flow-react-cli)
![npm](https://img.shields.io/npm/dt/flow-react-cli)

![logo](./design/logo.jpg)

# Documentation

- [About flow-react-cli](https://github.com/Jay-flow/flow-react-cli#about-flow-react-cli)
- [Installation](https://github.com/Jay-flow/flow-react-cli#installation)
- [Usage](https://github.com/Jay-flow/flow-react-cli#usage)
- [Preview](https://github.com/Jay-flow/flow-react-cli#preview)
- [Contributing to flow-react-cli](https://github.com/Jay-flow/flow-react-cli#contributing-to-flow-react-cli)

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
> 1.  When you create a project, you can automatically update and use the most recent update of the packages that have dependencies.
> 2.  When you create a React project, you can install the CSS library together.
> 3.  You can create any project when you create a component. This means that you can create components, even if they are not projects created using that package.
> 4.  When creating a project or component, there is no restriction on

> flow-react-cli updates packages for dependencies using the [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) package when you create or update a project.

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

I am working hard to develop this package with affection.
I check all the requests and issues.
I'm not a JavaScript developer. There are many parts of this package that are lacking.

This package needs your help.

Please write about the code and if you have a better code, please revise it and contribute.

Please upload the idea or bug for package function development on the [issue](https://github.com/Jay-flow/flow-react-cli/issues).

I like all discussions related to development because I am in a learning position.

If you have any further questions or need to contact me, please email jay.flow.dev@gmail.com.

**Thank you for using my package and for your interest.**
