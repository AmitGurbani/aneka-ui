import fs from "fs/promises";
import path from "path";

import { Command } from "commander";
import ora from "ora";

import type { Config } from "../types/config.js";
import type { RegistryItem } from "../types/registry.js";
import { fetchComponent, fetchComponents } from "../utils/fetch-registry.js";
import { handleFileConflict, writeFile } from "../utils/handle-conflicts.js";
import {
  filterMissingPackages,
  installDependencies,
} from "../utils/install-dependencies.js";
import { logger } from "../utils/logger.js";

/**
 * Reads the config file
 */
async function readConfig(cwd: string): Promise<Config> {
  const configPath = path.join(cwd, "aneka-ui.json");

  try {
    const content = await fs.readFile(configPath, "utf-8");
    return JSON.parse(content) as Config;
  } catch {
    logger.error("Could not find aneka-ui.json. Run 'aneka-ui init' first.");
    process.exit(1);
  }
}

/**
 * Transforms the component file path for the target project
 */
function transformFilePath(
  registryPath: string,
  config: Config,
  cwd: string
): string {
  const componentsDir = config.aliases.components.replace("@/", "src/");
  const fileName = path.basename(registryPath);
  return path.join(cwd, componentsDir, fileName);
}

/**
 * Installs a component
 */
async function installComponent(
  component: RegistryItem,
  config: Config,
  cwd: string,
  options: {
    overwrite?: boolean;
    skip?: boolean;
  }
): Promise<{ installed: boolean; dependencies: string[] }> {
  const installed: string[] = [];
  const dependencies: string[] = [];

  // Process each file
  for (const file of component.files) {
    const targetPath = transformFilePath(file.path, config, cwd);

    // Handle conflicts
    const strategy = await handleFileConflict(targetPath, file.content || "", {
      overwrite: options.overwrite,
      skip: options.skip,
    });

    if (strategy === "cancel") {
      logger.warn("Installation cancelled");
      return { installed: false, dependencies: [] };
    }

    if (strategy === "skip") {
      logger.info(`Skipped ${logger.highlight(path.basename(targetPath))}`);
      continue;
    }

    // Write file
    await writeFile(targetPath, file.content || "");
    installed.push(targetPath);
  }

  // Collect dependencies
  if (component.dependencies) {
    dependencies.push(...component.dependencies);
  }

  // Collect registry dependencies (other components)
  if (component.registryDependencies) {
    for (const depName of component.registryDependencies) {
      const dep = await fetchComponent(depName, config.framework, config.style);
      const depResult = await installComponent(dep, config, cwd, options);
      dependencies.push(...depResult.dependencies);
    }
  }

  return { installed: installed.length > 0, dependencies };
}

/**
 * Add command
 */
export const add = new Command()
  .name("add")
  .description("Add components to your project")
  .argument("[components...]", "Components to add")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("-s, --skip", "Skip existing files")
  .option("-a, --all", "Add all components")
  .action(
    async (
      components: string[],
      options: { overwrite?: boolean; skip?: boolean; all?: boolean }
    ) => {
      const cwd = process.cwd();

      // Read config
      const config = await readConfig(cwd);

      // Validate input
      if (!options.all && components.length === 0) {
        logger.error("Please specify components to add or use --all");
        process.exit(1);
      }

      logger.info(
        `Adding components for ${config.framework} (${config.style} style)...`
      );
      logger.break();

      // Fetch components
      const spinner = ora("Fetching components from registry...").start();

      let registryItems: RegistryItem[];

      try {
        if (options.all) {
          // Fetch all available components
          const allComponents = [
            "button",
            "card",
            "badge",
            "dialog",
            "tooltip",
          ];
          registryItems = await fetchComponents(
            allComponents,
            config.framework,
            config.style
          );
        } else {
          registryItems = await fetchComponents(
            components,
            config.framework,
            config.style
          );
        }

        spinner.succeed(`Fetched ${registryItems.length} component(s)`);
      } catch (error) {
        spinner.fail("Failed to fetch components");
        throw error;
      }

      logger.break();

      // Install components
      const allDependencies = new Set<string>();

      for (const item of registryItems) {
        const itemSpinner = ora(`Installing ${item.name}...`).start();

        try {
          const result = await installComponent(item, config, cwd, options);

          if (result.installed) {
            result.dependencies.forEach((dep) => allDependencies.add(dep));
            itemSpinner.succeed(`Installed ${logger.highlight(item.name)}`);
          } else {
            itemSpinner.info(`Skipped ${logger.highlight(item.name)}`);
          }
        } catch (error) {
          itemSpinner.fail(`Failed to install ${item.name}`);
          logger.error(
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      }

      // Install dependencies
      if (allDependencies.size > 0) {
        logger.break();
        const depsArray = Array.from(allDependencies);
        const missingDeps = await filterMissingPackages(depsArray, cwd);

        if (missingDeps.length > 0) {
          logger.info(`Installing ${missingDeps.length} dependencies...`);
          await installDependencies(missingDeps, cwd);
        } else {
          logger.info("All dependencies already installed");
        }
      }

      logger.break();
      logger.success("Components added successfully!");
    }
  );
