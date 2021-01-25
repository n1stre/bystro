import buildTemplate from "./Template";

const makeTemplate = buildTemplate();

const Template = Object.freeze({
  prebuild: buildTemplate,
  make: makeTemplate,
});

export default Template;
