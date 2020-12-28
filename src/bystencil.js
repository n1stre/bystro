const program = require("commander");
const createComponent = require("./lib/commands/create-component");

let path = undefined;
const setPath = value => {
  path = value;
};

program
  .command("component:create <name>")
  .option("-p, --path <path>", "path to put created component in", setPath)
  .action(name => createComponent(name, path));

program.parse(process.argv);

// ===============


const fs = require("fs");
const path = require("path");
const glob = require("glob");
const config = require("../config");
const { Logger, isDirectorySync } = require("../utils");

const logger = new Logger();
const log = logger.log;

const DEFAULT_PATHS = config.paths.components;
const KEYWORD = config.templateVariables.componentName;

function createComponent(componentName, customPath) {
  const paths = customPath ? [customPath] : DEFAULT_PATHS;
  const validPath = paths.find(isDirectorySync);

  log("START");
  log(`creating component "${componentName}"`);

  if (validPath) {
    log(`cloning into "${validPath}"`);
    cloneFromTemplate(componentName, validPath);
  } else if (customPath) {
    log(`Error: "${customPath}" is not a directory`, "error");
  } else {
    log(`Error: cannot detect components directory`, "error");
  }
}

function cloneFromTemplate(componentName, pathToCloneInto) {
  const renameTemplateFile = file => file.replace(KEYWORD, componentName);
  const templatePath = path.resolve(__dirname, "../../template");
  const templateFiles = glob.sync(`${templatePath}/**/*`);
  const targetFolder = path.resolve(pathToCloneInto, componentName);

  ensureDirSync(targetFolder, err => {
    if (err) {
      log("FAILED", "error");
    } else {
      templateFiles.forEach(file => {
        const renamed = renameTemplateFile(path.basename(file));
        const clonedFile = path.resolve(targetFolder, renamed);
        const contents = fs
          .readFileSync(file, "utf-8")
          .replace(new RegExp(KEYWORD, "g"), componentName);

        fs.writeFileSync(clonedFile, contents);
        log(`Successfully created ${renamed}`);
      });
    }
  });
}

function ensureDirSync(dirpath, callback) {
  if (isDirectorySync(dirpath)) {
    const err = new Error(`folter ${dirpath} is already exists`);
    log(err, "error");
    return callback(err);
  }

  try {
    fs.mkdirSync(dirpath, { recursive: true });
    callback();
  } catch (err) {
    callback(err);
  }
}

module.exports = createComponent;
