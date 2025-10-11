/**
 * Script to validate the component registry
 * Checks for consistency, required fields, and correct structure
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_DIR = path.join(__dirname, "..", "registry");

/**
 * Registry entry schema
 */
const _registryEntrySchema = z.object({
  name: z.string(),
  type: z.enum(["component", "util"]),
  framework: z.enum(["react", "vue", "angular"]),
  style: z.enum(["material", "hig", "oneui"]),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string(),
      type: z.enum(["component", "util", "style"]),
    })
  ),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  description: z.string().optional(),
  version: z.string().optional(),
});

/**
 * Registry index schema
 */
const registryIndexSchema = z.array(
  z.object({
    name: z.string(),
    type: z.enum(["component", "util"]),
    description: z.string(),
    frameworks: z.array(z.enum(["react", "vue", "angular"])),
    styles: z.array(z.enum(["material", "hig", "oneui"])),
  })
);

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate index.json
 */
async function validateIndex(): Promise<ValidationResult> {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  try {
    const indexPath = path.join(REGISTRY_DIR, "index.json");
    const content = await fs.readFile(indexPath, "utf-8");
    const data = JSON.parse(content);

    registryIndexSchema.parse(data);
    console.log("✓ index.json is valid");
  } catch (error) {
    result.valid = false;
    result.errors.push(
      `index.json validation failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  return result;
}

/**
 * Validate component files exist
 */
async function validateComponentFiles(): Promise<ValidationResult> {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  const frameworks = ["react", "vue", "angular"];
  const styles = ["material", "hig", "oneui"];
  const components = ["button", "card", "badge", "dialog", "tooltip"];

  for (const framework of frameworks) {
    for (const style of styles) {
      for (const component of components) {
        const ext =
          framework === "vue"
            ? ".vue"
            : framework === "angular"
              ? ".component.ts"
              : ".tsx";
        const filePath = path.join(
          REGISTRY_DIR,
          framework,
          style,
          `${component}${ext}`
        );

        try {
          await fs.access(filePath);
          console.log(`✓ ${framework}/${style}/${component} exists`);
        } catch {
          result.warnings.push(
            `Component file missing: ${framework}/${style}/${component}`
          );
        }
      }
    }
  }

  return result;
}

/**
 * Validate React components
 */
async function validateReactComponents(): Promise<ValidationResult> {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  const styles = ["material", "hig", "oneui"];
  const components = ["button", "card", "badge", "dialog", "tooltip"];

  for (const style of styles) {
    for (const component of components) {
      const filePath = path.join(
        REGISTRY_DIR,
        "react",
        style,
        `${component}.tsx`
      );

      try {
        const content = await fs.readFile(filePath, "utf-8");

        // Check for forwardRef
        if (component === "button" || component === "card") {
          if (!content.includes("React.forwardRef")) {
            result.errors.push(
              `${component} (${style}) should use React.forwardRef`
            );
            result.valid = false;
          }
        }

        // Check for displayName
        if (
          content.includes("forwardRef") &&
          !content.includes("displayName")
        ) {
          result.warnings.push(
            `${component} (${style}) should have displayName`
          );
        }

        // Check for imports
        if (!content.includes('from "@/lib/utils"')) {
          result.warnings.push(
            `${component} (${style}) should import from @/lib/utils`
          );
        }

        console.log(`✓ react/${style}/${component} validated`);
      } catch {
        // File doesn't exist, already handled
      }
    }
  }

  return result;
}

/**
 * Main validation function
 */
async function validate() {
  console.log("Validating component registry...\n");

  const results = await Promise.all([
    validateIndex(),
    validateComponentFiles(),
    validateReactComponents(),
  ]);

  const allErrors = results.flatMap((r) => r.errors);
  const allWarnings = results.flatMap((r) => r.warnings);

  console.log("\n--- Validation Summary ---\n");

  if (allErrors.length > 0) {
    console.log("❌ ERRORS:");
    allErrors.forEach((error) => console.log(`  - ${error}`));
  }

  if (allWarnings.length > 0) {
    console.log("\n⚠️  WARNINGS:");
    allWarnings.forEach((warning) => console.log(`  - ${warning}`));
  }

  if (allErrors.length === 0 && allWarnings.length === 0) {
    console.log("✅ All validations passed!");
  }

  console.log(
    `\nTotal: ${allErrors.length} errors, ${allWarnings.length} warnings`
  );

  if (allErrors.length > 0) {
    process.exit(1);
  }
}

// Run validation
validate().catch((error) => {
  console.error("Validation failed:", error);
  process.exit(1);
});
