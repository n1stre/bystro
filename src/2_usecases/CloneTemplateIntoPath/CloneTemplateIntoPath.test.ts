import CloneTemplateToPath from "./index";
import TemplatesRepoMock from "../../../__tests__/mocks/TemplatesRepository";

const repo = new TemplatesRepoMock();
const filesystem = {
  createFiles: jest.fn((p: string, f: []) => undefined),
};

describe("CloneTemplateToPath usecase", () => {
  it("should create template files within the specified path", async () => {
    const dependencies = {
      filesystem,
    };

    CloneTemplateToPath.build(dependencies).exec({
      template: repo.getTemplateByName("rc"),
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
