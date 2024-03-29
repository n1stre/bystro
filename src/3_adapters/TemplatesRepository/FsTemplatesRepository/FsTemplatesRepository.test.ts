import path from "path";
import TemplatesRepository from "./FsTemplatesRepository";

const repoTemplatesPath = path.resolve(__dirname, "../../../../test/fixtures/templates" ); // prettier-ignore
const projTemplatesPath = path.resolve(__dirname, "../../../../test/fixtures/project/.bystencil"); // prettier-ignore

const templatesRepo = new TemplatesRepository(
  [projTemplatesPath, repoTemplatesPath],
  [".templaterc"],
);

describe("FsTemplatesRepository", () => {
  it("should find project based template by name", () => {
    const template = templatesRepo.getTemplateByName("project_based");

    expect(template).toMatchObject({
      files: [
        {
          path: "__DisplayName__.tsx",
          contents: "// some project template file\n",
        },
      ],
    });
  });

  it("should find repo based template by name", () => {
    const template = templatesRepo.getTemplateByName("repo_based");

    expect(template).toMatchObject({
      files: [
        {
          path: "__DisplayName__.stories.mdx",
          contents:
            'import { Meta, Story, Preview, Props } from "@storybook/addon-docs/blocks";\nimport __DisplayName__ from "./__DisplayName__";\n',
        },
        {
          path: "__DisplayName__.tsx",
          contents:
            'import React from "react";\nimport styles from "./__DisplayName__.module.scss";\n',
        },
        {
          path: ".gitkeep",
          contents: "placeholder",
        },
        {
          path: "styles/__DisplayName__.module.scss",
          contents: ".__DisplayName__ {\n  display: none;\n}\n",
        },
      ],
    });
  });

  it("should find project based templates first", () => {
    const template = templatesRepo.getTemplateByName("conflicting");

    expect(template).toMatchObject({
      files: [
        {
          path: "__DisplayName__.tsx",
          contents: "// project based conflicting template file",
        },
      ],
    });
  });

  it("should include template config", () => {
    const template = templatesRepo.getTemplateByName("project_based");

    expect(template).toMatchObject({
      config: {
        variablePrefix: "__",
        variableSuffix: "__",
        variables: [
          { name: "DisplayName", description: "React component name" },
        ],
      },
    });
  });

  it("should include files starting with a dot(.)", () => {
    const template = templatesRepo.getTemplateByName("repo_based")!;

    const gitkeepFile = template.files.find((f) => f.path.includes(".gitkeep"));

    expect(gitkeepFile).toBeDefined();
  });
});
