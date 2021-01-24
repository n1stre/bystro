import {
  ITemplateFile,
  ITemplate,
} from "../1_entities/Template/Template.interface";

export interface FilesystemAdapterInstance {
  createFiles: (path: string, files: ITemplateFile[]) => void;
}

export interface TemplatesRepositoryInstance {
  getTemplateByName: (name: string) => ITemplate | null;
}
