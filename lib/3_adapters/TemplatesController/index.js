"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const CloneTemplateIntoPath_1 = __importDefault(require("../../2_usecases/CloneTemplateIntoPath"));
const ListTemplateVariables_1 = __importDefault(require("../../2_usecases/ListTemplateVariables"));
const TemplatesRepository_1 = __importDefault(require("../TemplatesRepository"));
const FileSystemAdapter_1 = __importDefault(require("../FileSystemAdapter"));
const filesystem = FileSystemAdapter_1.default.make();
const templatesRepository = TemplatesRepository_1.default.make(path_1.default.resolve(__dirname, "../../../templates"), path_1.default.resolve(process.cwd(), ".bystro"), [".templaterc"]);
const TemplatesController = Object.freeze({
    cloneIntoPath: CloneTemplateIntoPath_1.default.build({
        templatesRepository,
        filesystem,
    }).exec,
    listVariables: ListTemplateVariables_1.default.build({
        templatesRepository,
    }).exec,
});
exports.default = TemplatesController;
