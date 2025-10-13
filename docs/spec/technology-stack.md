# Technology Stack

> **Specification Section:** Technology Decisions
> **Last Updated:** October 2025

This document defines all technology choices, version requirements, and tooling decisions for the Aneka UI project.

---

## 📦 Core Technologies

### Runtime & Language

| Technology     | Version | Purpose              |
| -------------- | ------- | -------------------- |
| **Node.js**    | 18.0.0+ | JavaScript runtime   |
| **pnpm**       | 9.0.0+  | Package manager      |
| **TypeScript** | 5.0.0+  | Type-safe JavaScript |

**Rationale:**

- **Node.js 18+:** Native fetch, performance improvements, LTS support
- **pnpm:** Fast, disk-efficient, strict dependency resolution
- **TypeScript 5+:** Latest features (decorators, const type parameters)

**Configuration:**

```json
// tsconfig.json (strict mode)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  }
}
```

---

## 🎨 Styling Stack

### Primary Styling: Tailwind CSS

| Technology                         | Version | Purpose                              |
| ---------------------------------- | ------- | ------------------------------------ |
| **Tailwind CSS**                   | 3.4.0+  | Utility-first CSS framework          |
| **class-variance-authority (CVA)** | Latest  | Type-safe variant composition        |
| **clsx**                           | Latest  | Conditional className utility        |
| **tailwind-merge**                 | Latest  | Merge Tailwind classes intelligently |
| **prettier-plugin-tailwindcss**    | Latest  | Sort Tailwind classes                |

**Rationale:**

- **Tailwind 3.4+:** Stable, performant, excellent DX
- **CVA:** Type-safe component variants with great TypeScript inference
- **clsx:** Lightweight conditional classes
- **tailwind-merge:** Prevents class conflicts (e.g., `px-2 px-4` → `px-4`)

**Example Usage:**

```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", destructive: "..." },
      size: { sm: "...", lg: "..." }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
)

export const Button = ({ variant, size, className, ...props }) => (
  <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
)
```

**Helper Function (`lib/utils.ts`):**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Why No CSS Variables?**

❌ **Traditional approach:**

```css
:root {
  --color-primary: #3b82f6;
}
.button {
  background: var(--color-primary);
}
```

✅ **Aneka UI approach:**

```javascript
// tailwind.config.js (user provides)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6"
      }
    }
  }
}

// Component uses
<button className="bg-primary">Click</button>
```

**Benefits:**

- No CSS variable overhead
- Tailwind's JIT compiler optimizes
- Users control colors directly in config
- Better tree-shaking

---

## ⚛️ Framework-Specific Dependencies

### React Stack

| Technology               | Version | Purpose                         |
| ------------------------ | ------- | ------------------------------- |
| **React**                | 18.0.0+ | UI library                      |
| **@radix-ui/react-\***   | Latest  | Accessible primitives           |
| **@radix-ui/react-slot** | Latest  | Composition primitive (asChild) |

**Key Radix Primitives Used:**

- `@radix-ui/react-dialog` - Dialog component
- `@radix-ui/react-tooltip` - Tooltip component
- `@radix-ui/react-slot` - Polymorphic component support

**React-Specific Patterns:**

- `React.forwardRef` for all components
- `displayName` for debugging
- TypeScript interfaces exported

**Example:**

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} {...props} />
  }
)

Button.displayName = "Button"
```

### Vue Stack

| Technology    | Version | Purpose                       |
| ------------- | ------- | ----------------------------- |
| **Vue**       | 3.3.0+  | Progressive framework         |
| **radix-vue** | Latest  | Accessible primitives for Vue |

**Vue-Specific Patterns:**

- Composition API (`<script setup>`)
- Single File Components (.vue)
- `defineProps` with TypeScript

**Example:**

```vue
<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(/* ... */);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props extends ButtonVariants {
  class?: string;
  asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  asChild: false,
});

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
);
</script>

<template>
  <component :is="asChild ? 'slot' : 'button'" :class="classes">
    <slot />
  </component>
</template>
```

### Angular Stack

| Technology       | Version | Purpose                          |
| ---------------- | ------- | -------------------------------- |
| **Angular**      | 17.0.0+ | Full framework                   |
| **@angular/cdk** | Latest  | Component dev kit (Dialog, etc.) |

**Angular-Specific Patterns:**

- Standalone components (no modules)
- `@Input()` and `@Output()` decorators
- TypeScript classes

**Example:**

```typescript
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(/* ... */);

