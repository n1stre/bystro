import FsTemplatesRepository from "./FsTemplatesRepository";

export default Object.freeze({
  make: (templatesPaths: string[], templateConfigFiles: string[]) => {
    return new FsTemplatesRepository(templatesPaths, templateConfigFiles);
  },
});
