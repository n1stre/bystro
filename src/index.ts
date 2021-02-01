#!/usr/bin/env node

import chalk from "chalk";
import buildTemplatesController from "./3_adapters/TemplatesController";
import FSDriver from "./4_infra/FSDriver";
import IODriver from "./4_infra/IODriver";

const fs = FSDriver.make();
const io = IODriver.make();
const TemplatesController = buildTemplatesController({ fs, io });

async function run() {
  const [name, path] = await io.getArgs(0, 1);
  await TemplatesController.scaffold(path, name);
  console.log(chalk.green(`Successfully cloned "${name}" into ${path}`));
}

run().catch((err) => {
  console.log(chalk.red(err.message));
  process.exit(err);
});
