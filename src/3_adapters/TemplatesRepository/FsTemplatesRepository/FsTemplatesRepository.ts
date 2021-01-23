import fs from "fs";
import path from "path";
import glob from "glob";
import { TemplatesRepositoryInstance } from "../../../2_usecases/interfaces";

class TemplatesRepository implements TemplatesRepositoryInstance {
  constructor(
    private repoTemplatesPath: string,
    private projectPath: string,
    private projectTemplatesPath: string,
  ) {}

  public getTemplateByName = (name: string) => {
    const templatePath = [
      this.getProjectBasedTemplatePath(name),
      this.getRepoBasedTemplatePath(name),
    ].find(fs.existsSync);

    if (!templatePath) return null;

    return {
      files: this.getTemplateFiles(templatePath),
    };
  };

  private getRepoBasedTemplatePath = (templateName: string) => {
    return path.join(__dirname, this.repoTemplatesPath, templateName);
  };

  private getProjectBasedTemplatePath = (templateName: string) => {
    return path.join(this.projectPath, this.projectTemplatesPath, templateName);
  };

  private getTemplateFiles = (templatePath: string) => {
    return glob.sync(`${templatePath}/**/*`, { nodir: true }).map((file) => {
      const contents = fs.readFileSync(file).toString();
      const filepath = path.relative(templatePath, file);
      return { path: filepath, contents };
    });
  };
}

export default TemplatesRepository;
