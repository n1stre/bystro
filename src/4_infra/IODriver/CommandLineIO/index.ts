import parseArgs from "minimist";
import inquirer from "inquirer";
import { IInputOutputDriver } from "../../../3_adapters/interfaces";

export default class CommandLineIO implements IInputOutputDriver {
  private args: any;

  constructor() {
    this.args = parseArgs(process.argv.slice(2));
  }

  public async getArgs(...keys: (string | number)[]) {
    return keys.map((key) =>
      typeof key === "number" ? this.args._[key] : this.args[key],
    );
  }

  public async promptInput(data: { name: string; description?: string }[]) {
    return inquirer.prompt(
      data.map((v) => ({
        name: v.name,
        message: `Enter ${v.name} (${v.description}):`,
        type: "input",
      })),
    );
  }
}
