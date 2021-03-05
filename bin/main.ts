#! /usr/bin/env node

import program from "commander"
import init from "./init"
import page from "./page"

init()
page()

program.parse(process.argv)
