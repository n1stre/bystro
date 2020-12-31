export interface FylesystemAdapterInstance {
  joinPaths: (...paths: string[]) => string;
  folderExists: (path: string) => boolean;
  createFiles: (data: Record<string, string>) => void;
}
