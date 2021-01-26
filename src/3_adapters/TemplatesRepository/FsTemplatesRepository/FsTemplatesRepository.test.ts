import path from "path";
import TemplatesRepository from "./FsTemplatesRepository";

const templateConfigFiles = [".templaterc"];
const repoTemplatesPath = "../../../../test/fixtures/templates";
const projTemplatesPath = "../../../../test/fixtures/project/.bystencil";

const templatesRepo = new TemplatesRepository(
  path.resolve(__dirname, repoTemplatesPath),
  path.resolve(__dirname, projTemplatesPath),
  templateConfigFiles,
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
});
