"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class FileSystemAdapter {
    async createFiles(files) {
        const failedFiles = {};
        const promises = files.map((f) => {
            return this.writeFileRecursive(f.path, f.contents).catch((e) => (failedFiles[f.path] = e.message));
        });
        await Promise.all(promises);
        if (Object.keys(failedFiles).length) {
            throw new Error("An error occured when writing to files: \n" +
                JSON.stringify(failedFiles, null, 2));
        }
    }
    async writeFileRecursive(filename, content) {
        const filePathParts = filename.split(path_1.default.sep);
        const filePathPartsSize = filePathParts.length;
        if (filePathPartsSize > 1) {
            const folderPathParts = filePathParts.slice(0, filePathPartsSize - 1);
            const folderPath = folderPathParts.join(path_1.default.sep);
            const folderExists = await this.folderExists(folderPath);
            if (!folderExists) {
                await fs_1.promises.mkdir(folderPath, { recursive: true });
            }
        }
        return fs_1.promises.writeFile(filename, content);
    }
    async folderExists(path) {
        try {
            await fs_1.promises.stat(path);
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.default = FileSystemAdapter;
