"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FsTemplatesRepository_1 = __importDefault(require("./FsTemplatesRepository"));
const TemplatesRepository = Object.freeze({
    make: (repoTemplatesPath, projectTemplatesPath, templateConfigFiles) => {
        return new FsTemplatesRepository_1.default(repoTemplatesPath, projectTemplatesPath, templateConfigFiles);
    },
});
exports.default = TemplatesRepository;
