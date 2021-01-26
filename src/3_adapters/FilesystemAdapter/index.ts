import FSAdapter from "./FilesystemAdapter";

const FilesystemAdapter = Object.freeze({
  make: () => new FSAdapter(),
});

export default FilesystemAdapter;
