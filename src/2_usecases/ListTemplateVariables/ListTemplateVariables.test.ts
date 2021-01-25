import ListTemplateVariables from "./index";
import TemplatesRepoMock from "../../../__tests__/mocks/TemplatesRepository";

const templatesRepository = new TemplatesRepoMock();
const usecase = ListTemplateVariables.build({ templatesRepository });

describe("ListTemplateVariables usecase", () => {
  it("should return template variables", async () => {
    const variables = await usecase.exec({ name: "rc" });
    expect(variables).toEqual([
      { name: "NAME", description: "Name of your React component" },
    ]);
  });
});
