export interface ITemplateFile {
  path: string;
  contents: string;
}

export interface ITemplateVariable {
  name: string;
  description?: string;
}

export interface ITemplateConfig {
  variablePrefix: string;
  variableSuffix: string;
  variables: ITemplateVariable[];
}

export interface ITemplate {
  path?: string;
  files: ITemplateFile[];
  config: ITemplateConfig;
}

export interface ITemplateInstance {
  getPath: () => string | undefined;
  getRequiredVariables: () => ITemplateVariable[];
  getFiles: () => ITemplateFile[];
  getInterpolatedFiles: (v: Record<string, string>) => ITemplateFile[];
  setPath: (p: string) => ITemplateInstance;
  toDTO: () => ITemplate;
}
