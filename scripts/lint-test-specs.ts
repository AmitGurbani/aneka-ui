/**
 * Script to lint test specifications
 * Checks for naming conventions, structure, and best practices
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_SPECS_DIR = path.join(__dirname, "..", "packages", "test-specs");

/**
 * Design systems to check
 */
const DESIGN_SYSTEMS = ["material", "hig", "oneui"] as const;

/**
 * Standard test categories
 */
const STANDARD_CATEGORIES = [
  "rendering",
  "variants",
  "sizes",
  "styling",
  "interactions",
  "accessibility",
  "states",
  "composition",
  "props",
] as const;

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

interface LintIssue {
  file: string;
  category?: string;
  testName?: string;
  message: string;
  severity: "error" | "warning" | "info";
}

const issues: LintIssue[] = [];

/**
 * Log colored output
 */
function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
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
 * Check if test name follows naming conventions
 */
function checkTestNaming(testName: string): {
  valid: boolean;
  reason?: string;
} {
  // Should start with "should"
  if (!testName.toLowerCase().startsWith("should ")) {
    return {
      valid: false,
      reason: "Test names should start with 'should'",
    };
  }

  // Should not be too short
  if (testName.length < 20) {
    return {
      valid: false,
      reason: "Test name is too short (minimum 20 characters)",
    };
  }

  // Should not be too long
  if (testName.length > 100) {
    return {
      valid: false,
      reason: "Test name is too long (maximum 100 characters)",
    };
  }

  return { valid: true };
}

/**
 * Check test structure and quality
 */
function checkTestQuality(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test: any,
  relativePath: string,
  category: string
): void {
  // Check if test has both props and children (common pattern)
  if (!test.props && !test.children) {
    issues.push({
      file: relativePath,
      category,
      testName: test.name,
      message: "Test has neither props nor children",
      severity: "warning",
    });
  }

  // Check if interaction tests have actions
  if (
    category === "interactions" &&
    (!test.actions || test.actions.length === 0)
  ) {
    issues.push({
      file: relativePath,
      category,
      testName: test.name,
      message: "Interaction test should have actions",
      severity: "warning",
    });
  }

  // Check if accessibility tests have role assertions
  if (category === "accessibility") {
    const hasRoleAssertion = test.assertions?.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any) => a.type === "hasRole"
    );
    if (!hasRoleAssertion) {
      issues.push({
        file: relativePath,
        category,
        testName: test.name,
        message: "Accessibility test should include role assertion",
        severity: "info",
      });
    }
  }

  // Check for overly complex tests (too many assertions)
  if (test.assertions && test.assertions.length > 10) {
    issues.push({
      file: relativePath,
      category,
      testName: test.name,
      message: `Test has ${test.assertions.length} assertions (consider splitting)`,
      severity: "info",
    });
  }

  // Check for tests with actions but no interaction assertions
  if (test.actions && test.actions.length > 0) {
    const hasInteractionAssertion = test.assertions?.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any) =>
        a.type === "handlerCalled" ||
        a.type === "hasFocus" ||
        a.type === "isDisabled"
    );
    if (!hasInteractionAssertion) {
      issues.push({
        file: relativePath,
        category,
        testName: test.name,
        message: "Test has actions but no interaction-related assertions",
        severity: "warning",
      });
    }
  }
}

/**
 * Lint a single spec file
 */
