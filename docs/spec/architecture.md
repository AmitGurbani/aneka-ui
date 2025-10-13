# Architecture & Project Structure

> **Specification Section:** Project Architecture
> **Last Updated:** October 2025

This document defines the complete monorepo structure, package organization, and architectural decisions for the Aneka UI project.

---

## 📁 Complete Project Structure

```
aneka-ui/
├── .github/                          # GitHub configuration
│   ├── workflows/                    # CI/CD workflows
│   │   ├── ci.yml                   # Lint, typecheck, build
│   │   ├── test.yml                 # Unit + visual tests
│   │   ├── deploy-docs.yml          # Deploy documentation
│   │   └── release.yml              # Publish packages
│   ├── ISSUE_TEMPLATE/              # Issue templates
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── component_request.md
│   └── PULL_REQUEST_TEMPLATE.md     # PR template
│
├── packages/                         # Workspace packages
│   ├── cli/                         # CLI package (@aneka-ui/cli)
│   │   ├── src/
│   │   │   ├── commands/            # CLI commands
│   │   │   │   ├── init.ts         # Initialize Aneka UI
│   │   │   │   ├── add.ts          # Add components
│   │   │   │   ├── list.ts         # List components
│   │   │   │   ├── diff.ts         # Show differences
│   │   │   │   ├── update.ts       # Update components
│   │   │   │   └── doctor.ts       # Diagnose issues
│   │   │   ├── utils/               # CLI utilities
│   │   │   │   ├── detect-package-manager.ts
│   │   │   │   ├── install-dependencies.ts
│   │   │   │   ├── validate-versions.ts
│   │   │   │   ├── handle-conflicts.ts
│   │   │   │   ├── detect-monorepo.ts
│   │   │   │   ├── fetch-registry.ts
│   │   │   │   ├── prompts.ts
│   │   │   │   └── logger.ts
│   │   │   ├── types/               # TypeScript types
│   │   │   │   ├── config.ts       # Config file types
│   │   │   │   ├── registry.ts     # Registry types
│   │   │   │   └── component.ts    # Component metadata
│   │   │   └── index.ts             # CLI entry point
│   │   ├── templates/               # Template files
│   │   │   ├── aneka-ui.json       # Config template
│   │   │   └── utils.ts             # Utils template (cn function)
│   │   ├── tests/                   # CLI tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts           # Build config
│   │   └── README.md
│   │
│   └── tokens/                      # Design tokens (@aneka-ui/tokens)
│       ├── src/
│       │   ├── material.ts         # Material Design tokens
│       │   ├── hig.ts              # Apple HIG tokens
│       │   ├── oneui.ts            # Samsung One UI tokens
│       │   └── index.ts             # Token exports
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── registry/                         # Component registry (not published)
│   ├── schema.json                  # Registry schema definition
│   ├── index.json                   # Component index
│   │
│   ├── react/                       # React components
│   │   ├── material/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── tooltip.tsx
│   │   ├── hig/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── tooltip.tsx
│   │   └── oneui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── dialog.tsx
│   │       └── tooltip.tsx
│   │
│   ├── vue/                         # Vue components
│   │   ├── material/
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   ├── Badge.vue
│   │   │   ├── Dialog.vue
│   │   │   └── Tooltip.vue
│   │   ├── hig/
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   ├── Badge.vue
│   │   │   ├── Dialog.vue
│   │   │   └── Tooltip.vue
│   │   └── oneui/
│   │       ├── Button.vue
│   │       ├── Card.vue
│   │       ├── Badge.vue
│   │       ├── Dialog.vue
│   │       └── Tooltip.vue
│   │
│   └── angular/                     # Angular components
│       ├── material/
│       │   ├── button.component.ts
│       │   ├── card.component.ts
│       │   ├── badge.component.ts
│       │   ├── dialog.component.ts
│       │   └── tooltip.component.ts
│       ├── hig/
│       │   ├── button.component.ts
│       │   ├── card.component.ts
│       │   ├── badge.component.ts
│       │   ├── dialog.component.ts
│       │   └── tooltip.component.ts
│       └── oneui/
│           ├── button.component.ts
│           ├── card.component.ts
│           ├── badge.component.ts
│           ├── dialog.component.ts
│           └── tooltip.component.ts
│
├── docs/                            # Documentation site (Astro or VitePress)
│   ├── src/                         # Documentation source
│   │   ├── pages/
│   │   │   ├── index.astro         # Home page
│   │   │   ├── docs/                # Documentation pages
│   │   │   │   ├── introduction.md
│   │   │   │   ├── installation.md
│   │   │   │   ├── cli.md
│   │   │   │   └── colors.md
│   │   │   └── components/          # Component docs
│   │   │       ├── button.mdx
│   │   │       ├── card.mdx
│   │   │       ├── badge.mdx
│   │   │       ├── dialog.mdx
│   │   │       └── tooltip.mdx
│   │   ├── components/              # Doc site components
│   │   ├── layouts/                 # Layout components
│   │   └── styles/                  # Doc site styles
│   ├── public/                      # Static assets
│   ├── astro.config.mjs            # Astro config
│   ├── package.json
│   └── tsconfig.json
│
├── storybook/                       # Storybook playground
│   ├── stories/                     # Component stories
│   │   ├── react/
│   │   │   ├── material/
│   │   │   ├── hig/
│   │   │   └── oneui/
│   │   ├── vue/
│   │   │   ├── material/
│   │   │   ├── hig/
│   │   │   └── oneui/
│   │   └── angular/
│   │       ├── material/
│   │       ├── hig/
│   │       └── oneui/
│   ├── .storybook/                 # Storybook config
│   │   ├── main.ts
│   │   ├── preview.ts
│   │   └── tailwind.config.js
│   └── package.json
│
├── examples/                        # Example applications
│   ├── react-app/                  # React example
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── vue-app/                    # Vue example
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── angular-app/                # Angular example
│       ├── src/
│       ├── package.json
│       └── angular.json
│
├── scripts/                         # Build scripts
│   ├── build-registry.ts           # Build registry JSON
│   ├── generate-component.ts       # Generate new component
│   └── validate-registry.ts        # Validate registry structure
│
├── tests/                          # Integration tests
│   ├── visual/                     # Visual regression tests (Playwright)
│   └── e2e/                        # E2E tests
│
├── .changeset/                     # Changesets for versioning
│   ├── config.json
│   └── README.md
│
├── .husky/                         # Git hooks
│   ├── pre-commit
│   └── pre-push
│
├── .vscode/                        # VS Code settings
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
│
├── pnpm-workspace.yaml             # pnpm workspace config
├── turbo.json                      # Turborepo config
├── tsconfig.json                   # Root TypeScript config
├── .eslintrc.json                  # ESLint config
├── .prettierrc                     # Prettier config
├── .editorconfig                   # Editor config
├── .gitignore                      # Git ignore patterns
├── .gitattributes                  # Git attributes
├── .nvmrc                          # Node version
├── package.json                    # Root package.json
├── LICENSE                         # MIT license
├── CONTRIBUTING.md                 # Contribution guide
├── CODE_OF_CONDUCT.md              # Code of conduct
├── SECURITY.md                     # Security policy
└── README.md                       # Project README
```

