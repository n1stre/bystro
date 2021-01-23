import path from "path";
import TemplatesRepository from "./FsTemplatesRepository";

describe.skip("FsTemplatesRepository", () => {
  let templatesRepo: TemplatesRepository;

  beforeAll(() => {
    const repoTemplatesPath = "../../../../__tests__/fixtures/templates";
    const projectTemplatesPath = "./.bystencil";
    const projectPath = path.resolve(
      __dirname,
      "../../../../__tests__/fixtures/project",
    );

    templatesRepo = new TemplatesRepository(
      repoTemplatesPath,
      projectPath,
      projectTemplatesPath,
    );
  });

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
});
