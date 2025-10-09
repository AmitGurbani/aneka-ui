import fs from "fs/promises";
import path from "path";
import { Command } from "commander";

import type { Config } from "../types/config.js";
import { fetchComponent } from "../utils/fetch-registry.js";
import { readFile, showDiff } from "../utils/handle-conflicts.js";
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
 * Diff command
 */
export const diff = new Command()
  .name("diff")
  .description("Show changes between local and registry versions")
  .argument("<component>", "Component to compare")
  .action(async (componentName: string) => {
    const cwd = process.cwd();
    const config = await readConfig(cwd);

    logger.info(`Comparing ${componentName}...`);
    logger.break();

    try {
      // Fetch registry version
      const registryComponent = await fetchComponent(
        componentName,
        config.framework,
        config.style
      );

      // Get local file path
      const localPath = getComponentPath(componentName, config, cwd);

      // Read local file
      const localContent = await readFile(localPath);

      if (!localContent) {
        logger.error(`Component "${componentName}" is not installed locally`);
        logger.info(`Run ${logger.highlight(`aneka-ui add ${componentName}`)} to install it`);
        process.exit(1);
      }

      // Get registry content (first file is the main component)
      const registryContent = registryComponent.files[0]?.content || "";

      // Check if identical
      if (localContent === registryContent) {
        logger.success("Component is up to date!");
        return;
      }

      // Show diff
      showDiff(localContent, registryContent, localPath);

      logger.break();
      logger.info(
        `Run ${logger.highlight(`aneka-ui update ${componentName}`)} to update to the latest version`
      );
    } catch (error) {
      logger.error(
        `Failed to compare ${componentName}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      process.exit(1);
    }
  });
