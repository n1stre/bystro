import Template from "./index";

const basic = {
  config: {
    variablePrefix: "__",
    variableSuffix: "__",
    variables: [{ name: "NAME" }, { name: "NESTED" }],
  },
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
  it("should interpolate files paths and contents with variables", async () => {
    const v = { NAME: "MyEntity", NESTED: "MyNested" };
    const t = Template.make(basic);

    expect(t.interpolateFiles(v)).toEqual([
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
    ]);
  });
});
