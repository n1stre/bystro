import path from "path";
import CloneTemplateToPath from "./index";

const templatesRepository = {
  templates: {
    rc: {
      "__NAME__/index.ts": "console.log('hello')",
      "__NAME__/__NAME__.ts":
        "export default function __NAME__() { console.log('Hello from __NAME__'); }",
      "__NAME__/data/some.txt": "some static data",
    },
  },
  getTemplateByName(name: string) {
    return this.templates[name];
  },
};

describe("CloneTemplateToPath usecase", () => {
  it("should create template files within the specified path", async () => {
    const filesystem = {
      joinPaths: path.join,
      createFiles: jest.fn((data: Record<string, string>) => undefined),
    };

    const dependencies = {
      templatesRepository,
      filesystem,
    };

    CloneTemplateToPath.build(dependencies).exec({
      name: "rc",
      path: "./some/fake/path",
      variables: { NAME: "MyComponent" },
    });

    expect(filesystem.createFiles).toBeCalledWith({
      "some/fake/path/MyComponent/index.ts": "console.log('hello')",
      "some/fake/path/MyComponent/MyComponent.ts":
        "export default function MyComponent() { console.log('Hello from MyComponent'); }",
      "some/fake/path/MyComponent/data/some.txt": "some static data",
    });
  });
});
