export interface FylesystemAdapterInstance {
  joinPaths: (...paths: string[]) => string;
  createFiles: (data: Record<string, string>) => void;
}
