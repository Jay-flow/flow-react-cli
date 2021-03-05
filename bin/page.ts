import shell from "shelljs"
import chalk from "chalk"
import program from "commander"
import ora from "ora"
import fs from "fs"

const page = () => {
  return program
    .command("page <fileName>")
    .description("Generate page(screen) component.")
    .action(async (fileName) => {
      console.log(fileName)
    })
}

export default page
