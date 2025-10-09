/**
 * Script to build the component registry
 * Reads component files and generates JSON registry entries
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_DIR = path.join(__dirname, "..", "registry");
const OUTPUT_DIR = path.join(REGISTRY_DIR, "dist");

interface RegistryFile {
  path: string;
  content: string;
  type: "component" | "util" | "style";
}

interface RegistryEntry {
  name: string;
  type: "component" | "util";
  framework: "react" | "vue" | "angular";
  style: "material" | "hig" | "oneui";
  files: RegistryFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  description?: string;
  version: string;
}

/**
 * Component dependency mapping
 */
const COMPONENT_DEPENDENCIES: Record<
  string,
  { deps?: string[]; registryDeps?: string[] }
> = {
  button: {
    deps: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
  },
  card: {
    deps: ["clsx", "tailwind-merge"],
  },
  badge: {
    deps: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  dialog: {
    deps: ["@radix-ui/react-dialog", "lucide-react", "clsx", "tailwind-merge"],
  },
  tooltip: {
    deps: ["@radix-ui/react-tooltip", "clsx", "tailwind-merge"],
  },
};

/**
 * Component descriptions
 */
const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  button: "Button component with multiple variants and sizes",
  card: "Card container with header, content, and footer sections",
  badge: "Badge component for labels and status indicators",
  dialog: "Modal dialog with overlay and focus management",
  tooltip: "Tooltip with hover and keyboard support",
};

/**
 * Get file extension for framework
 */
function getFileExtension(framework: string, componentName: string): string {
  switch (framework) {
    case "react":
      return ".tsx";
    case "vue":
      return ".vue";
    case "angular":
      return componentName === "utils" ? ".ts" : ".component.ts";
    default:
      return ".tsx";
  }
}

/**
 * Build registry entry for a component
 */
async function buildRegistryEntry(
  framework: "react" | "vue" | "angular",
  style: "material" | "hig" | "oneui",
  componentName: string,
  version: string
): Promise<RegistryEntry | null> {
  const ext = getFileExtension(framework, componentName);
  const fileName = `${componentName}${ext}`;
  const filePath = path.join(REGISTRY_DIR, framework, style, fileName);

  try {
    const content = await fs.readFile(filePath, "utf-8");

    const entry: RegistryEntry = {
      name: componentName,
      type: "component",
      framework,
      style,
      files: [
        {
          path: fileName,
          content,
          type: "component",
        },
      ],
      dependencies: COMPONENT_DEPENDENCIES[componentName]?.deps,
      registryDependencies: COMPONENT_DEPENDENCIES[componentName]?.registryDeps,
      description: COMPONENT_DESCRIPTIONS[componentName],
      version,
    };

    return entry;
  } catch (error) {
    console.warn(
      `Component ${componentName} not found for ${framework}/${style}`
    );
    return null;
  }
}

/**
 * Main build function
 */
async function build() {
  console.log("Building component registry...\n");

  const version = "0.1.0";
  const frameworks: Array<"react" | "vue" | "angular"> = [
    "react",
    "vue",
    "angular",
  ];
  const styles: Array<"material" | "hig" | "oneui"> = [
    "material",
    "hig",
    "oneui",
  ];
  const components = ["button", "card", "badge", "dialog", "tooltip"];

  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let totalBuilt = 0;
  let totalFailed = 0;

  // Build registry entries for each combination
  for (const framework of frameworks) {
    for (const style of styles) {
      const styleDir = path.join(OUTPUT_DIR, framework, style);
      await fs.mkdir(styleDir, { recursive: true });

      for (const component of components) {
        const entry = await buildRegistryEntry(
          framework,
          style,
          component,
          version
        );

        if (entry) {
          const outputPath = path.join(styleDir, `${component}.json`);
          await fs.writeFile(outputPath, JSON.stringify(entry, null, 2));
          console.log(`✓ Built ${framework}/${style}/${component}`);
          totalBuilt++;
        } else {
          console.log(`✗ Failed ${framework}/${style}/${component}`);
          totalFailed++;
        }
      }
    }
  }

  console.log(
    `\nBuild complete: ${totalBuilt} built, ${totalFailed} failed`
  );
}

// Run build
build().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
