export interface IFileSystemDriver {
  writeFiles: (files: { path: string; contents: string }[]) => Promise<any>;
}

export interface IInputOutputDriver {
  promptInput: (
    data: { name: string; description?: string }[],
  ) => Promise<Record<string, string>>;
}
