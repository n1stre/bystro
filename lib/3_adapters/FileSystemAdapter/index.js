"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FilesystemAdapter_1 = __importDefault(require("./FilesystemAdapter"));
const FilesystemAdapter = Object.freeze({
    make: () => new FilesystemAdapter_1.default(),
});
exports.default = FilesystemAdapter;
