import {
  ITemplateFile,
  ITemplate,
} from "../1_entities/Template/Template.interface";

export interface FilesystemAdapterInstance {
  createFiles: (files: ITemplateFile[]) => Promise<any>;
}

export interface TemplatesRepositoryInstance {
  getTemplateByName: (name: string) => ITemplate | null;
}
