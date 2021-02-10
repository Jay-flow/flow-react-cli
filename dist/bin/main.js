"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const commander_1 = __importDefault(require("commander"));
const package_json_1 = __importDefault(require("../package.json"));
const select_shell_1 = __importDefault(require("select-shell"));
const chalk_1 = __importDefault(require("chalk"));
const welcome = `
░░░░░██╗░█████╗░██╗░░░██╗░░░░░░███████╗██╗░░░░░░█████╗░░██╗░░░░░░░██╗░░░░░░░█████╗░██╗░░░░░██╗
░░░░░██║██╔══██╗╚██╗░██╔╝░░░░░░██╔════╝██║░░░░░██╔══██╗░██║░░██╗░░██║░░░░░░██╔══██╗██║░░░░░██║
░░░░░██║███████║░╚████╔╝░█████╗█████╗░░██║░░░░░██║░░██║░╚██╗████╗██╔╝█████╗██║░░╚═╝██║░░░░░██║
██╗░░██║██╔══██║░░╚██╔╝░░╚════╝██╔══╝░░██║░░░░░██║░░██║░░████╔═████║░╚════╝██║░░██╗██║░░░░░██║
╚█████╔╝██║░░██║░░░██║░░░░░░░░░██║░░░░░███████╗╚█████╔╝░░╚██╔╝░╚██╔╝░░░░░░░╚█████╔╝███████╗██║
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░░░░░░░╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░░░░░░░░╚════╝░╚══════╝╚═╝
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
commander_1.default
    .version(package_json_1.default.version)
    .command("init")
    .description("Initialize Boilerplate for React.")
    .action(() => {
    shelljs_1.default.echo(chalk_1.default.cyanBright(welcome));
});
commander_1.default.parse(process.argv);
