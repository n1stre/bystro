import fs from "fs";
import path from "path";
import glob from "glob";
import { TemplatesRepositoryInstance } from "../../../2_usecases/interfaces";

class TemplatesRepository implements TemplatesRepositoryInstance {
  constructor(private templatesPath: string = "../../../templates") {}

  public getTemplateByName = (name: string) => {
    const templatePath = path.join(__dirname, this.templatesPath, name);

    if (!fs.existsSync(templatePath)) return null;

    const files = glob
      .sync(`${templatePath}/**/*`, { nodir: true })
      .map((file) => {
        const contents = fs.readFileSync(file).toString();
        const filepath = path.relative(templatePath, file);
        return { path: filepath, contents };
      });

    return {
      path: undefined,
      files,
    };
  };
}

export default TemplatesRepository;
