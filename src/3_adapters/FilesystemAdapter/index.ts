import FSAdapter from "./FileSystemAdapter";

const FileSystemAdapter = Object.freeze({
  make: () => new FSAdapter(),
});

export default FileSystemAdapter;
