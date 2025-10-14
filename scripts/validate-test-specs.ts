/**
 * Script to validate test specifications
 * Checks for schema compliance and common issues
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// eslint-disable-next-line import/no-named-as-default
import Ajv from "ajv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_SPECS_DIR = path.join(__dirname, "..", "packages", "test-specs");
const SCHEMA_FILE = path.join(TEST_SPECS_DIR, "schema.json");

/**
 * Design systems to check
 */
const DESIGN_SYSTEMS = ["material", "hig", "oneui"] as const;

/**
 * Valid frameworks
 */
const VALID_FRAMEWORKS = ["react", "vue", "angular"] as const;

/**
 * Color codes for console output
 */
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

interface ValidationError {
  file: string;
  error: string;
  type: "schema" | "logic" | "warning";
}

const errors: ValidationError[] = [];
const warnings: ValidationError[] = [];

/**
 * Log colored output
 */
function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load and parse JSON schema
 */
async function loadSchema(): Promise<object> {
  const schemaContent = await fs.readFile(SCHEMA_FILE, "utf-8");
  return JSON.parse(schemaContent);
}

/**
 * Find all spec files
 */
async function findSpecFiles(): Promise<string[]> {
  const specFiles: string[] = [];

  for (const designSystem of DESIGN_SYSTEMS) {
    const dir = path.join(TEST_SPECS_DIR, designSystem);
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        if (file.endsWith(".spec.json")) {
          specFiles.push(path.join(dir, file));
        }
      }
    } catch {
      // Directory doesn't exist yet, skip
    }
  }

  return specFiles;
}

/**
 * Validate spec file against JSON schema
 */
async function validateAgainstSchema(
  specFile: string,
  schema: object,
  ajv: Ajv
): Promise<boolean> {
  const content = await fs.readFile(specFile, "utf-8");
  const spec = JSON.parse(content);

  const validate = ajv.compile(schema);
  const valid = validate(spec);

  if (!valid && validate.errors) {
    for (const error of validate.errors) {
      errors.push({
        file: path.relative(TEST_SPECS_DIR, specFile),
        error: `Schema validation: ${error.instancePath} ${error.message}`,
        type: "schema",
      });
    }
    return false;
  }

  return true;
}

/**
 * Perform logical validation checks
 */
async function performLogicalValidation(specFile: string): Promise<void> {
  const content = await fs.readFile(specFile, "utf-8");
  const spec = JSON.parse(content);
  const relativePath = path.relative(TEST_SPECS_DIR, specFile);

  // Check for duplicate test names
  const testNames = new Set<string>();
  for (const category of Object.values(spec.tests || {})) {
    if (Array.isArray(category)) {
      for (const test of category) {
        if (testNames.has(test.name)) {
          errors.push({
            file: relativePath,
            error: `Duplicate test name: "${test.name}"`,
            type: "logic",
          });
        }
        testNames.add(test.name);

        // Check skipFrameworks usage
        if (test.skipFrameworks && test.skipFrameworks.length > 0) {
          // Warn if skipping all frameworks
          if (test.skipFrameworks.length === 3) {
            warnings.push({
              file: relativePath,
              error: `Test "${test.name}" is skipped on all frameworks`,
              type: "warning",
            });
          }

          // Error if skipFrameworks present but no skipReason
          if (!test.skipReason) {
            errors.push({
              file: relativePath,
              error: `Test "${test.name}" has skipFrameworks but no skipReason`,
              type: "logic",
            });
          }

          // Validate framework names
          for (const framework of test.skipFrameworks) {
            if (!VALID_FRAMEWORKS.includes(framework)) {
              errors.push({
                file: relativePath,
                error: `Test "${test.name}" has invalid framework in skipFrameworks: "${framework}"`,
                type: "logic",
              });
            }
          }
        }

        // Warn if skipReason but no skipFrameworks
        if (
          test.skipReason &&
          (!test.skipFrameworks || test.skipFrameworks.length === 0)
        ) {
          warnings.push({
            file: relativePath,
            error: `Test "${test.name}" has skipReason but no skipFrameworks`,
            type: "warning",
          });
        }

        // Check for empty assertions
        if (!test.assertions || test.assertions.length === 0) {
          errors.push({
            file: relativePath,
            error: `Test "${test.name}" has no assertions`,
            type: "logic",
          });
        }

        // Check for handler assertions without handler prop
        for (const assertion of test.assertions || []) {
          if (
            (assertion.type === "handlerCalled" ||
              assertion.type === "handlerNotCalled") &&
            !assertion.handler
          ) {
            errors.push({
              file: relativePath,
              error: `Test "${test.name}" has ${assertion.type} assertion without handler name`,
              type: "logic",
            });
          }
        }
      }
    }
  }

  // Check for empty test categories
  for (const [category, tests] of Object.entries(spec.tests || {})) {
    if (Array.isArray(tests) && tests.length === 0) {
      warnings.push({
        file: relativePath,
        error: `Empty test category: "${category}"`,
        type: "warning",
      });
    }
  }

  // Warn about frameworkSpecific (deprecated)
  if (spec.frameworkSpecific) {
    warnings.push({
      file: relativePath,
      error:
        "Using deprecated 'frameworkSpecific' field. Consider using 'skipFrameworks' on individual tests instead.",
      type: "warning",
    });
  }
}

/**
 * Main validation function
 */
async function main() {
  log("\n🔍 Validating Test Specifications\n", "cyan");

  try {
    // Load schema
    log("Loading JSON schema...", "blue");
    const schema = await loadSchema();
    const ajv = new Ajv({ allErrors: true });

    // Find all spec files
    log("Finding spec files...", "blue");
    const specFiles = await findSpecFiles();

    if (specFiles.length === 0) {
      log("⚠️  No spec files found", "yellow");
      process.exit(0);
    }

    log(`Found ${specFiles.length} spec file(s)\n`, "green");

    // Validate each file
    for (const specFile of specFiles) {
      const relativePath = path.relative(TEST_SPECS_DIR, specFile);
      log(`Validating ${relativePath}...`, "blue");

      // Schema validation
      const schemaValid = await validateAgainstSchema(specFile, schema, ajv);

      if (schemaValid) {
        // Logical validation
        await performLogicalValidation(specFile);
      }
    }

    // Print results
    log("\n" + "=".repeat(60), "cyan");
    log("Validation Results", "cyan");
    log("=".repeat(60) + "\n", "cyan");

    if (errors.length > 0) {
      log(`❌ ${errors.length} Error(s):\n`, "red");
      for (const error of errors) {
        log(`  [${error.type}] ${error.file}`, "red");
        log(`    ${error.error}\n`, "red");
      }
    }

    if (warnings.length > 0) {
      log(`⚠️  ${warnings.length} Warning(s):\n`, "yellow");
      for (const warning of warnings) {
        log(`  ${warning.file}`, "yellow");
        log(`    ${warning.error}\n`, "yellow");
      }
    }

    if (errors.length === 0 && warnings.length === 0) {
      log("✅ All test specifications are valid!\n", "green");
      process.exit(0);
    } else if (errors.length === 0) {
      log("✅ No errors found (only warnings)\n", "green");
      process.exit(0);
    } else {
      log("❌ Validation failed\n", "red");
      process.exit(1);
    }
  } catch (error) {
    log("\n❌ Validation failed with error:", "red");
    console.error(error);
    process.exit(1);
  }
}

main();
