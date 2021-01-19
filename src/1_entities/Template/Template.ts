import {
  TemplateBuildParams,
  TemplateDTO,
  TemplateInstance,
} from "./Template.interface";

export default (params: TemplateBuildParams) => {
  return function makeTemplate(props: TemplateDTO): TemplateInstance {
    const dto = { ...props };

    return Object.freeze({
      getPath: () => {
        return dto.path;
      },

      getFiles: () => {
        return dto.files
      },

      setPath(path) {
        dto.path = path;
        return this;
      },

      setVariables(vars) {
        dto.files = dto.files.map(({ path, contents }) => {
          Object.keys(vars).forEach((rawVariable) => {
            const variable = params.varPrefix + rawVariable + params.varSuffix;
            const value = vars[rawVariable];
            path = path.replace(new RegExp(variable, "g"), value);
            contents = contents.replace(new RegExp(variable, "g"), value);
          });

          return { path, contents };
        });

        return this;
      },

      toDTO: () => dto,
    });
  };
};
