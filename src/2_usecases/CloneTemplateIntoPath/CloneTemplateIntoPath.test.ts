import CloneTemplateToPath from "./index";
import TemplatesRepoMock from "../../../test/mocks/TemplatesRepository";

const templatesRepository = new TemplatesRepoMock();
const filesystem = {
  createFiles: jest.fn((f: any[]) => Promise.resolve(undefined)),
};

describe("CloneTemplateToPathByName usecase", () => {
  it("should create template from the given name within the specified path", async () => {
    const dependencies = {
      templatesRepository,
      filesystem,
    };

    CloneTemplateToPath.build(dependencies).exec({
      name: "rc",
      path: "some/fake/path",
      variables: { NAME: "MyComponent" },
    });

    expect(filesystem.createFiles).toBeCalledWith([
      {
        path: "some/fake/path/MyComponent/index.ts",
        contents: "console.log('hello')",
      },
      {
        path: "some/fake/path/MyComponent/MyComponent.ts",
        contents:
          "export default function MyComponent() { console.log('Hello from MyComponent'); }",
      },
      {
        path: "some/fake/path/MyComponent/data/some.txt",
        contents: "some static data",
      },
    ]);
  });
});
