import {
  ITemplate,
  ITemplateFile,
  ITemplateInstance,
} from "./Template.interface";

export default (deps: { joinPaths: (p1: string, p2: string) => string }) => {
  return function makeTemplate(props: ITemplate): ITemplateInstance {
    const dto = { ...props };

    return Object.freeze({
      getPath: () => {
        return dto.path;
      },

      getRequiredVariables: () => {
        return dto.config.variables;
      },

      getFiles: () => {
        return dto.files;
      },

      getInterpolatedFiles(vars) {
        return dto.files.map((file) => {
          file = interpolateFile(file, vars);
          file.path = formatPath(file.path);
          return file;
        });
      },

      setPath(newPath: string) {
        dto.path = newPath;
        return this;
      },

      toDTO: () => dto,
    });

    function interpolateFile(f: ITemplateFile, v: Record<string, string>) {
      return Object.keys(v).reduce((file, variable) => {
        const path = interpolate(file.path, variable, v[variable]);
        const contents = interpolate(file.contents, variable, v[variable]);
        return { path, contents };
      }, f);
    }

    function interpolate(target: string, variable: string, value: string) {
      return target.replace(new RegExp(formatVariable(variable), "g"), value);
    }

    function formatPath(path: string) {
      return dto.path ? deps.joinPaths(dto.path, path) : path;
    }

    function formatVariable(variable: string) {
      return dto.config.variablePrefix + variable + dto.config.variableSuffix;
    }
  };
};
