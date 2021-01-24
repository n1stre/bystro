import { ITemplate } from "../../../src/1_entities/Template/Template.interface";

const templates: Record<string, ITemplate> = {
  rc: {
    config: {
      variablePrefix: "__",
      variableSuffix: "__",
      variables: [{ name: "__NAME__" }],
    },
    files: [
      {
        path: "__NAME__/index.ts",
        contents: "console.log('hello')",
      },
      {
        path: "__NAME__/__NAME__.ts",
        contents:
          "export default function __NAME__() { console.log('Hello from __NAME__'); }",
      },
      {
        path: "__NAME__/data/some.txt",
        contents: "some static data",
      },
    ],
  },
};

class TemplatesRepository {
  public getTemplateByName = (name: string) => {
    return templates[name];
  };
}

export default TemplatesRepository;
