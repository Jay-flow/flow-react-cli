import shell from "shelljs"
import chalk from "chalk"
import program from "commander"
import ora from "ora"
import fs from "fs"

const start = () => {
  return program
    .command("start")
    .description("start the project.")
    .action(async () => {
      const spinner = ora("configuring project...\n")

      spinner.start()

      try {
        let exists = fs.existsSync(".flow")

        if (!exists) {
          shell.echo(
            chalk.redBright(
              "\nproject is not in flow repository. Are you sure you are in correct dir?"
            )
          )

          spinner.stop()
          process.exit(0)
        }

        exists = fs.existsSync("node_modules")

        if (!exists) {
          shell.echo(chalk.cyanBright("installing dependencies..."))

          // childProcess.execSync(`yarn`, {stdio: 'inherit'})

          shell.exec("yarn", (code) => {
            if (code === 0) {
              shell.echo(chalk.cyanBright("running project...\n"))
              shell.exec("yarn run dev")

              // childProcess.execSync(`yarn run dev`, {stdio: 'inherit'});
              return
            }

            shell.echo(
              chalk.redBright("Failed installing dependencies. Please try again with yarn.")
            )
          })

          return
        }

        shell.echo(chalk.cyanBright("running project..."))
        // shell.exec(`yarn start`);
        shell.exec("yarn run dev")
        // childProcess.execFileSync('yarn', ['start'], {stdio: 'inherit'});
      } catch (err) {
        shell.echo(chalk.red(err))

        shell.echo(chalk.redBright("failed installing dependencies. Please try again with yarn."))
      } finally {
        spinner.stop()
        process.exit(0)
      }
    })
}

export default start
