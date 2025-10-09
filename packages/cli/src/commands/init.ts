import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import ora from "ora";

import type { Config } from "../types/config.js";
import { defaultConfig } from "../types/config.js";
import { detectMonorepo } from "../utils/detect-monorepo.js";
import { logger } from "../utils/logger.js";
import { promptForConfig } from "../utils/prompts.js";
import {
  hasTailwindConfig,
  validateNodeVersion,
  validatePackageVersions,
} from "../utils/validate-versions.js";

/**
 * Detects framework from package.json
 */
async function detectFramework(
  cwd: string
): Promise<"react" | "vue" | "angular" | undefined> {
  try {
    const packageJsonPath = path.join(cwd, "package.json");
    const packageJson = JSON.parse(
      await fs.readFile(packageJsonPath, "utf-8")
    );

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (allDeps.react) return "react";
    if (allDeps.vue) return "vue";
    if (allDeps["@angular/core"]) return "angular";

    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Creates the config file
 */
async function createConfigFile(
  config: Config,
  targetPath: string
): Promise<void> {
  const configPath = path.join(targetPath, "aneka-ui.json");
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
}

/**
 * Updates tsconfig.json with path aliases
 */
async function updateTsConfig(config: Config, targetPath: string): Promise<void> {
  const tsconfigPath = path.join(targetPath, "tsconfig.json");

  try {
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf-8"));

    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.baseUrl = tsconfig.compilerOptions.baseUrl || ".";
    tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

    // Add component alias
    const componentAlias = config.aliases.components.replace(/^@/, "");
    tsconfig.compilerOptions.paths[`${componentAlias}/*`] = [
      `./${config.aliases.components.replace("@/", "")}/*`,
    ];

    // Add utils alias
    const utilsAlias = config.aliases.utils.replace(/^@/, "");
    tsconfig.compilerOptions.paths[`${utilsAlias}/*`] = [
      `./${config.aliases.utils.replace("@/", "")}/*`,
    ];

    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), "utf-8");
  } catch (error) {
    logger.warn("Could not update tsconfig.json. You may need to add path aliases manually.");
  }
}

/**
 * Creates the utils.ts file
 */
async function createUtilsFile(config: Config, targetPath: string): Promise<void> {
  const utilsDir = path.join(
    targetPath,
    config.aliases.utils.replace("@/", "src/")
  );
  const utilsPath = path.join(utilsDir, "utils.ts");

  await fs.mkdir(utilsDir, { recursive: true });

  const content = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  await fs.writeFile(utilsPath, content, "utf-8");
}

/**
 * Init command
 */
export const init = new Command()
  .name("init")
  .description("Initialize Aneka UI in your project")
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("-f, --force", "Overwrite existing configuration")
  .action(async (options: { yes?: boolean; force?: boolean }) => {
    const cwd = process.cwd();

    logger.info("Initializing Aneka UI...");
    logger.break();

    // Validate Node version
    if (!validateNodeVersion()) {
      process.exit(1);
    }

    // Check if already initialized
    const configPath = path.join(cwd, "aneka-ui.json");
    try {
      await fs.access(configPath);
      if (!options.force) {
        logger.error(
          "Aneka UI is already initialized. Use --force to overwrite."
        );
        process.exit(1);
      }
    } catch {
      // Config doesn't exist, proceed
    }

    // Detect framework
    const spinner = ora("Detecting project setup...").start();
    const detectedFramework = await detectFramework(cwd);

    if (!detectedFramework) {
      spinner.warn("Could not detect framework from package.json");
    } else {
      spinner.succeed(`Detected framework: ${detectedFramework}`);
    }

    // Detect monorepo
    const monorepoInfo = await detectMonorepo(cwd);
    if (monorepoInfo.isMonorepo) {
      logger.info(`Detected ${monorepoInfo.type} monorepo`);
    }

    // Validate Tailwind
    const hasTailwind = await hasTailwindConfig(cwd);
    if (!hasTailwind) {
      logger.warn("Tailwind CSS config not found. Make sure Tailwind is installed.");
    }

    logger.break();

    // Prompt for configuration
    let configData: Partial<Config> & { targetPath?: string };

    if (options.yes) {
      configData = {
        framework: detectedFramework || "react",
        style: "material",
        ...defaultConfig,
      };
    } else {
      configData = await promptForConfig({
        detectedFramework,
        isMonorepo: monorepoInfo.isMonorepo,
        packages: monorepoInfo.packages,
      });
    }

    const targetPath = configData.targetPath || cwd;
    delete configData.targetPath;

    const config: Config = {
      $schema: "https://aneka-ui.com/schema.json",
      framework: configData.framework!,
      style: configData.style!,
      aliases: configData.aliases!,
      tailwind: configData.tailwind!,
    };

    logger.break();

    // Validate versions
    const validation = await validatePackageVersions(targetPath, config.framework);
    if (validation.warnings.length > 0) {
      logger.warn("Version warnings:");
      validation.warnings.forEach((warning) => logger.warn(`  ${warning}`));
      logger.break();
    }

    // Create config file
    const configSpinner = ora("Creating configuration...").start();
    try {
      await createConfigFile(config, targetPath);
      configSpinner.succeed("Configuration created");
    } catch (error) {
      configSpinner.fail("Failed to create configuration");
      throw error;
    }

    // Update tsconfig
    const tsconfigSpinner = ora("Updating tsconfig.json...").start();
    try {
      await updateTsConfig(config, targetPath);
      tsconfigSpinner.succeed("Updated tsconfig.json");
    } catch (error) {
      tsconfigSpinner.warn("Could not update tsconfig.json");
    }

    // Create utils file
    const utilsSpinner = ora("Creating utils file...").start();
    try {
      await createUtilsFile(config, targetPath);
      utilsSpinner.succeed("Created utils file");
    } catch (error) {
      utilsSpinner.fail("Failed to create utils file");
      throw error;
    }

    logger.break();
    logger.success("Aneka UI initialized successfully!");
    logger.break();
    logger.info("Next steps:");
    logger.log(`  1. Run ${logger.highlight("aneka-ui add <component>")} to add components`);
    logger.log(`  2. Make sure to configure your Tailwind colors in ${logger.highlight(config.tailwind.config)}`);
    logger.break();
  });
