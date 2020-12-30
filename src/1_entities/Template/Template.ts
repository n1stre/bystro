import {
  TemplateBuildParams,
  TemplateDTO,
  TemplateInstance,
} from "./Template.interface";

export default (params: TemplateBuildParams) => {
  return function makeTemplate(props: TemplateDTO): TemplateInstance {
    const initialContents = props.contents;
    const dto = { ...props };

    return Object.freeze({
      getPath: () => dto.path,

      setPath(path) {
        dto.path = path;
        return this;
      },

      setVariables(vars) {
        dto.contents = Object.entries(dto.contents).reduce((acc, entry) => {
          let file = entry[0];
          let contents = entry[1];

          Object.keys(vars).forEach((rawVariable) => {
            const variable = params.varPrefix + rawVariable + params.varPostfix;
            const value = vars[rawVariable];
            file = file.replace(new RegExp(variable, "g"), value);
            contents = contents.replace(new RegExp(variable, "g"), value);
          });

          acc[file] = contents;

          return acc;
        }, {} as Record<string, string>);

        return this;
      },

      toDTO: () => dto,
    });
  };
};
