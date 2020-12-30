import Template from "./index";

const basic = {
  path: "../some/path",
  contents: {
    "__NAME__.ts": 'const __NAME__ = "__NAME__"',
    "__NAME__.test.ts": 'describe("__NAME__ entity", () => {})',
    "nested/__NESTED__.txt": "some abstract __NESTED__ file",
    "nested/static.txt": "some static file",
  },
};

describe("Template entiry", () => {
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
      contents: {
        [`${v.NAME}.ts`]: `const ${v.NAME} = "${v.NAME}"`,
        [`${v.NAME}.test.ts`]: `describe("${v.NAME} entity", () => {})`,
        [`nested/${v.NESTED}.txt`]: `some abstract ${v.NESTED} file`,
        "nested/static.txt": "some static file",
      },
    });
  });
});
