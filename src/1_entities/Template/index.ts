import path from "path";
import buildTemplate from "./Template";
import { ITemplate } from "./Template.interface";

const Template = buildTemplate({
  joinPaths: path.join,
});

export default Object.freeze({
  make: (dto: ITemplate) => new Template(dto),
});
