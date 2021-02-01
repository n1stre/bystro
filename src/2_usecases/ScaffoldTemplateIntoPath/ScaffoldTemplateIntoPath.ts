import Template from "../../1_entities/Template";
import {
  IFileSystemAdapter,
  IInputOutputAdapter,
  ITemplatesRepository,
} from "../interfaces";

export default class ScaffoldTemplateIntoPath {
  constructor(
    private templatesRepository: ITemplatesRepository,
    private fs: IFileSystemAdapter,
    private io: IInputOutputAdapter,
  ) {}

  public exec = async (path: string, name: string) => {
    if (!name) throw new Error("Template name is required");

    // 2. Get template data by <template_name>
    const dto = this.templatesRepository.getTemplateByName(name);
    if (!dto) throw new Error(`Template "${name}" was not found`);

    // 3. If template was found prompt user to fill the variable
    const template = Template.make(dto).setPath(path);
    const variables = template.getRequiredVariables();
    const values = await this.io.promptInput(variables);

    // 4. Modify template filenames and contents
    const files = template.interpolateFiles(values);

    // 5. Write modified files
    return this.fs.writeFiles(files);
  };
}
