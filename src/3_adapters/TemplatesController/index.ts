import path from "path";
import CloneTemplateIntoPath from "../../2_usecases/CloneTemplateIntoPath";
import ListTemplateVariables from "../../2_usecases/ListTemplateVariables";
import TemplatesRepository from "../TemplatesRepository";
import FileSystemAdapter from "../FileSystemAdapter";

const filesystem = FileSystemAdapter.make();
const templatesRepository = TemplatesRepository.make(
  path.resolve(__dirname, "../../../templates"),
  path.resolve(process.cwd(), ".bystro"),
  [".templaterc"],
);

const TemplatesController = Object.freeze({
  cloneIntoPath: CloneTemplateIntoPath.build({
    templatesRepository,
    filesystem,
  }).exec,

  listVariables: ListTemplateVariables.build({
    templatesRepository,
  }).exec,
});

export default TemplatesController;
