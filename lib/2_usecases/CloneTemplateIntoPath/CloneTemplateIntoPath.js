"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Template_1 = __importDefault(require("../../1_entities/Template"));
exports.default = (deps) => {
    return Object.freeze({
        exec: async (props) => {
            const dto = deps.templatesRepository.getTemplateByName(props.name);
            if (!dto)
                return;
            const template = Template_1.default.make(dto);
            const files = template
                .setPath(props.path)
                .getInterpolatedFiles(props.variables);
            return deps.filesystem.createFiles(files);
        },
    });
};
