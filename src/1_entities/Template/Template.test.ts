import Template from "./index";

const basic = {
  path: "../some/path",
  files: [
    {
      path: "__NAME__.ts",
      contents: 'const __NAME__ = "__NAME__"',
    },
    {
      path: "__NAME__.test.ts",
      contents: 'describe("__NAME__ entity", () => {})',
    },
    {
      path: "nested/__NESTED__.txt",
      contents: "some abstract __NESTED__ file",
    },
    {
      path: "nested/static.txt",
      contents: "some static file",
    },
  ],
};

describe("Template entity", () => {
  it("should set path", async () => {
    const t = Template.make(basic);
    expect(t.getPath()).toBe("../some/path");

    const newPath = "../somenew/path";
    t.setPath(newPath);

    expect(t.getPath()).toBe(newPath);
    expect(t.toDTO().path).toBe(newPath);
  });

  it("should be filled with variables", async () => {
    const v = { NAME: "MyEntity", NESTED: "MyNested" };
    const t = Template.make(basic).setVariables(v);

    expect(t.toDTO()).toEqual({
      path: "../some/path",
      files: [
        {
          path: `${v.NAME}.ts`,
          contents: `const ${v.NAME} = "${v.NAME}"`,
        },
        {
          path: `${v.NAME}.test.ts`,
          contents: `describe("${v.NAME} entity", () => {})`,
        },
        {
          path: `nested/${v.NESTED}.txt`,
          contents: `some abstract ${v.NESTED} file`,
        },
        {
          path: "nested/static.txt",
          contents: "some static file",
        },
      ],
    });
  });
});
