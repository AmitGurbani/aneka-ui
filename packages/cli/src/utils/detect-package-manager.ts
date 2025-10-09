import fs from "fs/promises";
import path from "path";

/**
 * Supported package managers
 */
export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

/**
 * Detects the package manager used in the project
 */
export async function detectPackageManager(
  cwd: string
): Promise<PackageManager> {
  try {
    // Check for lock files
    const files = await fs.readdir(cwd);

    if (files.includes("pnpm-lock.yaml")) {
      return "pnpm";
    }

    if (files.includes("yarn.lock")) {
      return "yarn";
    }

    if (files.includes("bun.lockb")) {
      return "bun";
    }

    if (files.includes("package-lock.json")) {
      return "npm";
    }

    // Check package.json for packageManager field
    const packageJsonPath = path.join(cwd, "package.json");
    const packageJson = JSON.parse(
      await fs.readFile(packageJsonPath, "utf-8")
    );

    if (packageJson.packageManager) {
      const pm = packageJson.packageManager.split("@")[0] as PackageManager;
      return pm;
    }

    // Default to npm
    return "npm";
  } catch {
    return "npm";
  }
}

/**
 * Gets the install command for the detected package manager
 */
export function getInstallCommand(
  packageManager: PackageManager,
  packages: string[]
): string {
  const pkgString = packages.join(" ");

  switch (packageManager) {
    case "pnpm":
      return `pnpm add ${pkgString}`;
    case "yarn":
      return `yarn add ${pkgString}`;
    case "bun":
      return `bun add ${pkgString}`;
    case "npm":
    default:
      return `npm install ${pkgString}`;
  }
}
