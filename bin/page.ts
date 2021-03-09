import shell from "shelljs"
import chalk from "chalk"
import program from "commander"
import ora from "ora"
import fs from "fs"
import path from "path"

const page = () => {
  const isExistFile = (absolutePath: string, spinner: ora.Ora) => {
    const exists = fs.existsSync(absolutePath)
    if (exists) {
      spinner.fail()
      shell.echo(
        chalk.redBright(
          `The same file name already exists.\nPlease delete the file or change the file name.`
        )
      )
      return true
    }
    return false
  }

  const generatePageComponent = (absolutePath: string, fileName: string) => {
    const templateFilePath = path.resolve(
      __dirname,
      "../..",
      "templates/react/pages/FunctionalComponent.tsx"
    )
    shell.cp(templateFilePath, absolutePath)
    shell.sed("-i", "FunctionalComponent", fileName, absolutePath)
  }

  return program
    .command("page <fileName> <filePath>")
    .description("Generate page(screen) component.")
    .action(async (fileName, filePath) => {
      const absolutePath = path.resolve(filePath) + `/${fileName}.tsx`
      const spinner = ora("Creating page component...")
      spinner.start()
      if (isExistFile(absolutePath, spinner)) {
        return process.exit(0)
      }
      generatePageComponent(absolutePath, fileName)
      spinner.succeed()
      shell.echo(chalk.green(`Generated ${fileName} component!`))
    })
}

export default page
