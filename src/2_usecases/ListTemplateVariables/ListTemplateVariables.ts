import Template from "@entities/Template";
import { TemplateDTO } from "@entities/Template/Template.interface";
import {
  FilesystemAdapterInstance,
  TemplatesRepositoryInstance,
} from "../interfaces";

export default (deps: { filesystem: FilesystemAdapterInstance }) => {
  return Object.freeze({
    exec: (props: {
      path: string;
      template: TemplateDTO;
      variables: Record<string, string>;
    }) => {
      const template = Template.make(props.template)
        .setPath(props.path)
        .setVariables(props.variables);

      deps.filesystem.createFiles(template.getPath(), template.getFiles());
    },
  });
};
