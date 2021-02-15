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
const shelljs_1 = __importDefault(require("shelljs"));
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = __importDefault(require("commander"));
const ora_1 = __importDefault(require("ora"));
const fs_1 = __importDefault(require("fs"));
const start = () => {
    return commander_1.default
        .command("start")
        .description("start the project.")
        .action(() => __awaiter(void 0, void 0, void 0, function* () {
        const spinner = ora_1.default("configuring project...\n");
        spinner.start();
        try {
            let exists = fs_1.default.existsSync(".flow");
            if (!exists) {
                shelljs_1.default.echo(chalk_1.default.redBright("\nproject is not in flow repository. Are you sure you are in correct dir?"));
                spinner.stop();
                process.exit(0);
            }
            exists = fs_1.default.existsSync("node_modules");
            if (!exists) {
                shelljs_1.default.echo(chalk_1.default.cyanBright("installing dependencies..."));
                // childProcess.execSync(`yarn`, {stdio: 'inherit'})
                shelljs_1.default.exec("yarn", (code) => {
                    if (code === 0) {
                        shelljs_1.default.echo(chalk_1.default.cyanBright("running project...\n"));
                        shelljs_1.default.exec("yarn run dev");
                        // childProcess.execSync(`yarn run dev`, {stdio: 'inherit'});
                        return;
                    }
                    shelljs_1.default.echo(chalk_1.default.redBright("Failed installing dependencies. Please try again with yarn."));
                });
                return;
            }
            shelljs_1.default.echo(chalk_1.default.cyanBright("running project..."));
            // shell.exec(`yarn start`);
            shelljs_1.default.exec("yarn run dev");
            // childProcess.execFileSync('yarn', ['start'], {stdio: 'inherit'});
        }
        catch (err) {
            shelljs_1.default.echo(chalk_1.default.red(err));
            shelljs_1.default.echo(chalk_1.default.redBright("failed installing dependencies. Please try again with yarn."));
        }
        finally {
            spinner.stop();
            process.exit(0);
        }
    }));
};
exports.default = start;
