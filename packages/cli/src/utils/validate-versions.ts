import fs from "fs/promises";
import path from "path";

import { coerce, gte, lt } from "semver";

import { logger } from "./logger.js";

/**
 * Minimum required versions for dependencies
 */
const MIN_VERSIONS = {
  node: "18.0.0",
  typescript: "5.0.0",
  tailwindcss: "3.4.0",
  react: "18.0.0",
  vue: "3.3.0",
  "@angular/core": "17.0.0",
} as const;

/**
 * Validates Node.js version
 */
export function validateNodeVersion(): boolean {
  const currentVersion = process.version.slice(1); // Remove 'v' prefix
  const isValid = gte(currentVersion, MIN_VERSIONS.node);

  if (!isValid) {
    logger.error(
      `Node.js ${MIN_VERSIONS.node} or higher is required. Current version: ${currentVersion}`
    );
  }

  return isValid;
}

/**
 * Validates package versions in package.json
 */
export async function validatePackageVersions(
  cwd: string,
  framework: "react" | "vue" | "angular"
): Promise<{ valid: boolean; warnings: string[] }> {
  const warnings: string[] = [];

  try {
    const packageJsonPath = path.join(cwd, "package.json");
    const packageJson = JSON.parse(
      await fs.readFile(packageJsonPath, "utf-8")
    );

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Check TypeScript
    if (allDeps.typescript) {
      const version = coerce(allDeps.typescript);
      if (version && lt(version, MIN_VERSIONS.typescript)) {
        warnings.push(
          `TypeScript ${MIN_VERSIONS.typescript}+ is recommended. Current: ${version}`
        );
      }
    } else {
      warnings.push("TypeScript is not installed");
    }

    // Check Tailwind CSS
    if (allDeps.tailwindcss) {
      const version = coerce(allDeps.tailwindcss);
      if (version && lt(version, MIN_VERSIONS.tailwindcss)) {
        warnings.push(
          `Tailwind CSS ${MIN_VERSIONS.tailwindcss}+ is recommended. Current: ${version}`
        );
      }
    } else {
      warnings.push("Tailwind CSS is not installed");
    }

    // Check framework-specific versions
    switch (framework) {
      case "react":
        if (allDeps.react) {
          const version = coerce(allDeps.react);
          if (version && lt(version, MIN_VERSIONS.react)) {
            warnings.push(
              `React ${MIN_VERSIONS.react}+ is recommended. Current: ${version}`
            );
          }
        }
        break;
      case "vue":
        if (allDeps.vue) {
          const version = coerce(allDeps.vue);
          if (version && lt(version, MIN_VERSIONS.vue)) {
            warnings.push(
              `Vue ${MIN_VERSIONS.vue}+ is recommended. Current: ${version}`
            );
          }
        }
        break;
      case "angular":
        if (allDeps["@angular/core"]) {
          const version = coerce(allDeps["@angular/core"]);
          if (version && lt(version, MIN_VERSIONS["@angular/core"])) {
            warnings.push(
              `Angular ${MIN_VERSIONS["@angular/core"]}+ is recommended. Current: ${version}`
            );
          }
        }
        break;
    }

    return { valid: warnings.length === 0, warnings };
  } catch {
    logger.error("Failed to read package.json");
    return { valid: false, warnings: ["Could not read package.json"] };
  }
}

/**
 * Checks if Tailwind CSS is configured
 */
export async function hasTailwindConfig(cwd: string): Promise<boolean> {
  const possibleConfigs = [
    "tailwind.config.js",
    "tailwind.config.cjs",
    "tailwind.config.mjs",
    "tailwind.config.ts",
  ];

  for (const config of possibleConfigs) {
    try {
      await fs.access(path.join(cwd, config));
      return true;
    } catch {
      continue;
    }
  }

  return false;
}
