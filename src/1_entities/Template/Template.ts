import { ITemplate, ITemplateInstance } from "./Template.interface";

export default () => {
  return function makeTemplate(props: ITemplate): ITemplateInstance {
    const dto = { ...props };

    return Object.freeze({
      getRequiredVariables: () => {
        return dto.config.variables;
      },

      getFiles: () => {
        return dto.files;
      },

      getInterpolatedFiles(vars) {
        return dto.files.map(({ path, contents }) => {
          Object.keys(vars).forEach((variable) => {
            path = interpolate(path, variable, vars[variable]);
            contents = interpolate(contents, variable, vars[variable]);
          });

          return { path, contents };
        });
      },

      toDTO: () => dto,
    });

    function interpolate(target: string, variable: string, value: string) {
      return target.replace(new RegExp(formatVariable(variable), "g"), value);
    }

    function formatVariable(variable: string) {
      return dto.config.variablePrefix + variable + dto.config.variableSuffix;
    }
  };
};
