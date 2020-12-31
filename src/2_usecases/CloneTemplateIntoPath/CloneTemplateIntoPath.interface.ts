import { FylesystemAdapterInstance } from "@adapters/FilesystemAdapter/FilesystemAdapter.interface";
import { TemplatesRepositoryInstance } from "@adapters/TemplatesRepository/TemplatesRepository.interface";

export interface CloneTemplateIntoPathDeps {
  filesystem: FylesystemAdapterInstance;
  templatesRepository: TemplatesRepositoryInstance;
}

export interface CloneTemplateIntoPathProps {
  path: string;
  name: string;
  variables: Record<string, string>;
}
