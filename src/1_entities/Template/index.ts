import buildTemplate from "./Template";

const makeTemplate = buildTemplate({
  varPrefix: "__",
  varPostfix: "__",
});

const Template = Object.freeze({
  prebuild: buildTemplate,
  make: makeTemplate,
});

export default Template;
