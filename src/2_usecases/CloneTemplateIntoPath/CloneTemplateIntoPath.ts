import Template from "@entities/Template";
import {
  FilesystemAdapterInstance,
  TemplatesRepositoryInstance,
} from "../interfaces";

export default (deps: {
  templatesRepository: TemplatesRepositoryInstance;
  filesystem: FilesystemAdapterInstance;
}) => {
  return Object.freeze({
    exec: (props: {
      path: string;
      name: string;
      variables: Record<string, string>;
    }) => {
      const dto = deps.templatesRepository.getTemplateByName(props.name);

      if (!dto) return;

      const template = Template.make(dto);
      const files = template.getInterpolatedFiles(props.variables);
      deps.filesystem.createFiles(props.path, files);
    },
  });
};