type ButtonVariants = VariantProps<typeof buttonVariants>;

@Component({
  selector: "aneka-button",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="computedClass" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariants["variant"] = "default";
  @Input() size: ButtonVariants["size"] = "default";
  @Input() class?: string;
  @Input() disabled = false;

  get computedClass(): string {
    return cn(
      buttonVariants({ variant: this.variant, size: this.size }),
      this.class
    );
  }
}
```

---

## 🛠️ CLI Tooling

### CLI Stack

| Technology       | Version | Purpose                   |
| ---------------- | ------- | ------------------------- |
| **Commander.js** | 12.0.0+ | CLI framework             |
| **Inquirer.js**  | 9.0.0+  | Interactive prompts       |
| **Ora**          | 8.0.0+  | Elegant terminal spinners |
| **Chalk**        | 5.0.0+  | Terminal colors           |
| **execa**        | 8.0.0+  | Better child_process      |
| **Zod**          | 3.22.0+ | Schema validation         |
| **node-fetch**   | 3.3.0+  | Fetch API for Node.js     |
| **diff**         | 5.2.0+  | Text diffing              |
| **semver**       | 7.6.0+  | Semantic versioning       |
| **fast-glob**    | 3.3.0+  | Fast file globbing        |

**CLI Architecture:**

```typescript
// packages/cli/src/index.ts
#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { addCommand } from './commands/add.js'
// ... more commands

const program = new Command()

program
  .name('aneka-ui')
  .description('CLI for installing Aneka UI components')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize Aneka UI in your project')
  .action(initCommand)

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('--all', 'Add all components')
  .option('--overwrite', 'Overwrite existing files')
  .option('--skip', 'Skip existing files')
  .action(addCommand)

// ... more commands

program.parse()
```

**Prompts Example:**

```typescript
import inquirer from "inquirer";
import chalk from "chalk";

export async function promptForConfig() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "style",
      message: "Which design style would you like to use?",
      choices: [
        { name: "Material Design", value: "material" },
        { name: "Apple HIG", value: "hig" },
        { name: "Samsung One UI", value: "oneui" },
      ],
    },
    {
      type: "input",
      name: "componentsPath",
      message: "Where should we install components?",
      default: "src/components/ui",
    },
  ]);

  return answers;
}
```

**Spinner Example:**

```typescript
import ora from "ora";

const spinner = ora("Installing dependencies...").start();

try {
  await installDependencies();
  spinner.succeed("Dependencies installed");
} catch (error) {
  spinner.fail("Failed to install dependencies");
  throw error;
}
```

---

## 🧪 Testing Stack

### Unit Testing

| Technology                   | Version | Purpose                   |
| ---------------------------- | ------- | ------------------------- |
| **Vitest**                   | Latest  | Fast unit testing         |
| **@testing-library/react**   | Latest  | React component testing   |
| **@testing-library/vue**     | Latest  | Vue component testing     |
| **@testing-library/angular** | Latest  | Angular component testing |
| **@vitest/coverage-v8**      | Latest  | Code coverage             |

**Configuration:**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});
```

**Example Test:**

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>)
    expect(container.firstChild).toHaveClass('bg-destructive')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
```

### Visual Regression Testing

| Technology           | Version | Purpose            |
| -------------------- | ------- | ------------------ |
| **Playwright**       | Latest  | Browser automation |
| **@playwright/test** | Latest  | Testing framework  |

**Configuration:**

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  use: {
    baseURL: "http://localhost:6006", // Storybook
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "pnpm storybook",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
  },
});
```

**Example Visual Test:**

```typescript
import { test, expect } from "@playwright/test";

test("button renders correctly", async ({ page }) => {
  await page.goto("/iframe.html?id=react-material-button--default");

  const button = page.locator("button");
  await expect(button).toHaveScreenshot("button-material-default.png");
});

test("button hover state", async ({ page }) => {
  await page.goto("/iframe.html?id=react-material-button--default");

  const button = page.locator("button");
  await button.hover();
  await expect(button).toHaveScreenshot("button-material-hover.png");
});
```

---

## 📝 Code Quality Stack

### Linting & Formatting