---

## 🏗️ Architectural Decisions

### 1. Monorepo Architecture

**Decision:** Use a monorepo with pnpm workspaces and Turborepo.

**Rationale:**

- **Shared Dependencies:** All packages use the same version of TypeScript, ESLint, etc.
- **Atomic Commits:** Change CLI and components together
- **Fast Builds:** Turborepo caching speeds up CI/CD
- **Simplified Development:** One repo to clone, one place for issues

**Configuration:**

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "docs"
  - "storybook"
  - "examples/*"
```

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "typecheck": {}
  }
}
```

### 2. Package Structure

#### CLI Package (`@aneka-ui/cli`)

**Purpose:** The command-line tool that users interact with.

**Key Features:**

- Not a dependency of user projects
- Users install globally: `npm install -g @aneka-ui/cli`
- Or run with npx: `npx @aneka-ui/cli init`
- Self-contained with all utilities

**Build Output:**

```
packages/cli/dist/
├── index.js         # Entry point (#!/usr/bin/env node)
├── commands/        # Command implementations
├── utils/           # Utility functions
└── types/           # TypeScript types
```

**Published to npm:** ✅ Yes

#### Tokens Package (`@aneka-ui/tokens`)

**Purpose:** Design tokens for Material/HIG/OneUI.

**Key Features:**

