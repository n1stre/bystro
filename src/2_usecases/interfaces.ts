import {
  ITemplateFile,
  ITemplate,
} from "../1_entities/Template/Template.interface";

export interface IFileSystemAdapter {
  writeFiles: (files: ITemplateFile[]) => Promise<any>;
}

export interface IInputOutputAdapter {
  promptInput: (
    data: { name: string; description?: string }[],
  ) => Promise<Record<string, string>>;
}

export interface ITemplatesRepository {
  getTemplateByName: (name: string) => ITemplate | null;
}
