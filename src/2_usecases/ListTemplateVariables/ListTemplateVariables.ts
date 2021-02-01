import Template from "../../1_entities/Template";
import { ITemplatesRepository } from "../interfaces";

export default (deps: { templatesRepository: ITemplatesRepository }) => {
  return Object.freeze({
    exec: async (props: { name: string }) => {
      if (!props.name) throw new Error("Template name is required");

      const dto = deps.templatesRepository.getTemplateByName(props.name);
      if (!dto) throw new Error(`Template "${props.name}" was not found`);

      const template = Template.make(dto);
      const variables = template.getRequiredVariables();

      return variables;
    },
  });
};
