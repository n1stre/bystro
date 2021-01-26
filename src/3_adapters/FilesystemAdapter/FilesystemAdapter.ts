import { promises as fs } from "fs";
import path from "path";
import { FilesystemAdapterInstance } from "../../2_usecases/interfaces";

type File = { path: string; contents: string };

class FileSystemAdapter implements FilesystemAdapterInstance {
  public async createFiles(files: File[]) {
    const failedFiles: Record<string, string> = {};
    const promises = files.map((f) => {
      return this.writeFileRecursive(f.path, f.contents).catch(
        (e) => (failedFiles[f.path] = e.message),
      );
    });

    await Promise.all(promises);

    if (Object.keys(failedFiles).length) {
      throw new Error(
        "An error occured when writing to files: \n" +
          JSON.stringify(failedFiles, null, 2),
      );
    }
  }

  private async writeFileRecursive(filename: string, content: string) {
    const filePathParts = filename.split(path.sep);
    const filePathPartsSize = filePathParts.length;

    if (filePathPartsSize > 1) {
      const folderPathParts = filePathParts.slice(0, filePathPartsSize - 1);
      const folderPath = folderPathParts.join(path.sep);
      const folderExists = await this.folderExists(folderPath);

      if (!folderExists) {
        await fs.mkdir(folderPath, { recursive: true });
      }
    }

    return fs.writeFile(filename, content);
  }

  private async folderExists(path: string) {
    try {
      await fs.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}

export default FileSystemAdapter;
