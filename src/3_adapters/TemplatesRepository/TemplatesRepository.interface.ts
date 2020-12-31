export interface TemplatesRepositoryInstance {
  getTemplateByName: (name: string) => Record<string, string>;
}
