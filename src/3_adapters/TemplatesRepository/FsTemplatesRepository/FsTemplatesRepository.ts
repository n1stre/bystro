import fs from "fs";
import path from "path";
import glob from "glob";
import { TemplatesRepositoryInstance } from "../../../2_usecases/interfaces";

class FsTemplatesRepository implements TemplatesRepositoryInstance {
  constructor(
    private repoTemplatesPath: string,
    private projectTemplatesPath: string,
    private templateConfigFiles: string[],
  ) {}

  public getTemplateByName = (name: string) => {
    const templatePath = this.getTemplatePath(name);
    if (!templatePath) return null;

    return {
      config: this.getTemplateConfig(templatePath),
      files: this.getTemplateFiles(templatePath),
    };
  };

  private getTemplatePath = (templateName: string) => {
    return [
      this.getProjectBasedTemplatePath(templateName),
      this.getRepoBasedTemplatePath(templateName),
    ].find(fs.existsSync);
  };

  private getRepoBasedTemplatePath = (templateName: string) => {
    return path.join(this.repoTemplatesPath, templateName);
  };

  private getProjectBasedTemplatePath = (templateName: string) => {
    return path.join(this.projectTemplatesPath, templateName);
  };

  private getTemplateFiles = (templatePath: string) => {
    return glob.sync(`${templatePath}/**/*`, { nodir: true }).map((file) => {
      const contents = fs.readFileSync(file).toString();
      const filepath = path.relative(templatePath, file);
      return { path: filepath, contents };
    });
  };

  private getTemplateConfig = (templatePath: string) => {
    const configFile = this.templateConfigFiles
      .map((file) => `${templatePath}/${file}`)
      .find(fs.existsSync);

    if (!configFile)
      throw new Error(
        "Missing any of the supported config files: " +
          JSON.stringify(this.templateConfigFiles),
      );

    try {
      return JSON.parse(fs.readFileSync(configFile).toString());
    } catch (error) {
      throw new Error(`${configFile} has invalid format`);
    }
  };
}

export default FsTemplatesRepository;
