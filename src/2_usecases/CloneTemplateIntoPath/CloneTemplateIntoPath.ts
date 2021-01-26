import Template from "../../1_entities/Template";
import {
  FilesystemAdapterInstance,
  TemplatesRepositoryInstance,
} from "../interfaces";

export default (deps: {
  templatesRepository: TemplatesRepositoryInstance;
  filesystem: FilesystemAdapterInstance;
}) => {
  return Object.freeze({
    exec: async (props: {
      path: string;
      name: string;
      variables: Record<string, string>;
    }) => {
      const dto = deps.templatesRepository.getTemplateByName(props.name);

      if (!dto) return;

      const template = Template.make(dto);
      const files = template
        .setPath(props.path)
        .getInterpolatedFiles(props.variables);

      return deps.filesystem.createFiles(files);
    },
  });
};
