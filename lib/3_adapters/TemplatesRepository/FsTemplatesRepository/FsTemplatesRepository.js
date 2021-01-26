"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
class FsTemplatesRepository {
    constructor(repoTemplatesPath, projectTemplatesPath, templateConfigFiles) {
        this.repoTemplatesPath = repoTemplatesPath;
        this.projectTemplatesPath = projectTemplatesPath;
        this.templateConfigFiles = templateConfigFiles;
        this.getTemplateByName = (name) => {
            const templatePath = this.getTemplatePath(name);
            if (!templatePath)
                return null;
            return {
                config: this.getTemplateConfig(templatePath),
                files: this.getTemplateFiles(templatePath),
            };
        };
        this.getTemplatePath = (templateName) => {
            return [
                this.getProjectBasedTemplatePath(templateName),
                this.getRepoBasedTemplatePath(templateName),
            ].find(fs_1.default.existsSync);
        };
        this.getRepoBasedTemplatePath = (templateName) => {
            return path_1.default.join(this.repoTemplatesPath, templateName);
        };
        this.getProjectBasedTemplatePath = (templateName) => {
            return path_1.default.join(this.projectTemplatesPath, templateName);
        };
        this.getTemplateFiles = (templatePath) => {
            return glob_1.default.sync(`${templatePath}/**/*`, { nodir: true }).map((file) => {
                const contents = fs_1.default.readFileSync(file).toString();
                const filepath = path_1.default.relative(templatePath, file);
                return { path: filepath, contents };
            });
        };
        this.getTemplateConfig = (templatePath) => {
            const configFile = this.templateConfigFiles
                .map((file) => `${templatePath}/${file}`)
                .find(fs_1.default.existsSync);
            if (!configFile)
                throw new Error("Missing any of the supported config files: " +
                    JSON.stringify(this.templateConfigFiles));
            try {
                return JSON.parse(fs_1.default.readFileSync(configFile).toString());
            }
            catch (error) {
                throw new Error(`${configFile} has invalid format`);
            }
        };
    }
}
exports.default = FsTemplatesRepository;
