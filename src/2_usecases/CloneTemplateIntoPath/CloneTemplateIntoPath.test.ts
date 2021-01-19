import CloneTemplateToPath from "./index";

const templatesRepository = {
  templates: {
    rc: {
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
  },
  getTemplateByName(name: string) {
    return this.templates[name];
  },
};

describe("CloneTemplateToPath usecase", () => {
  it("should create template files within the specified path", async () => {
    const filesystem = {
      createFiles: jest.fn((p: string, f: []) => undefined),
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

    expect(filesystem.createFiles).toBeCalledWith("./some/fake/path", [
      {
        path: "MyComponent/index.ts",
        contents: "console.log('hello')",
      },
      {
        path: "MyComponent/MyComponent.ts",
        contents:
          "export default function MyComponent() { console.log('Hello from MyComponent'); }",
      },
      {
        path: "MyComponent/data/some.txt",
        contents: "some static data",
      },
    ]);
  });
});
