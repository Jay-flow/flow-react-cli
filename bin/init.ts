import program from "commander"
import shell from "shelljs"
import pkg from "../package.json"
import chalk from "chalk"
import inquirer from "inquirer"
import selectShell from "select-shell"
import ora from "ora"
import { camelCaseToDash } from "../utils/functions"
import fs from "fs"

enum TYPE_OF_APP {
  REACT = 1,
  NEXT = 2
}

const welcome = `
███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░██████╗░███████╗░█████╗░░█████╗░████████╗░░░░░░░█████╗░██╗░░░░░██╗
██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██║░░░░░██║
█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██████╔╝█████╗░░███████║██║░░╚═╝░░░██║░░░█████╗██║░░╚═╝██║░░░░░██║
██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██╔══██╗██╔══╝░░██╔══██║██║░░██╗░░░██║░░░╚════╝██║░░██╗██║░░░░░██║
██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░██║░░██║███████╗██║░░██║╚█████╔╝░░░██║░░░░░░░░░╚█████╔╝███████╗██║
╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░░░░░░░░╚════╝░╚══════╝╚═╝
`

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
    shell.echo(chalk.redBright("Please provide name of your app."))
    return false
  } else if (!/^[a-z0-9]+$/i.test(name)) {
    shell.echo(chalk.redBright("App name should be alphaNumeric."))
    return false
  } else if (fs.existsSync(`./${name}`)) {
    shell.echo(chalk.redBright("App name with the same name already exists."))
    return false
  }
  return true
}

async function nameTheComponent() {
  return inquirer.prompt([
    {
      name: "value",
      message: "Name of your app (alphaNumeric): "
    }
  ])
}

function createReactApp(nameOfApp: string, answer: any) {
  const gitDownSpinner = ora("Creating React app: " + nameOfApp + "...\n")
  gitDownSpinner.start()
  const gitURL = "-b main https://github.com/Jay-flow/flow-react-ts.git"
  shell.exec(`git clone ${gitURL} ${nameOfApp}`, (code: number, stdout: string, stderr: string) => {
    gitDownSpinner.stop()
    flowUp(code, stdout, stderr, nameOfApp, answer)
  })
}

function createNextApp(nameOfApp: string, answer: any) {
  const gitDownSpinner = ora("Creating Next app: " + nameOfApp + "...\n")
  gitDownSpinner.start()
  const gitURL = "-b main https://github.com/Jay-flow/flow-next-ts.git"
  shell.exec(`git clone ${gitURL} ${nameOfApp}`, (code: number, stdout: string, stderr: string) => {
    gitDownSpinner.stop()
    flowUp(code, stdout, stderr, nameOfApp, answer)
  })
}

function flowUp(code: number, stdout: string, stderr: string, nameOfApp: string, answer: any) {
  const projectCleanupSpinner = ora("Project Cleanup...\n")
  projectCleanupSpinner.start()
  if (code !== 0) {
    shell.echo(chalk.cyanBright(`code: ${code}`))
    shell.echo(chalk.cyanBright(`Program output: ${stdout}`))
    shell.echo(chalk.cyanBright(`Program stderr: ${stderr}`))
  }

  setTimeout(() => {
    shell.sed("-i", "flow-react-ts", camelCaseToDash(`${nameOfApp}`), `./${nameOfApp}/package.json`)

    shell.rm("-rf", `${nameOfApp}/.git`)
    projectCleanupSpinner.stop()

    shell.echo(chalk.greenBright(answer.value + " created."))
    shell.echo(chalk.greenBright("cd " + answer.value + " and npm install and npm run dev."))

    process.exit(0)
  }, 2000)
}

function invalidProgramInput() {
  shell.echo(chalk.redBright("There is no template for current choice. Please try again."))

  process.exit(0)
}

function selectTheNameOfTheApp() {
  list.on("select", async (options) => {
    shell.echo(chalk.yellow("Select the name of the app."))
    const answer = await nameTheComponent()
    const nameOfApp = answer.value
    if (!isValidateComponentNaming(nameOfApp)) {
      return process.exit(0)
    }
    switch (options[0].value) {
      case TYPE_OF_APP.REACT:
        createReactApp(nameOfApp, answer)
        break
      case TYPE_OF_APP.NEXT:
        createNextApp(nameOfApp, answer)
        break
      default:
        invalidProgramInput()
    }
  })
}

const init = () => {
  program
    .version(pkg.version)
    .command("init")
    .description("Initialize Boilerplate for React.")
    .action(() => {
      shell.echo(chalk.cyanBright(welcome))
      shell.echo(chalk.yellow("Select which boilerplate you want to generate from flow-react-cli."))

      list
        .option(" React App (typescript) ", TYPE_OF_APP.REACT)
        .option(" Next App (typescript) ", TYPE_OF_APP.NEXT)
        .list()

      selectTheNameOfTheApp()
      list.on("cancel", (options: string) => {
        shell.echo(`Operation has been canceled, ${options.length} option was selected.`)
        process.exit(0)
      })
    })
}

export default init
