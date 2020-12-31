import Template from "@entities/Template";
import {
  CloneTemplateIntoPathDeps,
  CloneTemplateIntoPathProps,
} from "./CloneTemplateIntoPath.interface";

export default (deps: CloneTemplateIntoPathDeps) => {
  return Object.freeze({
    exec: (props: CloneTemplateIntoPathProps) => {
      const contents = deps.templatesRepository.getTemplateByName(props.name);
      const template = Template.make({ path: props.path, contents });
      const dto = template.setVariables(props.variables).toDTO();

      const files = Object.keys(dto.contents).reduce((acc, file) => {
        const content = dto.contents[file];
        const filename = deps.filesystem.joinPaths(dto.path, file);
        acc[filename] = content;
        return acc;
      }, {} as Record<string, string>);

      deps.filesystem.createFiles(files);
    },
  });
};
