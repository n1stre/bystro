import path from "path";
import ScaffoldTemplateIntoPath from "../../2_usecases/ScaffoldTemplateIntoPath";
import ListTemplateVariables from "../../2_usecases/ListTemplateVariables";
import TemplatesRepository from "../TemplatesRepository";
import { IFileSystemDriver, IInputOutputDriver } from "../interfaces";

const templatesRepository = TemplatesRepository.make(
  [
    path.resolve(process.cwd(), ".bystro"),
    path.resolve(__dirname, "../../../templates"),
  ],
  [".templaterc"],
);

export default (dependencies: {
  io: IInputOutputDriver;
  fs: IFileSystemDriver;
}) => {
  return Object.freeze({
    scaffold: ScaffoldTemplateIntoPath.build(
      templatesRepository,
      dependencies.fs,
      dependencies.io,
    ).exec,

    listVariables: ListTemplateVariables.build({
      templatesRepository,
    }).exec,
  });
};
