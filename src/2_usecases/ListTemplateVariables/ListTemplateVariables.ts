import Template from "@entities/Template";
import { TemplatesRepositoryInstance } from "../interfaces";

export default (deps: { templatesRepository: TemplatesRepositoryInstance }) => {
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
