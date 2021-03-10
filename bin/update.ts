import program from "commander"
import shell from "shelljs"
import ora from "ora"

const update = () => {
  program
    .command("update")
    .description("Update packages.")
    .action(() => {
      const updateCheckSpinner = ora("Check package updates...\n").start()
      try {
        shell.exec("npx npm-check-updates --packageFile package.json -u")
        updateCheckSpinner.succeed()
        const npmInstallSpinner = ora("npm install...just a moment, please.\n").start()
        shell.exec("npm install")
        npmInstallSpinner.succeed()
        process.exit(0)
      } catch (e) {
        updateCheckSpinner.fail()
      }
    })
}

export default update
