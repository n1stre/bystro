export interface TemplateBuildParams {
  varPrefix: string;
  varPostfix: string;
}

export interface TemplateDTO {
  path: string;
  contents: Record<string, string>;
}

export interface TemplateInstance {
  getPath: () => string;
  setPath: (p: string) => TemplateInstance;
  setVariables: (v: Record<string, string>) => TemplateInstance;
  toDTO: () => TemplateDTO;
}
