import program from "commander"
import shell from "shelljs"
import pkg from "../package.json"
import chalk from "chalk"
import inquirer from "inquirer"
import selectShell from "select-shell"
import ora from "ora"
import { AppNameToNodePackageName } from "../utils/functions"
import fs from "fs"
import updateNotifier from "update-notifier"
import boxen from "boxen"

enum TYPE_OF_APP {
  REACT = 1,
  NEXT = 2
}

enum TYPE_OF_STYLE {
  TAILWIND = "Tailwind CSS",
  STYLED_COMPONENTS = "styled-components"
}

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
})

if (notifier.update)
  shell.echo(chalk.blueBright(boxen(`Update available: ${notifier.update.latest}`, { padding: 1 })))

const welcome = `
███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░██████╗░███████╗░█████╗░░█████╗░████████╗░░░░░░░█████╗░██╗░░░░░██╗
██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██║░░░░░██║
█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██████╔╝█████╗░░███████║██║░░╚═╝░░░██║░░░█████╗██║░░╚═╝██║░░░░░██║
██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██╔══██╗██╔══╝░░██╔══██║██║░░██╗░░░██║░░░╚════╝██║░░██╗██║░░░░░██║
██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░██║░░██║███████╗██║░░██║╚█████╔╝░░░██║░░░░░░░░░╚█████╔╝███████╗██║
╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░░░░░░░░╚════╝░╚══════╝╚═╝
`
const selectShellStyle = {
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
}

const appList = selectShell(selectShellStyle)

function isValidateComponentNaming(name: string) {
  if (!name) {
    shell.echo(chalk.redBright("Please provide name of your app."))
    return false
  } else if (!/^[a-z0-9\-_]+$/i.test(name)) {
    shell.echo(chalk.redBright("App name cannot contain special symbols."))
    return false
  } else if (fs.existsSync(`./${name}`)) {
    shell.echo(chalk.redBright("App name with the same name already exists."))
    return false
  }
  return true
}

async function nameTheApp() {
  return inquirer.prompt([
    {
      name: "value",
      message: "Name of your app:"
    }
  ])
}

async function selectStyle() {
  return inquirer.prompt([
    {
      name: "value",
      type: "list",
      choices: [TYPE_OF_STYLE.TAILWIND, TYPE_OF_STYLE.STYLED_COMPONENTS],
      message: "Select the CSS you want: "
    }
  ])
}

async function isWantStyle() {
  return inquirer.prompt([
    {
      name: "value",
      type: "confirm",
      message: "Do you want to install the CSS library?"
    }
  ])
}

function createApp(gitURL: string, nameOfApp: string, defaultNodePackageName: string) {
  const gitDownSpinner = ora("Creating app: " + nameOfApp + "...\n")
  gitDownSpinner.start()
  shell.exec(`git clone ${gitURL} ${nameOfApp}`, (code: number, stdout: string, stderr: string) => {
    gitDownSpinner.stop()
    if (code !== 0) {
      shell.echo(chalk.cyanBright(`code: ${code}`))
      shell.echo(chalk.cyanBright(`Program output: ${stdout}`))
      shell.echo(chalk.cyanBright(`Program stderr: ${stderr}`))
    }
    flowUp(nameOfApp, defaultNodePackageName)
  })
}

function flowUp(nameOfApp: string, defaultNodePackageName: string) {
  const projectCleanupSpinner = ora("Project Cleanup...\n")
  projectCleanupSpinner.start()

  setTimeout(() => {
    shell.sed(
      "-i",
      defaultNodePackageName,
      AppNameToNodePackageName(`${nameOfApp}`),
      `./${nameOfApp}/package.json`
    )
    shell.rm("-rf", `${nameOfApp}/.git`)
    projectCleanupSpinner.stop()

    const npmInstallSpinner = ora("npm install...just a moment, please.\n").start()
    shell.cd(nameOfApp)
    shell.exec("npm install")
    npmInstallSpinner.stop()

    shell.echo(chalk.greenBright(nameOfApp + " created."))
    process.exit(0)
  }, 2000)
}

function invalidProgramInput() {
  shell.echo(chalk.redBright("There is no app for current choice. Please try again."))
  process.exit(0)
}

function getGitURL(selectValue: number, style: string): string {
  let branch = "main"
  if (style === TYPE_OF_STYLE.STYLED_COMPONENTS) {
    branch = "styled-components"
  } else if (style === TYPE_OF_STYLE.TAILWIND) {
    branch = "tailwind-css"
  }
  switch (selectValue) {
    case TYPE_OF_APP.REACT:
      return `-b ${branch} https://github.com/Jay-flow/flow-react-ts.git`
    case TYPE_OF_APP.NEXT:
      return `-b ${branch} https://github.com/Jay-flow/flow-next-ts.git`
    default:
      invalidProgramInput()
  }
}

function getDefaultNodePackageName(selectValue: number): string {
  switch (selectValue) {
    case TYPE_OF_APP.REACT:
      return "flow-react-ts"
    case TYPE_OF_APP.NEXT:
      return "flow-next-ts"
    default:
      invalidProgramInput()
  }
}

function selectTheNameOfTheApp() {
  appList.on("select", async (options) => {
    const isStyle = await isWantStyle()
    let style = null
    if (isStyle.value) {
      const selectStyleLibrary = await selectStyle()
      style = selectStyleLibrary.value
    }
    shell.echo(chalk.yellow("Select the name of the app."))
    const appName = await nameTheApp()
    const nameOfApp = appName.value
    if (!isValidateComponentNaming(nameOfApp)) {
      return process.exit(0)
    }
    const gitURL = getGitURL(options[0].value, style)
    const defaultNodePackageName = getDefaultNodePackageName(options[0].value)
    createApp(gitURL, nameOfApp, defaultNodePackageName)
  })
}

function cancelEventHandling() {
  appList.on("cancel", (options: string) => {
    shell.echo(`Operation has been canceled, ${options.length} option was selected.`)
    process.exit(0)
  })
}

function showSelectAppList() {
  appList
    .option(" React App (typescript) ", TYPE_OF_APP.REACT)
    .option(" Next App (typescript) ", TYPE_OF_APP.NEXT)
    .list()
}

const init = () => {
  program
    .version(pkg.version)
    .command("init")
    .description("Initialize boilerplate for React.")
    .action(() => {
      shell.echo(chalk.cyanBright(welcome))
      shell.echo(chalk.yellow("Select which boilerplate you want to generate from flow-react-cli."))

      showSelectAppList()
      selectTheNameOfTheApp()
      cancelEventHandling()
    })
}

export default init
