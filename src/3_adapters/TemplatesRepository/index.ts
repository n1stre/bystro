import FsTemplatesRepository from "./FsTemplatesRepository";

const TemplatesRepository = Object.freeze({
  make: (
    repoTemplatesPath: string,
    projectTemplatesPath: string,
    templateConfigFiles: string[],
  ) => {
    return new FsTemplatesRepository(
      repoTemplatesPath,
      projectTemplatesPath,
      templateConfigFiles,
    );
  },
});

export default TemplatesRepository;