- Optional dependency (not required)
- Provides TypeScript types for tokens
- Can be used by advanced users for customization

**Build Output:**

```
packages/tokens/dist/
├── index.js         # All tokens
├── material.js      # Material Design only
├── hig.js           # Apple HIG only
└── oneui.js         # Samsung One UI only
```

**Published to npm:** ✅ Yes (optional for users)

#### Registry (Not Published)

**Purpose:** Source of truth for component code.

**Key Features:**

- NOT published to npm
- Hosted on GitHub
- CLI fetches from registry
- Users never interact directly

**Access:**

- CLI fetches via GitHub raw URLs
- Or from built registry CDN
- Fallback to local registry in monorepo

### 3. Registry Organization

**Structure:**

```
registry/
├── index.json              # Component metadata
├── schema.json             # JSON schema for validation
├── react/[style]/[name].tsx
├── vue/[style]/[Name].vue
└── angular/[style]/[name].component.ts
```

**Index Format (`index.json`):**

```json
[
  {
    "name": "button",
    "type": "component",
    "description": "Button component with multiple variants and sizes",
    "frameworks": ["react", "vue", "angular"],
    "styles": ["material", "hig", "oneui"],
    "dependencies": {
      "react": [
        "@radix-ui/react-slot",
        "class-variance-authority",
        "clsx",
        "tailwind-merge"
      ],
      "vue": ["class-variance-authority", "clsx", "tailwind-merge"],
      "angular": ["class-variance-authority", "clsx", "tailwind-merge"]
    },
    "files": {
      "react": {
        "material": "react/material/button.tsx",
        "hig": "react/hig/button.tsx",
        "oneui": "react/oneui/button.tsx"
      },
      "vue": {
        "material": "vue/material/Button.vue",
        "hig": "vue/hig/Button.vue",
        "oneui": "vue/oneui/Button.vue"
      },
      "angular": {
        "material": "angular/material/button.component.ts",
        "hig": "angular/hig/button.component.ts",
        "oneui": "angular/oneui/button.component.ts"
      }
    },
    "version": "0.1.0"
  }
]
```

### 4. Documentation Architecture

**Decision:** Use Astro or VitePress for documentation site.

**Site Structure:**

```
docs/
├── Getting Started
│   ├── Introduction
│   ├── Installation
│   └── Quick Start
├── CLI Reference
│   ├── init
│   ├── add
│   ├── list
│   ├── diff
│   ├── update
│   └── doctor
├── Components
│   ├── Button
│   ├── Card
│   ├── Badge
│   ├── Dialog
│   └── Tooltip
├── Design Systems
│   ├── Material Design
│   ├── Apple HIG
│   └── Samsung One UI
└── Guides
    ├── Customization
    ├── Colors
    └── Dark Mode
```

**Deployment:**

- GitHub Pages
- Auto-deploy on push to main
- Branch previews for PRs

### 5. Storybook Architecture

**Purpose:** Interactive component playground.

**Features:**

- All components from all frameworks
- All design systems side-by-side
- Interactive controls
- Dark mode toggle
- Responsive viewport testing

**Organization:**

```
storybook/stories/
├── react/
│   ├── material/
│   │   └── Button.stories.tsx
│   ├── hig/
│   └── oneui/
├── vue/
│   ├── material/
│   │   └── Button.stories.ts
│   ├── hig/
│   └── oneui/
└── angular/
    ├── material/
    │   └── button.stories.ts
    ├── hig/
    └── oneui/
```

### 6. Example Applications

