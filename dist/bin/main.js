#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_OF_REACT = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const commander_1 = __importDefault(require("commander"));
const package_json_1 = __importDefault(require("../package.json"));
const select_shell_1 = __importDefault(require("select-shell"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const welcome = `
███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░██████╗░███████╗░█████╗░░█████╗░████████╗░░░░░░░█████╗░██╗░░░░░██╗
██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██║░░░░░██║
█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██████╔╝█████╗░░███████║██║░░╚═╝░░░██║░░░█████╗██║░░╚═╝██║░░░░░██║
██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██╔══██╗██╔══╝░░██╔══██║██║░░██╗░░░██║░░░╚════╝██║░░██╗██║░░░░░██║
██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░██║░░██║███████╗██║░░██║╚█████╔╝░░░██║░░░░░░░░░╚█████╔╝███████╗██║
╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░░░░░░░░╚════╝░╚══════╝╚═╝
`;
var TYPE_OF_REACT;
(function (TYPE_OF_REACT) {
    TYPE_OF_REACT[TYPE_OF_REACT["FUNCTINAL"] = 1] = "FUNCTINAL";
    TYPE_OF_REACT[TYPE_OF_REACT["CLASS"] = 2] = "CLASS";
})(TYPE_OF_REACT = exports.TYPE_OF_REACT || (exports.TYPE_OF_REACT = {}));
const list = select_shell_1.default({
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
});
function isValidateComponentNaming(name) {
    if (!name) {
        shelljs_1.default.echo(chalk_1.default.redBright("please provide name of your component."));
        return false;
    }
    else if (!/^[a-z0-9]+$/i.test(name)) {
        shelljs_1.default.echo(chalk_1.default.redBright("component name should be alphaNumeric."));
        return false;
    }
    return true;
}
function nameTheComponent() {
    inquirer_1.default
        .prompt([
        {
            name: "value",
            message: "name of your component (alphaNumeric): "
        }
    ])
        .then((answer) => {
        const nameOfComponent = answer.value;
        if (!isValidateComponentNaming(nameOfComponent)) {
            nameTheComponent();
        }
        createComponent(nameOfComponent);
    });
}
function createComponent(nameOfComponent) {
}
function selectTheNameOfTheComponent() {
    list.on("select", (ontions) => {
        shelljs_1.default.echo(chalk_1.default.yellow("select the name of the component."));
        nameTheComponent();
    });
}
commander_1.default
    .version(package_json_1.default.version)
    .command("init")
    .description("Initialize Boilerplate for React.")
    .action(() => {
    shelljs_1.default.echo(chalk_1.default.cyanBright(welcome));
    shelljs_1.default.echo(chalk_1.default.yellow("Select which boilerplate you want to generate from flow-react-cli."));
    list
        .option(" Functinal Component (typescript) ", TYPE_OF_REACT.FUNCTINAL)
        .option(" Class Component (typescript) ", TYPE_OF_REACT.CLASS)
        .list();
    selectTheNameOfTheComponent();
    list.on("cancel", (options) => {
        shelljs_1.default.echo(`Operation has been canceled, ${options.length} option was selected.`);
        process.exit(0);
    });
});
commander_1.default.parse(process.argv);
