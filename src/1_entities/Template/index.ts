import path from "path";
import buildTemplate from "./Template";

const makeTemplate = buildTemplate({
  joinPaths: path.join,
});

const Template = Object.freeze({
  prebuild: buildTemplate,
  make: makeTemplate,
});

export default Template;
