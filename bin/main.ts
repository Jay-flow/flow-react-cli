import shell from "shelljs"
import program from "commander"
import pkg from "../package.json"
import selectShell from "select-shell"
import chalk from "chalk"

const welcome = `
░░░░░██╗░█████╗░██╗░░░██╗░░░░░░███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░░█████╗░██╗░░░░░██╗
░░░░░██║██╔══██╗╚██╗░██╔╝░░░░░░██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██║░░░░░██║
░░░░░██║███████║░╚████╔╝░█████╗█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██║░░╚═╝██║░░░░░██║
██╗░░██║██╔══██║░░╚██╔╝░░╚════╝██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██║░░██╗██║░░░░░██║
╚█████╔╝██║░░██║░░░██║░░░░░░░░░██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░╚█████╔╝███████╗██║
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░░░░░░░╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░░╚════╝░╚══════╝╚═╝
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

program
  .version(pkg.version)
  .command("init")
  .description("Initialize Boilerplate for React.")
  .action(() => {
    shell.echo(chalk.cyanBright(welcome))
  })

program.parse(process.argv)
