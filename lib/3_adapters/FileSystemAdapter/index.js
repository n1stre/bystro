"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileSystemAdapter_1 = __importDefault(require("./FileSystemAdapter"));
const FileSystemAdapter = Object.freeze({
    make: () => new FileSystemAdapter_1.default(),
});
exports.default = FileSystemAdapter;
