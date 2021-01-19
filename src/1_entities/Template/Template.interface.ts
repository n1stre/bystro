export interface TemplateBuildParams {
  varPrefix: string;
  varSuffix: string;
}

export interface FileDTO {
  path: string;
  contents: string;
}

export interface TemplateDTO {
  path?: string;
  files: FileDTO[];
}

export interface TemplateInstance {
  getPath: () => string;
  getFiles: () => FileDTO[];
  setPath: (p: string) => TemplateInstance;
  setVariables: (v: Record<string, string>) => TemplateInstance;
  toDTO: () => TemplateDTO;
}
