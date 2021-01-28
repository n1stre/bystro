import parseArgs from "minimist";
import inquirer from "inquirer";
import chalk from "chalk";
import TemplatesController from "./3_adapters/TemplatesController";

run().catch((err) => {
  console.log(chalk.red(err.message));
  process.exit(err);
});

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const templateName = args._[0];
  const templatePath = args._[1];

  const vars = await TemplatesController.listVariables({ name: templateName });

  const answers = await inquirer.prompt(
    vars.map((v) => ({
      name: v.name,
      message: `Enter ${v.name} (${v.description}):`,
      type: "input",
    })),
  );

  await TemplatesController.cloneIntoPath({
    path: templatePath,
    name: templateName,
    variables: answers,
  });

  console.log(
    chalk.green(`Successfully cloned "${templateName}" into ${templatePath}`),
  );
}
