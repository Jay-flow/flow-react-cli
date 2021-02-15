"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const shelljs_1 = __importDefault(require("shelljs"));
const package_json_1 = __importDefault(require("../package.json"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const select_shell_1 = __importDefault(require("select-shell"));
const ora_1 = __importDefault(require("ora"));
const functions_1 = require("../utils/functions");
const fs_1 = __importDefault(require("fs"));
var TYPE_OF_APP;
(function (TYPE_OF_APP) {
    TYPE_OF_APP[TYPE_OF_APP["REACT"] = 1] = "REACT";
    TYPE_OF_APP[TYPE_OF_APP["NEXT"] = 2] = "NEXT";
})(TYPE_OF_APP || (TYPE_OF_APP = {}));
const welcome = `
███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░██████╗░███████╗░█████╗░░█████╗░████████╗░░░░░░░█████╗░██╗░░░░░██╗
██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██║░░░░░██║
█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██████╔╝█████╗░░███████║██║░░╚═╝░░░██║░░░█████╗██║░░╚═╝██║░░░░░██║
██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██╔══██╗██╔══╝░░██╔══██║██║░░██╗░░░██║░░░╚════╝██║░░██╗██║░░░░░██║
██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░██║░░██║███████╗██║░░██║╚█████╔╝░░░██║░░░░░░░░░╚█████╔╝███████╗██║
╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░░░░╚═╝░░░░░░░░░░╚════╝░╚══════╝╚═╝
`;
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
        shelljs_1.default.echo(chalk_1.default.redBright("Please provide name of your app."));
        return false;
    }
    else if (!/^[a-z0-9]+$/i.test(name)) {
        shelljs_1.default.echo(chalk_1.default.redBright("App name should be alphaNumeric."));
        return false;
    }
    else if (fs_1.default.existsSync(`./${name}`)) {
        shelljs_1.default.echo(chalk_1.default.redBright("App name with the same name already exists."));
        return false;
    }
    return true;
}
function nameTheComponent() {
    return __awaiter(this, void 0, void 0, function* () {
        return inquirer_1.default.prompt([
            {
                name: "value",
                message: "Name of your app (alphaNumeric): "
            }
        ]);
    });
}
function createReactApp(nameOfApp, spinner, answer) {
    const gitURL = "-b main https://github.com/Jay-flow/flow-react-ts.git";
    shelljs_1.default.exec(`git clone ${gitURL} ${nameOfApp}`, (code, stdout, stderr) => flowUp(code, stdout, stderr, nameOfApp, spinner, answer));
}
function createNextApp(nameOfApp, spinner, answer) {
    const gitURL = "-b main https://github.com/Jay-flow/flow-next-ts.git";
    shelljs_1.default.exec(`git clone ${gitURL} ${nameOfApp}`, (code, stdout, stderr) => flowUp(code, stdout, stderr, nameOfApp, spinner, answer));
}
function flowUp(code, stdout, stderr, nameOfApp, spinner, answer) {
    if (code !== 0) {
        shelljs_1.default.echo(chalk_1.default.cyanBright(`code: ${code}`));
        shelljs_1.default.echo(chalk_1.default.cyanBright(`Program output: ${stdout}`));
        shelljs_1.default.echo(chalk_1.default.cyanBright(`Program stderr: ${stderr}`));
    }
    setTimeout(() => {
        shelljs_1.default.sed("-i", "flow-react-ts", functions_1.camelCaseToDash(`${nameOfApp}`), `./${nameOfApp}/package.json`);
        shelljs_1.default.rm("-rf", `${nameOfApp}/.git`);
        shelljs_1.default.echo(chalk_1.default.greenBright(answer.value + " created."));
        shelljs_1.default.echo(chalk_1.default.greenBright("cd " + answer.value + " and npm run start."));
        spinner.stop();
        process.exit(0);
    }, 2000);
}
function invalidProgramInput() {
    shelljs_1.default.echo(chalk_1.default.redBright("There is no template for current choice. Please try again."));
    process.exit(0);
}
function selectTheNameOfTheApp() {
    list.on("select", (options) => __awaiter(this, void 0, void 0, function* () {
        shelljs_1.default.echo(chalk_1.default.yellow("Select the name of the app."));
        const answer = yield nameTheComponent();
        const nameOfApp = answer.value;
        if (!isValidateComponentNaming(nameOfApp)) {
            return process.exit(0);
        }
        const spinner = ora_1.default("Creating app " + nameOfApp + "...\n");
        spinner.start();
        switch (options[0].value) {
            case TYPE_OF_APP.REACT:
                createReactApp(nameOfApp, spinner, answer);
                break;
            case TYPE_OF_APP.NEXT:
                createNextApp(nameOfApp, spinner, answer);
                break;
            default:
                invalidProgramInput();
        }
    }));
}
const init = () => {
    commander_1.default
        .version(package_json_1.default.version)
        .command("init")
        .description("Initialize Boilerplate for React.")
        .action(() => {
        shelljs_1.default.echo(chalk_1.default.cyanBright(welcome));
        shelljs_1.default.echo(chalk_1.default.yellow("Select which boilerplate you want to generate from flow-react-cli."));
        list
            .option(" React App (typescript) ", TYPE_OF_APP.REACT)
            .option(" Next App (typescript) ", TYPE_OF_APP.NEXT)
            .list();
        selectTheNameOfTheApp();
        list.on("cancel", (options) => {
            shelljs_1.default.echo(`Operation has been canceled, ${options.length} option was selected.`);
            process.exit(0);
        });
    });
};
exports.default = init;
