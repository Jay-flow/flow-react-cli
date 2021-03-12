import program from "commander"
import shell from "shelljs"
import pkg from "../package.json"
import chalk from "chalk"
import inquirer from "inquirer"
import selectShell from "select-shell"
import ora from "ora"
import { AppNameToNodePackageName } from "../utils/functions"
import fs from "fs"
import Selection from "../model/Selection"
import { TYPE_OF_APP, TYPE_OF_STYLE } from "../model/Type"
import { selectShellStyle } from "../model/SetUp"

const selection = new Selection()
const appList = selectShell(selectShellStyle)

function isValidateComponentNaming() {
  if (!selection.appName) {
    shell.echo(chalk.redBright("Please provide name of your app."))
    return false
  } else if (!/^[a-z0-9\-_]+$/i.test(selection.appName)) {
    shell.echo(chalk.redBright("App name cannot contain special symbols."))
    return false
  } else if (fs.existsSync(`./${selection.appName}`)) {
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

function createApp() {
  const gitDownSpinner = ora("Creating app: " + selection.appName + "...\n")
  gitDownSpinner.start()
  const gitURL = getGitURL()
  shell.exec(
    `git clone ${gitURL} ${selection.appName}`,
    (code: number, stdout: string, stderr: string) => {
      gitDownSpinner.stop()
      if (code !== 0) {
        shell.echo(chalk.cyanBright(`code: ${code}`))
        shell.echo(chalk.cyanBright(`Program output: ${stdout}`))
        shell.echo(chalk.cyanBright(`Program stderr: ${stderr}`))
      }
      flowUp()
    }
  )
}

function flowUp() {
  const defaultNodePackageName = getDefaultNodePackageName()
  const projectCleanupSpinner = ora("Project Cleanup...\n")
  projectCleanupSpinner.start()

  setTimeout(() => {
    shell.sed(
      "-i",
      defaultNodePackageName,
      AppNameToNodePackageName(`${selection.appName}`),
      `./${selection.appName}/package.json`
    )
    shell.rm("-rf", `${selection.appName}/.git`)
    projectCleanupSpinner.stop()
    shell.cd(selection.appName)
    shell.exec("flow update")
    reinstallAutotprefixcer()
    shell.echo(chalk.greenBright(selection.appName + " created."))
    process.exit(0)
  }, 2000)
}

function reinstallAutotprefixcer() {
  if (selection.styleLibrary == TYPE_OF_STYLE.TAILWIND && selection.appType == TYPE_OF_APP.REACT) {
    const tailwindSpinner = ora("autotprefixcer setting for tailwindcss...\n").start()
    shell.exec("npm install autoprefixer@^9.8.6")
    tailwindSpinner.succeed()
  }
}

function invalidProgramInput() {
  shell.echo(chalk.redBright("There is no app for current choice. Please try again."))
  process.exit(0)
}

function getGitURL(): string {
  let branch = "main"
  if (selection.styleLibrary === TYPE_OF_STYLE.STYLED_COMPONENTS) {
    branch = "styled-components"
  } else if (selection.styleLibrary === TYPE_OF_STYLE.TAILWIND) {
    branch = "tailwind-css"
  }
  switch (selection.appType) {
    case TYPE_OF_APP.REACT:
      return `-b ${branch} https://github.com/Jay-flow/flow-react-ts.git`
    case TYPE_OF_APP.NEXT:
      return `-b ${branch} https://github.com/Jay-flow/flow-next-ts.git`
    default:
      invalidProgramInput()
  }
}

function getDefaultNodePackageName(): string {
  switch (selection.appType) {
    case TYPE_OF_APP.REACT:
      return "flow-react-ts"
    case TYPE_OF_APP.NEXT:
      return "flow-next-ts"
    default:
      invalidProgramInput()
  }
}

async function selectCSSLibrary() {
  const isStyle = await isWantStyle()
  if (isStyle.value) {
    const selectStyleLibrary = await selectStyle()
    selection.styleLibrary = selectStyleLibrary.value
  }
}

function mainProcess() {
  appList.on("select", async (options: Array<any>) => {
    await selectCSSLibrary()
    shell.echo(chalk.yellow("Select the name of the app."))
    const appName = await nameTheApp()
    selection.appName = appName.value
    if (!isValidateComponentNaming()) {
      return process.exit(0)
    }
    selection.appType = options[0].value
    createApp()
  })
}

function cancelEventHandling() {
  appList.on("cancel", (options: string) => {
    shell.echo(`Operation has been canceled, ${options.length} option was selected.`)
    process.exit(0)
  })
}

function setAppList() {
  appList
    .option(" React App (typescript) ", TYPE_OF_APP.REACT)
    .option(" Next App (typescript) ", TYPE_OF_APP.NEXT)
    .list()
}

const init = () => {
  program
    .version(pkg.version)
    .command("init")
    .description("Initialize the React or Next.js project, including the Boilerplate.")
    .action(() => {
      shell.echo(chalk.yellow("Select which boilerplate you want to generate from flow-react-cli."))
      setAppList()
      mainProcess()
      cancelEventHandling()
    })
}

export default init
