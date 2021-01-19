import {
  FileDTO,
  TemplateDTO,
} from "../1_entities/Template/Template.interface";

export interface FilesystemAdapterInstance {
  createFiles: (path: string, files: FileDTO[]) => void;
}

export interface TemplatesRepositoryInstance {
  getTemplateByName: (name: string) => TemplateDTO | null;
}
