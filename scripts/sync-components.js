#!/usr/bin/env node

/**
 * Unified component sync utility
 * Syncs components from registry to target directories
 *
 * Usage:
 *   node scripts/sync-components.js --target storybook
 *   node scripts/sync-components.js --target tests
 *   node scripts/sync-components.js --target all
 */

import fs from "fs/promises";
import { cpSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Target configurations
const TARGETS = {
  storybook: {
    source: path.resolve(rootDir, "registry/react"),
    dest: path.resolve(rootDir, "storybook/src/components"),
    needsTransform: false,
  },
  tests: {
    source: path.resolve(rootDir, "registry/react"),
    dest: path.resolve(rootDir, "packages/components-test/src"),
    needsTransform: true,
    components: ["button.tsx", "card.tsx", "badge.tsx", "dialog.tsx", "tooltip.tsx"],
    styles: ["material", "hig", "oneui"],
  },
};

/**
 * Sync components for Storybook (simple copy)
 */
async function syncStorybook() {
  console.log("📚 Syncing components to Storybook...");
  const { source, dest } = TARGETS.storybook;

  try {
    cpSync(source, dest, { recursive: true });
    console.log("✅ Storybook components synced!");
  } catch (error) {
    console.error("❌ Failed to sync Storybook:", error.message);
    throw error;
  }
}

/**
 * Sync components for tests (with import path transformation)
 */
async function syncTests() {
  console.log("🧪 Syncing components to test package...");
  const { dest, components, styles } = TARGETS.tests;

  // Create lib/utils
  const utilsDir = path.join(dest, "lib");
  await fs.mkdir(utilsDir, { recursive: true });

  const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
  await fs.writeFile(path.join(utilsDir, "utils.ts"), utilsContent);
  console.log("  ✅ Created lib/utils.ts");

  // Sync components for each style
  for (const style of styles) {
    const styleDir = path.join(dest, style);
    await fs.mkdir(styleDir, { recursive: true });

    for (const component of components) {
      const sourcePath = path.join(rootDir, "registry/react", style, component);
      const destPath = path.join(styleDir, component);

      try {
        // Read and transform component
        let content = await fs.readFile(sourcePath, "utf-8");

        // Fix import path: @/lib/utils -> ../lib/utils
        content = content.replace(/@\/lib\/utils/g, "../lib/utils");

        await fs.writeFile(destPath, content);
        console.log(`  ✅ Synced ${style}/${component}`);
      } catch (error) {
        console.error(`  ❌ Failed to sync ${style}/${component}:`, error.message);
      }
    }
  }

  console.log("✅ Test components synced!");
}

/**
 * Main sync function
 */
async function main() {
  const args = process.argv.slice(2);
  const targetArg = args.find((arg) => arg.startsWith("--target="));
  const target = targetArg ? targetArg.split("=")[1] : "all";

  console.log("🔄 Component Sync Utility\n");

  try {
    if (target === "storybook" || target === "all") {
      await syncStorybook();
      console.log();
    }

    if (target === "tests" || target === "all") {
      await syncTests();
      console.log();
    }

    if (target !== "storybook" && target !== "tests" && target !== "all") {
      console.error(`❌ Invalid target: ${target}`);
      console.log("\nValid targets: storybook, tests, all");
      process.exit(1);
    }

    console.log("✨ Sync complete!\n");
  } catch (error) {
    console.error("\n❌ Sync failed:", error.message);
    process.exit(1);
  }
}

main();
