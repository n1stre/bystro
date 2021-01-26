"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Template_1 = __importDefault(require("../../1_entities/Template"));
exports.default = (deps) => {
    return Object.freeze({
        exec: async (props) => {
            if (!props.name)
                throw new Error("Template name is required");
            const dto = deps.templatesRepository.getTemplateByName(props.name);
            if (!dto)
                throw new Error(`Template "${props.name}" was not found`);
            const template = Template_1.default.make(dto);
            const variables = template.getRequiredVariables();
            return variables;
        },
    });
};
