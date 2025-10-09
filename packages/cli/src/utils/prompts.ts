import inquirer from "inquirer";

import type { Config } from "../types/config.js";

/**
 * Prompts for initial configuration
 */
export async function promptForConfig(options: {
  detectedFramework?: "react" | "vue" | "angular";
  isMonorepo: boolean;
  packages?: string[];
}): Promise<Partial<Config> & { targetPath?: string }> {
  const answers = await inquirer.prompt([
    // Framework selection
    {
      type: "list",
      name: "framework",
      message: "Which framework are you using?",
      choices: [
        { name: "React", value: "react" },
        { name: "Vue", value: "vue" },
        { name: "Angular", value: "angular" },
      ],
      default: options.detectedFramework,
      when: !options.detectedFramework,
    },
    // Style selection
    {
      type: "list",
      name: "style",
      message: "Which design system style would you like to use?",
      choices: [
        { name: "Material Design (Google)", value: "material" },
        { name: "Human Interface Guidelines (Apple)", value: "hig" },
        { name: "One UI (Samsung)", value: "oneui" },
      ],
    },
    // Monorepo package selection
    {
      type: "list",
      name: "targetPath",
      message: "Which package would you like to configure?",
      choices: options.packages?.map((pkg) => ({
        name: pkg,
        value: pkg,
      })),
      when: options.isMonorepo && options.packages && options.packages.length > 1,
    },
    // Component directory
    {
      type: "input",
      name: "componentDir",
      message: "Where would you like to install components?",
      default: "src/components/ui",
    },
    // Utils directory
    {
      type: "input",
      name: "utilsDir",
      message: "Where would you like to install utility functions?",
      default: "src/lib/utils",
    },
    // Tailwind config
    {
      type: "input",
      name: "tailwindConfig",
      message: "Where is your Tailwind config located?",
      default: "tailwind.config.js",
    },
    // Tailwind CSS file
    {
      type: "input",
      name: "tailwindCss",
      message: "Where is your global CSS file?",
      default: (answers: { framework?: string }) => {
        if (answers.framework === "vue") return "src/assets/main.css";
        if (answers.framework === "angular") return "src/styles.css";
        return "src/app/globals.css";
      },
    },
  ]);

  return {
    framework: answers.framework || options.detectedFramework,
    style: answers.style,
    targetPath: answers.targetPath,
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
    },
    tailwind: {
      config: answers.tailwindConfig,
      css: answers.tailwindCss,
    },
  };
}

/**
 * Prompts for component selection
 */
export async function promptForComponents(
  availableComponents: { name: string; description: string }[]
): Promise<string[]> {
  const { components } = await inquirer.prompt<{ components: string[] }>([
    {
      type: "checkbox",
      name: "components",
      message: "Which components would you like to add?",
      choices: availableComponents.map((comp) => ({
        name: `${comp.name} - ${comp.description}`,
        value: comp.name,
      })),
    },
  ]);

  return components;
}

/**
 * Confirms an action
 */
export async function confirm(message: string, defaultValue = false): Promise<boolean> {
  const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>([
    {
      type: "confirm",
      name: "confirmed",
      message,
      default: defaultValue,
    },
  ]);

  return confirmed;
}

/**
 * Prompts for package selection in monorepo
 */
export async function promptForPackage(packages: string[]): Promise<string> {
  const { selectedPackage } = await inquirer.prompt<{ selectedPackage: string }>([
    {
      type: "list",
      name: "selectedPackage",
      message: "Select a package:",
      choices: packages,
    },
  ]);

  return selectedPackage;
}
