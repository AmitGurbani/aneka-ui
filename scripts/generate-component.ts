/**
 * Script to generate a new component from template
 * Usage: pnpm tsx scripts/generate-component.ts <component-name>
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_DIR = path.join(__dirname, "..", "registry");

interface ComponentOptions {
  name: string;
  framework: "react" | "vue" | "angular";
  style: "material" | "hig" | "oneui";
  type: "simple" | "compound" | "complex";
}

/**
 * Generate React component
 */
function generateReactComponent(options: ComponentOptions): string {
  const { name, style } = options;
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  return `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * ${style.toUpperCase()} ${componentName} Variants
 * TODO: Add style-specific characteristics
 */
const ${name}Variants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ${componentName}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name}Variants> {}

/**
 * ${style.toUpperCase()} ${componentName} Component
 */
const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name}Variants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
${componentName}.displayName = "${componentName}";

export { ${componentName}, ${name}Variants };
`;
}

/**
 * Generate Vue component
 */
function generateVueComponent(options: ComponentOptions): string {
  const { name, style } = options;
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  return `<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ${style.toUpperCase()} ${componentName} Variants
 * TODO: Add style-specific characteristics
 */
const ${name}Variants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ${componentName}Variants = VariantProps<typeof ${name}Variants>;

interface Props extends ${componentName}Variants {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
});

const classes = computed(() =>
  cn(${name}Variants({ variant: props.variant, size: props.size }), props.class)
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
`;
}

/**
 * Generate Angular component
 */
function generateAngularComponent(options: ComponentOptions): string {
  const { name, style } = options;
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  return `import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ${style.toUpperCase()} ${componentName} Variants
 * TODO: Add style-specific characteristics
 */
const ${name}Variants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ${componentName}Variants = VariantProps<typeof ${name}Variants>;

@Component({
  selector: 'aneka-${name}',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  \`,
})
export class ${componentName}Component {
  @Input() variant: ${componentName}Variants['variant'] = 'default';
  @Input() size: ${componentName}Variants['size'] = 'default';
  @Input() class?: string;

  get computedClass(): string {
    return cn(${name}Variants({ variant: this.variant, size: this.size }), this.class);
  }
}
`;
}

/**
 * Main generation function
 */
async function generate() {
  // Get component name from args or prompt
  const componentName =
    process.argv[2] ||
    (
      await inquirer.prompt<{ name: string }>([
        {
          type: "input",
          name: "name",
          message: "Component name:",
          validate: (input: string) =>
            input.length > 0 || "Component name is required",
        },
      ])
    ).name;

  // Prompt for options
  const answers = await inquirer.prompt<{
    frameworks: Array<"react" | "vue" | "angular">;
    styles: Array<"material" | "hig" | "oneui">;
    type: "simple" | "compound" | "complex";
  }>([
    {
      type: "checkbox",
      name: "frameworks",
      message: "Select frameworks:",
      choices: [
        { name: "React", value: "react", checked: true },
        { name: "Vue", value: "vue", checked: true },
        { name: "Angular", value: "angular", checked: true },
      ],
    },
    {
      type: "checkbox",
      name: "styles",
      message: "Select design styles:",
      choices: [
        { name: "Material Design", value: "material", checked: true },
        { name: "Apple HIG", value: "hig", checked: true },
        { name: "Samsung One UI", value: "oneui", checked: true },
      ],
    },
    {
      type: "list",
      name: "type",
      message: "Component type:",
      choices: [
        { name: "Simple (single component)", value: "simple" },
        { name: "Compound (multiple sub-components)", value: "compound" },
        { name: "Complex (uses Radix/CDK)", value: "complex" },
      ],
    },
  ]);

  console.log(`\nGenerating ${componentName}...\n`);

  // Generate component files
  for (const framework of answers.frameworks) {
    for (const style of answers.styles) {
      const options: ComponentOptions = {
        name: componentName,
        framework,
        style,
        type: answers.type,
      };

      let content: string;
      let ext: string;

      switch (framework) {
        case "react":
          content = generateReactComponent(options);
          ext = ".tsx";
          break;
        case "vue":
          content = generateVueComponent(options);
          ext = ".vue";
          break;
        case "angular":
          content = generateAngularComponent(options);
          ext = ".component.ts";
          break;
      }

      const dir = path.join(REGISTRY_DIR, framework, style);
      await fs.mkdir(dir, { recursive: true });

      const filePath = path.join(dir, `${componentName}${ext}`);
      await fs.writeFile(filePath, content);

      console.log(`✓ Generated ${framework}/${style}/${componentName}`);
    }
  }

  console.log("\n✅ Component generation complete!");
  console.log(
    "\nNext steps:\n1. Customize the component styles\n2. Add tests\n3. Update registry index\n4. Build registry\n"
  );
}

// Run generation
generate().catch((error) => {
  console.error("Generation failed:", error);
  process.exit(1);
});