**Purpose:** Demonstrate real-world usage.

**Structure:**

Each example app is a complete, standalone application:

```
examples/react-app/
├── src/
│   ├── components/
│   │   └── ui/              # Copied from registry
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── lib/
│   │   └── utils.ts          # cn helper
│   ├── App.tsx
│   └── main.tsx
├── aneka-ui.json             # Config file
├── tailwind.config.js        # With brand colors
└── package.json
```

---

## 🔄 Build System

### Turborepo Pipeline

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

### Build Commands

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @aneka-ui/cli build

# Watch mode for development
pnpm dev

# Clean and rebuild
pnpm clean && pnpm build
```

---

## 📦 Dependency Management

### Package Manager: pnpm

**Version:** 9.0+

**Rationale:**

- Fast, disk-efficient
- Strict dependency resolution
- Native workspace support
- Lockfile is deterministic

### Dependency Strategy

**Dev Dependencies (Root):**

- TypeScript
- ESLint + plugins
- Prettier
- Husky
- Vitest
- Playwright
- Turborepo

**Package Dependencies:**

- Each package declares its own dependencies
- Shared dependencies hoisted to root
- Peer dependencies for React/Vue/Angular

**Example (`packages/cli/package.json`):**

```json
{
  "dependencies": {
    "commander": "^12.0.0",
    "inquirer": "^9.2.0",
    "chalk": "^5.3.0",
    "ora": "^8.0.0",
    "execa": "^8.0.0",
    "zod": "^3.22.0",
    "node-fetch": "^3.3.0"
  },
  "devDependencies": {
    "tsup": "^8.0.0"
  }
}
```

---

## 🗂️ File Organization Principles

### 1. Framework-Specific Naming

**React:** Lowercase files

```
registry/react/material/button.tsx
registry/react/material/card.tsx
```

**Vue:** PascalCase files

```
registry/vue/material/Button.vue
registry/vue/material/Card.vue
```

**Angular:** Lowercase with suffix

```
registry/angular/material/button.component.ts
registry/angular/material/card.component.ts
```

### 2. Colocation

- Tests next to source files: `button.test.tsx`
- Stories next to components: `Button.stories.tsx`
- Types in same directory: `types.ts`

### 3. Barrel Exports

**Avoid barrel exports** in the registry to keep components independent.

❌ **Don't:**

```typescript
// registry/react/material/index.ts
export * from "./button";
export * from "./card";
```

✅ **Do:**

```typescript
// User imports directly
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

---

## 🔗 Cross-Package References

### TypeScript Project References

```json
// packages/cli/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [{ "path": "../tokens" }]
}
```

### Import Paths

```typescript
// From CLI package to tokens package
import { materialTokens } from "@aneka-ui/tokens/material";

// User imports (after copying components)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

---

## 📊 Registry Build Process

**Script:** `scripts/build-registry.ts`

**Process:**

1. Read all component files from `registry/`
2. Parse metadata (framework, style, dependencies)
3. Generate `registry/index.json`
4. Validate against `registry/schema.json`
5. Build dist version for CDN

**Output:**

```
registry/dist/
├── index.json
├── react/
│   ├── material/
│   │   ├── button.json      # Metadata + code as string
│   │   └── card.json
│   └── ...
└── ...
```

---

## 🔐 Security Considerations

### Registry Security

- **Read-Only:** Users never write to registry
- **HTTPS Only:** Fetch components over HTTPS
- **Integrity Checks:** Verify file hashes (future)
- **No Code Execution:** CLI never executes fetched code

### User Project Security

- **No Secrets:** Never commit API keys to registry
- **Dependency Scanning:** Dependabot enabled
- **Audit:** Regular `pnpm audit`

---

## 📚 Related Specifications

- [Overview & Philosophy](./overview.md) - Core principles
- [Technology Stack](./technology-stack.md) - Detailed tool choices
- [CLI Specification](./cli-specification.md) - CLI command flows
- [File Conventions](./file-conventions.md) - Naming and organization

---

**This architecture enables scalable, maintainable, and user-friendly component distribution.**
