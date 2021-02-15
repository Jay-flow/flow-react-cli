'use strict';
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
exports.exec = exports.upperCamelize = exports.camelize = exports.camelCaseToDash = exports.isCamelCase = exports.toCamelCase = exports.exitIfNotV5 = exports.exitIfNotDoobooRepo = exports.resolveComponent = exports.resolveTemplate = void 0;
const chalk_1 = __importDefault(require("chalk"));
const shelljs = require("shelljs");
const fs = require("fs");
const path = require("path");
const resolveTemplate = (projectType, componentType, componentName, fileExt = 'tsx') => {
    const template = path.resolve(__dirname, '..', `templates/${projectType}/${componentType}s/${componentName}.${fileExt}`);
    const testTemplate = path.resolve(__dirname, '..', `templates/${projectType}/${componentType}s/${componentName}.test.${fileExt}`);
    return {
        file: template,
        testFile: testTemplate,
    };
};
exports.resolveTemplate = resolveTemplate;
const resolveComponent = (componentType, name, fileExt = 'tsx') => {
    const component = `./src/components/${componentType}s/${name}.${fileExt}`;
    const testComponent = `./src/components/${componentType}s/__tests__/${name}.test.${fileExt}`;
    return {
        file: component,
        testFile: testComponent,
    };
};
exports.resolveComponent = resolveComponent;
const exitIfNotDoobooRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    const exists = fs.existsSync('.dooboo');
    if (!exists) {
        shelljs.echo(chalk_1.default.redBright('\nproject is not compatible with dooboo-cli v5. Are you sure you are in correct dir?'));
        process.exit(0);
    }
});
exports.exitIfNotDoobooRepo = exitIfNotDoobooRepo;
const exitIfNotV5 = () => __awaiter(void 0, void 0, void 0, function* () {
    const exists = fs.existsSync('.dooboo/v5');
    if (!exists) {
        shelljs.echo(chalk_1.default.redBright(`\nproject is not compatible with dooboo-cli v5.
        Maybe you are using older projects.
        Then please install version lower than dooboo-cli@5`));
        process.exit(0);
    }
});
exports.exitIfNotV5 = exitIfNotV5;
const toCamelCase = (str, cap1st) => {
    return ((cap1st ? '-' : '') + str).replace(/-+([^-])/g, (a, b) => {
        return b.toUpperCase();
    });
};
exports.toCamelCase = toCamelCase;
const isCamelCase = (str) => {
    if (exports.toCamelCase(str, true) === str)
        return true;
    else
        return false;
};
exports.isCamelCase = isCamelCase;
const camelCaseToDash = (str) => {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
};
exports.camelCaseToDash = camelCaseToDash;
const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};
exports.camelize = camelize;
const upperCamelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
        if (+match === 0)
            return '';
        // or if (/\s+/.test(match)) for white spaces
        return match.toUpperCase();
    });
};
exports.upperCamelize = upperCamelize;
const exec = (command) => {
    return new Promise((resolve, reject) => shelljs.exec(command, {}, (code, value, error) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(value);
    }));
};
exports.exec = exec;
