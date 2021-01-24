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
    exec: (props: { name: string }) => {
      const dto = deps.templatesRepository.getTemplateByName(props.name);

      if (!dto) return;

      const template = Template.make(dto);
      const variables = template.getRequiredVariables();

      return variables;
    },
  });
};
