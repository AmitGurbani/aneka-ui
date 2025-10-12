import { execa } from "execa";
import ora from "ora";

import { detectPackageManager } from "./detect-package-manager.js";
import { logger } from "./logger.js";

/**
 * Installs packages using the detected package manager
 */
export async function installDependencies(
  packages: string[],
  cwd: string,
  isDev = false
): Promise<void> {
  if (packages.length === 0) {
    return;
  }

  const packageManager = await detectPackageManager(cwd);
  const spinner = ora(
    `Installing dependencies with ${packageManager}...`
  ).start();

  try {
    let args: string[] = [];

    switch (packageManager) {
      case "pnpm":
        args = ["add", ...packages];
        if (isDev) args.splice(1, 0, "-D");
        break;
      case "yarn":
        args = ["add", ...packages];
        if (isDev) args.splice(1, 0, "-D");
        break;
      case "bun":
        args = ["add", ...packages];
        if (isDev) args.splice(1, 0, "-d");
        break;
      case "npm":
      default:
        args = ["install", ...packages];
        if (isDev) args.splice(1, 0, "--save-dev");
        break;
    }

    await execa(packageManager, args, {
      cwd,
      stdio: "pipe",
    });

    spinner.succeed("Dependencies installed successfully");
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    logger.error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    throw error;
  }
}

/**
 * Checks if packages are already installed
 */
export async function getInstalledPackages(cwd: string): Promise<Set<string>> {
  try {
    const packageManager = await detectPackageManager(cwd);

    let result;
    switch (packageManager) {
      case "pnpm":
        result = await execa("pnpm", ["list", "--json", "--depth=0"], { cwd });
        break;
      case "yarn":
        result = await execa("yarn", ["list", "--json", "--depth=0"], { cwd });
        break;
      case "bun":
        result = await execa("bun", ["pm", "ls"], { cwd });
        break;
      case "npm":
      default:
        result = await execa("npm", ["list", "--json", "--depth=0"], { cwd });
        break;
    }

    const data = JSON.parse(result.stdout);
    const dependencies = data.dependencies || {};
    return new Set(Object.keys(dependencies));
  } catch {
    return new Set();
  }
}

/**
 * Filters out already installed packages
 */
export async function filterMissingPackages(
  packages: string[],
  cwd: string
): Promise<string[]> {
  const installed = await getInstalledPackages(cwd);
  return packages.filter((pkg) => {
    const pkgName = pkg.split("@")[0] ?? "";
    return !installed.has(pkgName);
  });
}
