#!/usr/bin/env node

/**
 * Sync components from registry to test src directory
 * This script copies components and fixes import paths for testing
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_ROOT = path.resolve(__dirname, "../../../registry/react");
const TEST_SRC = path.resolve(__dirname, "../src");

// Components to sync (add more as needed)
const COMPONENTS_TO_SYNC = {
  material: ["button.tsx", "card.tsx", "badge.tsx", "dialog.tsx", "tooltip.tsx"],
  hig: ["button.tsx", "card.tsx", "badge.tsx", "dialog.tsx", "tooltip.tsx"],
  oneui: ["button.tsx", "card.tsx", "badge.tsx", "dialog.tsx", "tooltip.tsx"],
};

async function syncComponents() {
  console.log("🔄 Syncing components from registry...\n");

  // Create lib/utils if it doesn't exist
  const utilsDir = path.join(TEST_SRC, "lib");
  await fs.mkdir(utilsDir, { recursive: true });

  // Copy utils file
  const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
  await fs.writeFile(path.join(utilsDir, "utils.ts"), utilsContent);
  console.log("✅ Created lib/utils.ts");

  // Sync components for each style
  for (const [style, components] of Object.entries(COMPONENTS_TO_SYNC)) {
    const styleDir = path.join(TEST_SRC, style);
    await fs.mkdir(styleDir, { recursive: true });

    for (const component of components) {
      const sourcePath = path.join(REGISTRY_ROOT, style, component);
      const destPath = path.join(styleDir, component);

      try {
        // Read component file
        let content = await fs.readFile(sourcePath, "utf-8");

        // Fix import path: @/lib/utils -> ../lib/utils
        content = content.replace(/@\/lib\/utils/g, "../lib/utils");

        // Write to test src
        await fs.writeFile(destPath, content);
        console.log(`✅ Synced ${style}/${component}`);
      } catch (error) {
        console.error(`❌ Failed to sync ${style}/${component}:`, error.message);
      }
    }
  }

  console.log("\n✨ Component sync complete!");
}

syncComponents().catch((error) => {
  console.error("Error syncing components:", error);
  process.exit(1);
});
