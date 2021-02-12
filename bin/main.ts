#! /usr/bin/env node

import shell from "shelljs"
import program from "commander"
import pkg from "../package.json"
import selectShell from "select-shell"
import chalk from "chalk"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"

const welcome = `
███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░██████╗░███████╗░█████╗░░█████╗░████████╗░░░░░░░█████╗░██╗░░░░░██╗
██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██║░░░░░██║
█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██████╔╝█████╗░░███████║██║░░╚═╝░░░██║░░░█████╗██║░░╚═╝██║░░░░░██║
██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██╔══██╗██╔══╝░░██╔══██║██║░░██╗░░░██║░░░╚════╝██║░░██╗██║░░░░░██║
██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░██║░░██║███████╗██║░░██║╚█████╔╝░░░██║░░░░░░░░░╚█████╔╝███████╗██║
╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░░░░░░░░╚════╝░╚══════╝╚═╝
`

export enum TYPE_OF_REACT {
  FUNCTINAL = 1,
  CLASS = 2
}

const list = selectShell({
  pointer: " ▸ ",
  pointerColor: "yellow",
  checked: " ◉  ",
  unchecked: " ◎  ",
  checkedColor: "blue",
  msgCancel: "No selected options!",
  msgCancelColor: "orange",
  multiSelect: false,
  inverse: true,
  prepend: true
})

function isValidateComponentNaming(name: string) {
  if (!name) {
    shell.echo(chalk.redBright("please provide name of your component."))
    return false
  } else if (!/^[a-z0-9]+$/i.test(name)) {
    shell.echo(chalk.redBright("component name should be alphaNumeric."))
    return false
  }
  return true
}

function nameTheComponent() {
  inquirer
    .prompt([
      {
        name: "value",
        message: "name of your component (alphaNumeric): "
      }
    ])
    .then((answer) => {
      const nameOfComponent = answer.value
      if (!isValidateComponentNaming(nameOfComponent)) {
        nameTheComponent()
      }
      createComponent(nameOfComponent)
    })
}

function createComponent(nameOfComponent: string) {
  console.log(fs.existsSync("templates/FunctionalComponent.tsx"))
}

function selectTheNameOfTheComponent() {
  list.on("select", (options) => {
    shell.echo(chalk.yellow("select the name of the component."))
    nameTheComponent()
  })
}

program
  .version(pkg.version)
  .command("init")
  .description("Initialize Boilerplate for React.")
  .action(() => {
    shell.echo(chalk.cyanBright(welcome))
    shell.echo(chalk.yellow("Select which boilerplate you want to generate from flow-react-cli."))

    list
      .option(" Functinal Component (typescript) ", TYPE_OF_REACT.FUNCTINAL)
      .option(" Class Component (typescript) ", TYPE_OF_REACT.CLASS)
      .list()

    selectTheNameOfTheComponent()
    list.on("cancel", (options: string) => {
      shell.echo(`Operation has been canceled, ${options.length} option was selected.`)
      process.exit(0)
    })
  })

program.parse(process.argv)
