#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const TemplatesController_1 = __importDefault(require("./3_adapters/TemplatesController"));
run().catch((err) => {
    console.log(chalk_1.default.red(err.message));
    process.exit(err);
});
async function run() {
    const args = minimist_1.default(process.argv.slice(2));
    const templateName = args._[0];
    const templatePath = args._[1];
    const vars = await TemplatesController_1.default.listVariables({ name: templateName });
    const answers = await inquirer_1.default.prompt(vars.map((v) => ({
        name: v.name,
        message: `Enter ${v.name} (${v.description}):`,
        type: "input",
    })));
    await TemplatesController_1.default.cloneIntoPath({
        path: templatePath,
        name: templateName,
        variables: answers,
    });
    console.log(chalk_1.default.green(`Successfully cloned "${templateName}" into ${templatePath}`));
}
