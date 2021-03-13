#! /usr/bin/env node

import program from "commander"
import init from "./init"
import shell from "shelljs"
import chalk from "chalk"
import pkg from "../package.json"
import page from "./page"
import updateNotifier from "update-notifier"
import update from "./update"

const printWelcomeMessage = () => {
  const welcome = `
█▀▀ █   █▀█ █ █ █ ▄▄ █▀█ █▀▀ ▄▀█ █▀▀ ▀█▀ ▄▄ █▀▀ █   █
█▀▀ █▄▄ █▄█ ▀▄▀▄▀    █▀▄ ██▄ █▀█ █▄▄  █     █▄▄ █▄▄ █
  `
  shell.echo(chalk.cyanBright(welcome))
}

const checkPkgUpdate = () => {
  const notifier = updateNotifier({ pkg })
  notifier.notify({ isGlobal: true })
}

printWelcomeMessage()
checkPkgUpdate()

program.name("flow").usage("[command]")

init()
update()
page()

program.parse(process.argv)
