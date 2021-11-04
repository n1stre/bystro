import fs from "fs";
import path from "path";
import glob from "glob";
import { ITemplatesRepository } from "../../../2_usecases/interfaces";

class FsTemplatesRepository implements ITemplatesRepository {
  constructor(
    private templatesPaths: string[],
    private templateConfigFiles: string[],
  ) {}

  public getTemplateByName = (name: string) => {
    const templatePath = this.templatesPaths
      .map((templatePath) => path.join(templatePath, name))
      .find(fs.existsSync);

    if (!templatePath) return null;

    return {
      config: this.getTemplateConfig(templatePath),
      files: this.getTemplateFiles(templatePath),
    };
  };

  private getTemplateFiles = (templatePath: string) => {
    return glob
      .sync(`${templatePath}/**/*`, { nodir: true, dot: true })
      .filter(this.ignoreConfigFile)
      .map((file) => {
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

  private ignoreConfigFile(file: string): boolean {
    return !file.includes(".templaterc");
  }
}

export default FsTemplatesRepository;