async function lintSpecFile(specFile: string): Promise<void> {
  const content = await fs.readFile(specFile, "utf-8");
  const spec = JSON.parse(content);
  const relativePath = path.relative(TEST_SPECS_DIR, specFile);

  // Check if spec has description
  if (!spec.description) {
    issues.push({
      file: relativePath,
      message: "Spec is missing description",
      severity: "info",
    });
  }

  // Skip validation for specs marked as skipConsolidated
  // These specs use manual tests instead of consolidated test runner
  if (spec.skipConsolidated) {
    return;
  }

  // Check if spec has at least one test category
  if (!spec.tests || Object.keys(spec.tests).length === 0) {
    issues.push({
      file: relativePath,
      message: "Spec has no test categories",
      severity: "error",
    });
    return;
  }

  // Check test categories
  const categories = Object.keys(spec.tests);
  for (const category of categories) {
    // Suggest standard category names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!STANDARD_CATEGORIES.includes(category as any)) {
      const suggestions = STANDARD_CATEGORIES.filter(
        (c) => c.includes(category) || category.includes(c)
      );
      const suggestionText =
        suggestions.length > 0
          ? ` (did you mean ${suggestions.join(" or ")}?)`
          : "";
      issues.push({
        file: relativePath,
        category,
        message: `Non-standard category name${suggestionText}`,
        severity: "info",
      });
    }

    const tests = spec.tests[category];
    if (!Array.isArray(tests)) {
      continue;
    }

    // Check each test
    for (const test of tests) {
      // Check test naming
      const namingCheck = checkTestNaming(test.name);
      if (!namingCheck.valid) {
        issues.push({
          file: relativePath,
          category,
          testName: test.name,
          message: namingCheck.reason || "Invalid test name",
          severity: "warning",
        });
      }

      // Check test quality
      checkTestQuality(test, relativePath, category);
    }
  }

  // Check for recommended categories
  const recommendedCategories = [
    "rendering",
    "variants",
    "accessibility",
  ] as const;
  for (const recommended of recommendedCategories) {
    if (!categories.includes(recommended)) {
      issues.push({
        file: relativePath,
        message: `Missing recommended category: "${recommended}"`,
        severity: "info",
      });
    }
  }
}

/**
 * Main linting function
 */
async function main() {
  log("\n🧹 Linting Test Specifications\n", "cyan");

  try {
    // Find all spec files
    log("Finding spec files...", "blue");
    const specFiles = await findSpecFiles();

    if (specFiles.length === 0) {
      log("⚠️  No spec files found", "yellow");
      process.exit(0);
    }

    log(`Found ${specFiles.length} spec file(s)\n`, "green");

    // Lint each file
    for (const specFile of specFiles) {
      const relativePath = path.relative(TEST_SPECS_DIR, specFile);
      log(`Linting ${relativePath}...`, "blue");
      await lintSpecFile(specFile);
    }

    // Print results
    log("\n" + "=".repeat(60), "cyan");
    log("Linting Results", "cyan");
    log("=".repeat(60) + "\n", "cyan");

    const errors = issues.filter((i) => i.severity === "error");
    const warnings = issues.filter((i) => i.severity === "warning");
    const infos = issues.filter((i) => i.severity === "info");

    if (errors.length > 0) {
      log(`❌ ${errors.length} Error(s):\n`, "red");
      for (const issue of errors) {
        log(`  ${issue.file}`, "red");
        if (issue.category) log(`    Category: ${issue.category}`, "red");
        if (issue.testName) log(`    Test: "${issue.testName}"`, "red");
        log(`    ${issue.message}\n`, "red");
      }
    }

    if (warnings.length > 0) {
      log(`⚠️  ${warnings.length} Warning(s):\n`, "yellow");
      for (const issue of warnings) {
        log(`  ${issue.file}`, "yellow");
        if (issue.category) log(`    Category: ${issue.category}`, "yellow");
        if (issue.testName) log(`    Test: "${issue.testName}"`, "yellow");
        log(`    ${issue.message}\n`, "yellow");
      }
    }

    if (infos.length > 0) {
      log(`ℹ️  ${infos.length} Suggestion(s):\n`, "blue");
      for (const issue of infos) {
        log(`  ${issue.file}`, "blue");
        if (issue.category) log(`    Category: ${issue.category}`, "blue");
        if (issue.testName) log(`    Test: "${issue.testName}"`, "blue");
        log(`    ${issue.message}\n`, "blue");
      }
    }

    if (issues.length === 0) {
      log("✅ All test specifications follow best practices!\n", "green");
      process.exit(0);
    } else if (errors.length === 0) {
      log("✅ No errors found (only warnings and suggestions)\n", "green");
      process.exit(0);
    } else {
      log("❌ Linting failed with errors\n", "red");
      process.exit(1);
    }
  } catch (error) {
    log("\n❌ Linting failed with error:", "red");
    console.error(error);
    process.exit(1);
  }
}

main();
