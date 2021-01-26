"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Template_1 = __importDefault(require("./Template"));
const makeTemplate = Template_1.default({
    joinPaths: path_1.default.join,
});
const Template = Object.freeze({
    prebuild: Template_1.default,
    make: makeTemplate,
});
exports.default = Template;
