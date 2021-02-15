#! /usr/bin/env node

import program from "commander"
import init from "./init"
// import start from "./start"

init()
// start()

program.parse(process.argv)
