import ListTemplateVariables from "./index";
import TemplatesRepoMock from "../../../__tests__/mocks/TemplatesRepository";

const templatesRepository = new TemplatesRepoMock();

describe("ListTemplateVariables usecase", () => {
  it("should return template variables", async () => {
    const deps = { templatesRepository };
    const variables = ListTemplateVariables.build(deps).exec({ name: "rc" });
    expect(variables).toEqual([
      { name: "NAME", description: "Name of your React component" },
    ]);
  });
});
