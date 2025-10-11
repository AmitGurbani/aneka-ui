import fs from "fs/promises";
import path from "path";

import chalk from "chalk";
import { Command } from "commander";

import type { Config } from "../types/config.js";
import { configSchema } from "../types/config.js";
import { fileExists } from "../utils/handle-conflicts.js";
import { logger } from "../utils/logger.js";
import {
  hasTailwindConfig,
  validateNodeVersion,
  validatePackageVersions,
} from "../utils/validate-versions.js";

/**
 * Issue severity
 */
type IssueSeverity = "error" | "warning" | "info";

/**
 * Diagnostic issue
 */
interface Issue {
  severity: IssueSeverity;
  message: string;
  fix?: () => Promise<void>;
}

/**
 * Reads and validates config file
 */
async function validateConfig(cwd: string): Promise<Issue[]> {
  const issues: Issue[] = [];
  const configPath = path.join(cwd, "aneka-ui.json");

  // Check if config exists
  if (!(await fileExists(configPath))) {
    issues.push({
      severity: "error",
      message: "aneka-ui.json not found",
      fix: async () => {
        logger.info("Run 'aneka-ui init' to initialize configuration");
      },
    });
    return issues;
  }

  // Validate config schema
  try {
    const content = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(content);
    configSchema.parse(config);
  } catch (error) {
    issues.push({
      severity: "error",
      message: `Invalid config: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }

  return issues;
}

/**
 * Validates project structure
 */
async function validateStructure(cwd: string): Promise<Issue[]> {
  const issues: Issue[] = [];

  try {
    const configPath = path.join(cwd, "aneka-ui.json");
    const content = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(content) as Config;

    // Check components directory
    const componentsDir = path.join(
      cwd,
      config.aliases.components.replace("@/", "src/")
    );

    if (!(await fileExists(componentsDir))) {
      issues.push({
        severity: "warning",
        message: `Components directory not found: ${componentsDir}`,
        fix: async () => {
          await fs.mkdir(componentsDir, { recursive: true });
          logger.success(`Created directory: ${componentsDir}`);
        },
      });
    }

    // Check utils directory
    const utilsDir = path.join(cwd, config.aliases.utils.replace("@/", "src/"));

    if (!(await fileExists(utilsDir))) {
      issues.push({
        severity: "warning",
        message: `Utils directory not found: ${utilsDir}`,
        fix: async () => {
          await fs.mkdir(utilsDir, { recursive: true });
          logger.success(`Created directory: ${utilsDir}`);
        },
      });
    }

    // Check utils.ts file
    const utilsFile = path.join(utilsDir, "utils.ts");
    if (!(await fileExists(utilsFile))) {
      issues.push({
        severity: "warning",
        message: "utils.ts file not found",
      });
    }

    // Check Tailwind config
    if (!(await hasTailwindConfig(cwd))) {
      issues.push({
        severity: "error",
        message: "Tailwind CSS config not found",
      });
    }

    // Check tsconfig.json
    const tsconfigPath = path.join(cwd, "tsconfig.json");
    if (!(await fileExists(tsconfigPath))) {
      issues.push({
        severity: "warning",
        message: "tsconfig.json not found",
      });
    }
  } catch {
    // Config doesn't exist, already reported
  }

  return issues;
}

/**
 * Validates versions
 */
async function validateVersions(cwd: string): Promise<Issue[]> {
  const issues: Issue[] = [];

  // Check Node version
  if (!validateNodeVersion()) {
    issues.push({
      severity: "error",
      message: "Node.js version is too old",
    });
  }

  try {
    const configPath = path.join(cwd, "aneka-ui.json");
    const content = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(content) as Config;

    // Check package versions
    const validation = await validatePackageVersions(cwd, config.framework);

    validation.warnings.forEach((warning) => {
      issues.push({
        severity: "warning",
        message: warning,
      });
    });
  } catch {
    // Config doesn't exist, already reported
  }

  return issues;
}

/**
 * Checks color configuration
 */
async function checkColorConfig(cwd: string): Promise<Issue[]> {
  const issues: Issue[] = [];

  try {
    const configPath = path.join(cwd, "aneka-ui.json");
    const content = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(content) as Config;

    // Try to read Tailwind config
    const tailwindConfigPath = path.join(cwd, config.tailwind.config);

    if (await fileExists(tailwindConfigPath)) {
      const tailwindContent = await fs.readFile(tailwindConfigPath, "utf-8");

      // Check if colors are configured
      if (
        !tailwindContent.includes("primary") ||
        !tailwindContent.includes("colors")
      ) {
        issues.push({
          severity: "info",
          message:
            "Tailwind colors may not be configured. Aneka UI components require color configuration.",
        });
      }
    }
  } catch {
    // Already handled in structure validation
  }

  return issues;
}

/**
 * Formats issue for display
 */
function formatIssue(issue: Issue): string {
  const icon =
    issue.severity === "error"
      ? chalk.red("✖")
      : issue.severity === "warning"
        ? chalk.yellow("⚠")
        : chalk.blue("ℹ");

  return `${icon} ${issue.message}`;
}

/**
 * Doctor command
 */
export const doctor = new Command()
  .name("doctor")
  .description("Diagnose setup issues")
  .option("-f, --fix", "Attempt to fix issues automatically")
  .action(async (options: { fix?: boolean }) => {
    const cwd = process.cwd();

    logger.info("Running diagnostics...");
    logger.break();

    // Run all checks
    const allIssues: Issue[] = [
      ...(await validateConfig(cwd)),
      ...(await validateStructure(cwd)),
      ...(await validateVersions(cwd)),
      ...(await checkColorConfig(cwd)),
    ];

    // Group by severity
    const errors = allIssues.filter((i) => i.severity === "error");
    const warnings = allIssues.filter((i) => i.severity === "warning");
    const infos = allIssues.filter((i) => i.severity === "info");

    // Display results
    if (allIssues.length === 0) {
      logger.success("No issues found! Your setup looks good.");
      return;
    }

    if (errors.length > 0) {
      logger.log(chalk.bold.red("Errors:"));
      errors.forEach((issue) => logger.log(`  ${formatIssue(issue)}`));
      logger.break();
    }

    if (warnings.length > 0) {
      logger.log(chalk.bold.yellow("Warnings:"));
      warnings.forEach((issue) => logger.log(`  ${formatIssue(issue)}`));
      logger.break();
    }

    if (infos.length > 0) {
      logger.log(chalk.bold.blue("Info:"));
      infos.forEach((issue) => logger.log(`  ${formatIssue(issue)}`));
      logger.break();
    }

    // Apply fixes if requested
    if (options.fix) {
      logger.info("Attempting to fix issues...");
      logger.break();

      let fixed = 0;
      for (const issue of allIssues) {
        if (issue.fix) {
          try {
            await issue.fix();
            fixed++;
          } catch (error) {
            logger.error(
              `Failed to fix: ${error instanceof Error ? error.message : "Unknown error"}`
            );
          }
        }
      }

      logger.break();
      if (fixed > 0) {
        logger.success(`Fixed ${fixed} issue(s)`);
      } else {
        logger.info("No auto-fixable issues found");
      }
    }

    // Exit with error code if there are errors
    if (errors.length > 0) {
      process.exit(1);
    }
  });
