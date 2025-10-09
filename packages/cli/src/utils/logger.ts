import chalk from "chalk";

/**
 * Logger utility for CLI output
 */
export const logger = {
  info: (message: string) => {
    console.log(chalk.blue("ℹ"), message);
  },

  success: (message: string) => {
    console.log(chalk.green("✓"), message);
  },

  warn: (message: string) => {
    console.log(chalk.yellow("⚠"), message);
  },

  error: (message: string) => {
    console.log(chalk.red("✖"), message);
  },

  break: () => {
    console.log();
  },

  log: (message: string) => {
    console.log(message);
  },

  highlight: (text: string) => chalk.cyan(text),

  dim: (text: string) => chalk.dim(text),

  bold: (text: string) => chalk.bold(text),
};
