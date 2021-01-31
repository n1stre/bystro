import {
  ITemplate,
  ITemplateFile,
  ITemplateInstance,
} from "./Template.interface";

export default (deps: { joinPaths: (p1: string, p2: string) => string }) => {
  return class Template implements ITemplateInstance {
    constructor(private dto: ITemplate) {
      this.dto = { ...dto };
    }

    public getPath = () => {
      return this.dto.path;
    };

    public getRequiredVariables = () => {
      return this.dto.config.variables;
    };

    public getFiles = () => {
      return this.dto.files;
    };

    public interpolateFiles = (variables: Record<string, string>) => {
      return this.dto.files.map((file) => {
        file = this.interpolateFile(file, variables);
        file.path = this.toFullPath(file.path);
        return file;
      });
    };

    public setPath = (newPath: string) => {
      this.dto.path = newPath;
      return this;
    };

    public toDTO = () => {
      return this.dto;
    };

    private interpolateFile(f: ITemplateFile, v: Record<string, string>) {
      return Object.keys(v).reduce((file, variable) => {
        const path = this.interpolate(file.path, variable, v[variable]);
        const contents = this.interpolate(file.contents, variable, v[variable]);
        return { path, contents };
      }, f);
    }

    private interpolate(target: string, variable: string, value: string) {
      const variableString = new RegExp(this.formatVariable(variable), "g");
      return target.replace(variableString, value);
    }

    private toFullPath(path: string) {
      const base = this.getPath();
      return base ? deps.joinPaths(base, path) : path;
    }

    private formatVariable(variable: string) {
      const { variablePrefix, variableSuffix } = this.dto.config;
      return variablePrefix + variable + variableSuffix;
    }
  };
};
