import fs from "fs/promises";
import path from "path";

import chalk from "chalk";
import { Command } from "commander";

import type { Config } from "../types/config.js";
import { fetchRegistryIndex } from "../utils/fetch-registry.js";
import { fileExists } from "../utils/handle-conflicts.js";
import { logger } from "../utils/logger.js";

/**
 * Reads the config file if it exists
 */
async function readConfigIfExists(cwd: string): Promise<Config | null> {
  const configPath = path.join(cwd, "aneka-ui.json");

  try {
    const content = await fs.readFile(configPath, "utf-8");
    return JSON.parse(content) as Config;
  } catch {
    return null;
  }
}

/**
 * Checks if a component is installed
 */
async function isComponentInstalled(
  componentName: string,
  config: Config | null,
  cwd: string
): Promise<boolean> {
  if (!config) return false;

  const componentsDir = config.aliases.components.replace("@/", "src/");
  const extensions: Record<string, string> = {
    react: ".tsx",
    vue: ".vue",
    angular: ".component.ts",
  };

  const ext = extensions[config.framework] || ".tsx";
  const componentPath = path.join(cwd, componentsDir, `${componentName}${ext}`);

  return fileExists(componentPath);
}

/**
 * List command
 */
export const list = new Command()
  .name("list")
  .description("List available components")
  .option("-i, --installed", "Show only installed components")
  .option("-a, --available", "Show only available components")
  .action(async (options: { installed?: boolean; available?: boolean }) => {
    const cwd = process.cwd();
    const config = await readConfigIfExists(cwd);

    logger.info("Fetching component registry...");
    logger.break();

    try {
      const index = await fetchRegistryIndex();

      // Filter components based on config
      let components = index;

      if (config) {
        components = index.filter(
          (comp) =>
            comp.frameworks.includes(config.framework) &&
            comp.styles.includes(config.style)
        );
      }

      // Check installation status
      const componentStatus = await Promise.all(
        components.map(async (comp) => ({
          ...comp,
          installed: await isComponentInstalled(comp.name, config, cwd),
        }))
      );

      // Filter by installation status if requested
      let filteredComponents = componentStatus;
      if (options.installed) {
        filteredComponents = componentStatus.filter((c) => c.installed);
      } else if (options.available) {
        filteredComponents = componentStatus.filter((c) => !c.installed);
      }

      if (filteredComponents.length === 0) {
        logger.info("No components found");
        return;
      }

      // Display components
      logger.log(chalk.bold("Available Components:"));
      logger.break();

      const maxNameLength = Math.max(
        ...filteredComponents.map((c) => c.name.length)
      );

      filteredComponents.forEach((comp) => {
        const name = comp.name.padEnd(maxNameLength);
        const status = comp.installed
          ? chalk.green("✓ installed")
          : chalk.dim("  not installed");
        const description = chalk.dim(comp.description);

        logger.log(`  ${name}  ${status}  ${description}`);
      });

      logger.break();

      if (config) {
        logger.info(
          `Showing components for ${chalk.cyan(config.framework)} (${chalk.cyan(config.style)} style)`
        );
      } else {
        logger.info(
          "Run " +
            chalk.cyan("aneka-ui init") +
            " to filter by your framework and style"
        );
      }

      logger.break();
      logger.info(
        `Total: ${filteredComponents.length} component(s) (${componentStatus.filter((c) => c.installed).length} installed)`
      );
    } catch (error) {
      logger.error("Failed to fetch component registry");
      throw error;
    }
  });
