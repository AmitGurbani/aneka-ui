import fs from "fs/promises";
import path from "path";

import { Command } from "commander";
import ora from "ora";

import type { Config } from "../types/config.js";
import { fetchComponent, fetchComponents } from "../utils/fetch-registry.js";
import { readFile, showDiff, writeFile } from "../utils/handle-conflicts.js";
import {
  filterMissingPackages,
  installDependencies,
} from "../utils/install-dependencies.js";
import { logger } from "../utils/logger.js";
import { confirm } from "../utils/prompts.js";

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
 * Gets the component file path
 */
function getComponentPath(
  componentName: string,
  config: Config,
  cwd: string
): string {
  const componentsDir = config.aliases.components.replace("@/", "src/");
  const extensions: Record<string, string> = {
    react: ".tsx",
    vue: ".vue",
    angular: ".component.ts",
  };

  const ext = extensions[config.framework] || ".tsx";
  return path.join(cwd, componentsDir, `${componentName}${ext}`);
}

/**
 * Lists all installed components
 */
async function getInstalledComponents(
  config: Config,
  cwd: string
): Promise<string[]> {
  const componentsDir = path.join(
    cwd,
    config.aliases.components.replace("@/", "src/")
  );

  try {
    const files = await fs.readdir(componentsDir);
    const extensions: Record<string, string> = {
      react: ".tsx",
      vue: ".vue",
      angular: ".component.ts",
    };

    const ext = extensions[config.framework] || ".tsx";

    return files
      .filter((file) => file.endsWith(ext))
      .map((file) => file.replace(ext, "").replace(/\.component$/, ""));
  } catch {
    return [];
  }
}

/**
 * Update command
 */
export const update = new Command()
  .name("update")
  .description("Update components to latest versions")
  .argument("[components...]", "Components to update")
  .option("-a, --all", "Update all components")
  .option("-f, --force", "Skip confirmation prompts")
  .action(
    async (
      components: string[],
      options: { all?: boolean; force?: boolean }
    ) => {
      const cwd = process.cwd();
      const config = await readConfig(cwd);

      // Determine which components to update
      let componentsToUpdate: string[];

      if (options.all) {
        componentsToUpdate = await getInstalledComponents(config, cwd);
      } else if (components.length > 0) {
        componentsToUpdate = components;
      } else {
        logger.error("Please specify components to update or use --all flag");
        process.exit(1);
      }

      if (componentsToUpdate.length === 0) {
        logger.info("No components to update");
        return;
      }

      logger.info(
        `Checking for updates for ${componentsToUpdate.length} component(s)...`
      );
      logger.break();

      // Fetch registry versions
      const spinner = ora("Fetching latest versions...").start();
      let registryComponents;

      try {
        registryComponents = await fetchComponents(
          componentsToUpdate,
          config.framework,
          config.style
        );
        spinner.succeed("Fetched latest versions");
      } catch (error) {
        spinner.fail("Failed to fetch latest versions");
        throw error;
      }

      // Compare versions
      const updates: Array<{
        name: string;
        localContent: string;
        registryContent: string;
        path: string;
      }> = [];

      for (const registryComponent of registryComponents) {
        const localPath = getComponentPath(registryComponent.name, config, cwd);
        const localContent = await readFile(localPath);

        if (!localContent) {
          logger.warn(`${registryComponent.name} is not installed locally`);
          continue;
        }

        const registryContent = registryComponent.files[0]?.content || "";

        if (localContent !== registryContent) {
          updates.push({
            name: registryComponent.name,
            localContent,
            registryContent,
            path: localPath,
          });
        }
      }

      if (updates.length === 0) {
        logger.success("All components are up to date!");
        return;
      }

      logger.break();
      logger.info(`Found ${updates.length} update(s):`);
      updates.forEach((update) => {
        logger.log(`  - ${logger.highlight(update.name)}`);
      });
      logger.break();

      // Show diffs and confirm
      if (!options.force) {
        for (const update of updates) {
          showDiff(update.localContent, update.registryContent, update.path);
          logger.break();
        }

        const shouldUpdate = await confirm(
          "Do you want to apply these updates?",
          true
        );

        if (!shouldUpdate) {
          logger.info("Update cancelled");
          return;
        }

        logger.break();
      }

      // Apply updates
      const allDependencies = new Set<string>();

      for (const update of updates) {
        const updateSpinner = ora(`Updating ${update.name}...`).start();

        try {
          await writeFile(update.path, update.registryContent);

          // Collect dependencies
          const registryComponent = await fetchComponent(
            update.name,
            config.framework,
            config.style
          );

          if (registryComponent.dependencies) {
            registryComponent.dependencies.forEach((dep) =>
              allDependencies.add(dep)
            );
          }

          updateSpinner.succeed(`Updated ${logger.highlight(update.name)}`);
        } catch (error) {
          updateSpinner.fail(`Failed to update ${update.name}`);
          logger.error(
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      }

      // Install new dependencies
      if (allDependencies.size > 0) {
        logger.break();
        const depsArray = Array.from(allDependencies);
        const missingDeps = await filterMissingPackages(depsArray, cwd);

        if (missingDeps.length > 0) {
          logger.info(`Installing ${missingDeps.length} new dependencies...`);
          await installDependencies(missingDeps, cwd);
        }
      }

      logger.break();
      logger.success("Components updated successfully!");
    }
  );
