import fs from "fs/promises";
import path from "path";

import chalk from "chalk";
import { diffLines } from "diff";
import inquirer from "inquirer";

import { logger } from "./logger.js";

/**
 * Conflict resolution strategy
 */
export type ConflictStrategy = "overwrite" | "skip" | "diff" | "cancel";

/**
 * Checks if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Handles file conflicts with interactive prompts
 */
export async function handleFileConflict(
  filePath: string,
  newContent: string,
  options: {
    overwrite?: boolean;
    skip?: boolean;
  } = {}
): Promise<ConflictStrategy> {
  // Check if file exists
  const exists = await fileExists(filePath);
  if (!exists) {
    return "overwrite";
  }

  // Use flags if provided
  if (options.overwrite) {
    return "overwrite";
  }
  if (options.skip) {
    return "skip";
  }

  // Read existing content
  const existingContent = await fs.readFile(filePath, "utf-8");

  // Check if content is the same
  if (existingContent === newContent) {
    return "skip";
  }

  // Interactive prompt
  const { action } = await inquirer.prompt<{ action: ConflictStrategy }>([
    {
      type: "list",
      name: "action",
      message: `File ${chalk.cyan(path.basename(filePath))} already exists. What would you like to do?`,
      choices: [
        { name: "Overwrite", value: "overwrite" },
        { name: "Skip", value: "skip" },
        { name: "Show diff", value: "diff" },
        { name: "Cancel", value: "cancel" },
      ],
    },
  ]);

  // Show diff if requested
  if (action === "diff") {
    showDiff(existingContent, newContent, filePath);
    // Ask again after showing diff
    return handleFileConflict(filePath, newContent, options);
  }

  return action;
}

/**
 * Shows diff between two file contents
 */
export function showDiff(
  oldContent: string,
  newContent: string,
  filePath: string
): void {
  logger.break();
  logger.log(chalk.bold(`Diff for ${chalk.cyan(path.basename(filePath))}:`));
  logger.break();

  const diff = diffLines(oldContent, newContent);

  diff.forEach((part) => {
    const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
    const color = part.added ? chalk.green : part.removed ? chalk.red : chalk.dim;

    part.value.split("\n").forEach((line) => {
      if (line) {
        logger.log(color(prefix + line));
      }
    });
  });

  logger.break();
}

/**
 * Writes content to file, creating directories if needed
 */
export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}

/**
 * Reads file content
 */
export async function readFile(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
