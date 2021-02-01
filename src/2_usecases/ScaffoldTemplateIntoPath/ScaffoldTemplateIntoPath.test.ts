import ScaffoldTemplateIntoPath from "./index";
import TemplatesRepoMock from "../../../test/mocks/TemplatesRepository";

const fs = { writeFiles: jest.fn((f: any[]) => Promise.resolve(undefined)) };
const io = { promptInput: () => Promise.resolve({ NAME: "MyComponent" }) };

const usecase = ScaffoldTemplateIntoPath.build(new TemplatesRepoMock(), fs, io);

describe("ScaffoldTemplateIntoPath usecase", () => {
  it("should create template from the given name within the specified path", async () => {
    await usecase.exec("some/fake/path", "rc");

    expect(fs.writeFiles).toBeCalledWith([
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
