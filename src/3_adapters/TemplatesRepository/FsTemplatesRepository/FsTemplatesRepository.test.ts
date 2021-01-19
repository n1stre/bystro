import TemplatesRepository from "./FsTemplatesRepository";

describe.only("FsTemplatesRepository", () => {
  it("should find template by name", () => {
    const templatesPath = "../../../../__tests__/fixtures/templates";
    const repo = new TemplatesRepository(templatesPath);
    const template = repo.getTemplateByName("fake");

    expect(template).toEqual({
      path: undefined,
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
});
