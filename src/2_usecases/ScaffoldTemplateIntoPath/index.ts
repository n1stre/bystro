import ScaffoldTemplateIntoPath from "./ScaffoldTemplateIntoPath";

export default Object.freeze({
  build: (...args: ConstructorParameters<typeof ScaffoldTemplateIntoPath>) => {
    return new ScaffoldTemplateIntoPath(...args);
  },
});