| Technology                           | Version | Purpose                       |
| ------------------------------------ | ------- | ----------------------------- |
| **ESLint**                           | 8.57.0+ | JavaScript/TypeScript linting |
| **@typescript-eslint/parser**        | Latest  | TypeScript parser for ESLint  |
| **@typescript-eslint/eslint-plugin** | Latest  | TypeScript rules              |
| **eslint-plugin-vue**                | Latest  | Vue linting                   |
| **eslint-plugin-import**             | Latest  | Import/export linting         |
| **Prettier**                         | 3.2.0+  | Code formatting               |
| **prettier-plugin-tailwindcss**      | Latest  | Tailwind class sorting        |

**ESLint Configuration:**

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }
    ]
  }
}
```

**Prettier Configuration:**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Git Hooks

| Technology      | Version | Purpose                     |
| --------------- | ------- | --------------------------- |
| **Husky**       | 9.0.0+  | Git hooks                   |
| **lint-staged** | 16.0.0+ | Run linters on staged files |

**Configuration:**

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

---

## 🏗️ Build Tools

### Build Stack

| Technology    | Version | Purpose                      |
| ------------- | ------- | ---------------------------- |
| **Turborepo** | Latest  | Monorepo build system        |
| **tsup**      | 8.0.0+  | TypeScript bundler (CLI)     |
| **tsc**       | Latest  | TypeScript compiler (tokens) |
| **Vite**      | Latest  | Frontend build tool          |
| **Astro**     | Latest  | Documentation site builder   |
| **Storybook** | 7.6.0+  | Component playground         |

**tsup Configuration (CLI):**

```typescript
// packages/cli/tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
});
```

---

## 🔄 Version Management

| Technology     | Version | Purpose                         |
| -------------- | ------- | ------------------------------- |
| **Changesets** | Latest  | Version management & changelogs |

**Configuration:**

```json
// .changeset/config.json
{
  "changelog": "@changesets/changelog-github",
  "commit": false,
  "linked": [],
  "access": "public",
  "baseBranch": "main"
}
```

**Workflow:**

```bash
# 1. Developer adds changeset
pnpm changeset

# 2. CI creates PR with version bumps
pnpm changeset version

# 3. Merge PR to trigger release
pnpm changeset publish
```

---

## 📚 Documentation Tools

| Technology                 | Version | Purpose              |
| -------------------------- | ------- | -------------------- |
| **Astro** or **VitePress** | Latest  | Documentation site   |
| **Storybook**              | 7.6.0+  | Component playground |
| **MDX**                    | Latest  | Markdown + JSX       |

---

## 🔐 Security Tools

| Technology     | Version       | Purpose            |
| -------------- | ------------- | ------------------ |
| **Dependabot** | GitHub native | Dependency updates |
| **pnpm audit** | Built-in      | Security audit     |
| **CodeQL**     | GitHub native | Code scanning      |

---

## 📊 Version Requirements Summary

### Minimum Versions

```json
{
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "vue": ">=3.3.0",
    "@angular/core": ">=17.0.0",
    "tailwindcss": ">=3.4.0",
    "typescript": ">=5.0.0"
  }
}
```

### Validation in CLI

```typescript
// packages/cli/src/utils/validate-versions.ts
import semver from "semver";

export function validateNodeVersion() {
  const nodeVersion = process.version;
  if (!semver.satisfies(nodeVersion, ">=18.0.0")) {
    throw new Error(
      `Node.js 18.0.0+ is required. You are using ${nodeVersion}`
    );
  }
}

export async function validatePackageVersions(cwd: string) {
  const pkg = JSON.parse(
    await fs.readFile(path.join(cwd, "package.json"), "utf-8")
  );

  // Check TypeScript
  const tsVersion =
    pkg.devDependencies?.typescript || pkg.dependencies?.typescript;
  if (tsVersion && !semver.satisfies(semver.coerce(tsVersion), ">=5.0.0")) {
    console.warn("⚠️  TypeScript 5.0.0+ is recommended");
  }

  // Check Tailwind
  const twVersion = pkg.devDependencies?.tailwindcss;
  if (!twVersion) {
    throw new Error("Tailwind CSS is required");
  }
  if (!semver.satisfies(semver.coerce(twVersion), ">=3.4.0")) {
    throw new Error("Tailwind CSS 3.4.0+ is required");
  }
}
```

---

## 📚 Related Specifications

- [Architecture](./architecture.md) - Project structure
- [CLI Specification](./cli-specification.md) - CLI implementation
- [Testing Requirements](./testing-requirements.md) - Testing strategy
- [Critical Requirements](./critical-requirements.md) - Non-negotiable rules

---

**This technology stack balances modern tooling with stability and developer experience.**
