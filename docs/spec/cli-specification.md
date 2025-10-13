# CLI Specification

> **Specification Section:** CLI Commands
> **Last Updated:** October 2025

This document defines the complete specification for all 6 CLI commands in the Aneka UI CLI tool.

---

## 🎯 CLI Overview

**Package:** `@aneka-ui/cli`
**Binary Name:** `aneka-ui`
**Installation:**

```bash
npm install -g @aneka-ui/cli  # Global
npx @aneka-ui/cli init         # One-time use
```

**Commands:**

1. `init` - Initialize Aneka UI in a project
2. `add` - Add components to project
3. `list` - List available components
4. `diff` - Show differences between versions
5. `update` - Update components to latest
6. `doctor` - Diagnose and fix issues

---

## 1️⃣ init Command

### Purpose

Initialize Aneka UI in an existing project.

### Syntax

```bash
aneka-ui init [options]
```

### Options

- `--yes, -y` - Skip prompts, use defaults
- `--style <style>` - Design style (material/hig/oneui)
- `--components-path <path>` - Component directory
- `--utils-path <path>` - Utils directory
- `--cwd <path>` - Working directory

### Complete Flow

```
1. Validate Environment
   ├─ Check Node.js >= 18.0.0
   ├─ Check TypeScript >= 5.0.0
   ├─ Check Tailwind CSS >= 3.4.0
   └─ Check package.json exists

2. Detect Framework
   ├─ Read package.json dependencies
   ├─ Check for react, vue, or @angular/core
   └─ Error if no framework found

3. Detect Monorepo (if applicable)
   ├─ Check for pnpm-workspace.yaml
   ├─ Check for lerna.json
   ├─ Check for turbo.json
   ├─ Check for nx.json
   └─ If found:
       ├─ Parse workspace packages
       ├─ Show interactive list
       └─ Let user select target package

4. Prompt for Configuration
   ├─ Style: Material/HIG/OneUI (list prompt)
   ├─ Components Path (input, default: src/components/ui)
   ├─ Utils Path (input, default: src/lib/utils)
   └─ Skip if --yes flag

5. Create Config File (aneka-ui.json)
   {
     "$schema": "https://aneka-ui.com/schema.json",
     "framework": "react",
     "style": "material",
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils"
     },
     "tailwind": {
       "config": "tailwind.config.js",
       "css": "src/app/globals.css"
     }
   }

6. Update tsconfig.json
   ├─ Add path aliases
   {
     "compilerOptions": {
       "paths": {
         "@/components/*": ["./src/components/*"],
         "@/lib/*": ["./src/lib/*"]
       }
     }
   }

7. Create Directories
   ├─ Create components directory
   └─ Create utils directory

8. Install Utils File (lib/utils.ts)
   import { type ClassValue, clsx } from "clsx"
   import { twMerge } from "tailwind-merge"

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }

9. Install Dependencies
   ├─ Detect package manager (npm/pnpm/yarn/bun)
   ├─ Install: clsx, tailwind-merge, class-variance-authority
   └─ Show success message

10. Show Next Steps
    ✓ Aneka UI initialized!

    Next steps:
    1. Add your brand colors to tailwind.config.js
    2. Run: aneka-ui add button card
    3. Import and use components in your app
```

### Error Handling

| Error               | Message                    | Resolution                  |
| ------------------- | -------------------------- | --------------------------- |
| No package.json     | `package.json not found`   | Run in project root         |
| Node < 18           | `Node.js 18.0.0+ required` | Upgrade Node.js             |
| No framework        | `No framework detected`    | Install React/Vue/Angular   |
| No Tailwind         | `Tailwind CSS required`    | Install Tailwind            |
| Already initialized | `aneka-ui.json exists`     | Use --force to reinitialize |

---

## 2️⃣ add Command

### Purpose

Add components to the project.

### Syntax

```bash
aneka-ui add [components...] [options]
```

### Options

- `--all` - Add all available components
- `--overwrite` - Overwrite existing files without prompting
- `--skip` - Skip existing files without prompting
- `--cwd <path>` - Working directory

### Examples

```bash
aneka-ui add button           # Add single component
aneka-ui add button card badge # Add multiple
aneka-ui add --all            # Add all components
aneka-ui add button --overwrite # Force overwrite
```

### Complete Flow

```
1. Read Config
   ├─ Load aneka-ui.json
   ├─ Error if not found (suggest: aneka-ui init)
   └─ Extract framework, style, paths

2. Resolve Components
   ├─ If --all: fetch all components from registry
   ├─ Else: use provided component names
   └─ Validate component names exist

3. Fetch Registry
   ├─ Fetch from: https://registry.aneka-ui.com/index.json
   ├─ Or use local registry (development)
   └─ Filter by framework and style

4. For Each Component:

   4a. Check If File Exists
       ├─ Check: components-path/[component].tsx
       └─ If exists and no --overwrite/--skip:
           ├─ Show interactive prompt:
           │   ? button.tsx already exists. What would you like to do?
           │   ❯ Overwrite
           │     Skip
           │     Show diff
           │     Cancel
           │
           └─ Handle selection:
               ├─ Overwrite: proceed with copy
               ├─ Skip: skip this component
               ├─ Show diff: display diff, then re-prompt
               └─ Cancel: exit command

   4b. Fetch Component Code
       ├─ Fetch from registry: [framework]/[style]/[component].tsx
       └─ Handle fetch errors

   4c. Process Imports
       ├─ Replace "@/lib/utils" with user's utils alias
       ├─ Replace "@/components" with user's component alias
       └─ Keep other imports as-is

   4d. Write Component File
       ├─ Create parent directories if needed
       ├─ Write file to components-path
       └─ Show: ✓ Added button.tsx

   4e. Extract Dependencies
       ├─ Parse imports from component code
       ├─ Determine required packages:
       │   - @radix-ui/react-* (React)
       │   - radix-vue (Vue)
       │   - @angular/cdk (Angular)
       │   - class-variance-authority
       │   - clsx
       │   - tailwind-merge
       └─ Build dependency list

5. Install Dependencies
   ├─ Detect package manager
   ├─ Check which deps are already installed
   ├─ If new deps needed:
   │   ├─ Show: Installing dependencies: @radix-ui/react-dialog...
   │   ├─ Run: npm install [packages]
   │   └─ Show: ✓ Dependencies installed
   └─ Skip if all deps already installed

6. Show Success Summary
   ✓ Added 3 components:
     - button.tsx
     - card.tsx
     - badge.tsx

   ✓ Installed dependencies:
     - @radix-ui/react-slot
     - class-variance-authority

   Ready to use! Import with:
   import { Button } from "@/components/ui/button"
```

### Conflict Handling

**Interactive Prompt** (when file exists):

```
? components/ui/button.tsx already exists. What would you like to do? (Use arrow keys)
❯ Overwrite - Replace with latest version
  Skip - Keep existing file
  Show diff - Compare versions
  Cancel - Exit command
```

**Diff Display:**

```diff
--- components/ui/button.tsx (current)
+++ components/ui/button.tsx (new)
@@ -10,7 +10,7 @@
- shadow-md hover:shadow-lg
+ shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]
```

---

## 3️⃣ list Command

### Purpose

List all available components with their status.

### Syntax

```bash
aneka-ui list [options]
```

### Options

- `--style <style>` - Filter by style (material/hig/oneui)
- `--installed` - Show only installed components
- `--available` - Show only not-yet-installed components

### Output Example

```
Aneka UI Components (Material Design)

NAME      STATUS      DESCRIPTION
button    installed   Button component with multiple variants
card      installed   Card container with header, content, footer
badge     installed   Badge component for labels and status
dialog    available   Modal dialog with overlay
tooltip   available   Tooltip with hover and keyboard support

Installed: 3 | Available: 2 | Total: 5

Run: aneka-ui add <component> to install
```

### Detailed View

```bash
aneka-ui list button  # Show details for specific component
```

Output:

```
button - Button component with multiple variants and sizes

Status: Installed
Framework: React
Style: Material Design
Version: 0.1.0 (latest)
File: src/components/ui/button.tsx

Variants:
  - default, secondary, destructive, outline, ghost, link

Sizes:
  - default, sm, lg, icon

Dependencies:
  - @radix-ui/react-slot
  - class-variance-authority
  - clsx
  - tailwind-merge

Usage:
  import { Button } from "@/components/ui/button"
  <Button variant="default">Click me</Button>
```

---

## 4️⃣ diff Command

### Purpose

Show differences between local and registry versions.

### Syntax

```bash
aneka-ui diff <component>
```

### Example

```bash
aneka-ui diff button
```

### Output

```
Comparing button.tsx

Local:  version 0.1.0
Registry: version 0.2.0

Changes:
  - Added new "loading" prop
  - Updated shadow values for better Material Design compliance
  - Fixed TypeScript types for better inference

Diff:
--- components/ui/button.tsx (local)
+++ components/ui/button.tsx (registry)
@@ -15,6 +15,7 @@
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
+ loading?: boolean;
}

@@ -23,7 +24,7 @@
- shadow-md hover:shadow-lg
+ shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]

Run: aneka-ui update button
```

---

## 5️⃣ update Command

### Purpose

Update components to latest versions.

### Syntax

```bash
aneka-ui update [components...] [options]
```

### Options

- `--all` - Update all components
- `--force` - Update without confirmation
- `--dry-run` - Show what would be updated without making changes

### Examples

```bash
aneka-ui update button        # Update single component
aneka-ui update --all         # Update all
aneka-ui update --all --dry-run  # Preview updates
```

### Flow

```
1. Read Config & Scan Components
   ├─ Load aneka-ui.json
   ├─ Scan components directory
   └─ Build list of installed components

2. Check for Updates
   ├─ Fetch registry versions
   ├─ Compare with local versions (from file comments or metadata)
   └─ Build update list

3. Show Update Summary
   Updates available:

   NAME     CURRENT   LATEST    CHANGES
   button   0.1.0     0.2.0     + loading prop, shadow fixes
   card     0.1.0     0.1.5     TypeScript improvements

   2 components can be updated

4. Confirm (unless --force)
   ? Update 2 components? (Y/n)

5. For Each Component:
   ├─ Show diff (like aneka-ui diff)
   ├─ Backup current file (.backup extension)
   ├─ Fetch latest version
   ├─ Write updated file
   ├─ Check for new dependencies
   └─ Show: ✓ Updated button.tsx (0.1.0 → 0.2.0)

6. Install New Dependencies (if any)
   └─ Run package manager install

7. Show Summary
   ✓ Updated 2 components

   Backups saved:
     - components/ui/button.tsx.backup
     - components/ui/card.tsx.backup

   New dependencies installed:
     - @radix-ui/react-spinner

   Your components are now up to date!
```

---

## 6️⃣ doctor Command

### Purpose

Diagnose and fix common issues.

### Syntax

```bash
aneka-ui doctor [options]
```

### Options

- `--fix` - Automatically fix issues where possible

### Checks Performed

```
1. Environment Checks
   ├─ Node.js version >= 18.0.0
   ├─ Package manager detected
   └─ Git repository (optional)

2. Configuration Checks
   ├─ aneka-ui.json exists
   ├─ aneka-ui.json is valid JSON
   ├─ Config matches schema
   └─ Paths in config exist

3. Framework Checks
   ├─ Framework dependency installed
   ├─ Framework version meets minimum
   └─ Framework matches config

4. Tailwind Checks
   ├─ Tailwind CSS installed
   ├─ Tailwind version >= 3.4.0
   ├─ tailwind.config.js exists
   └─ Colors configured (warning if not)

5. TypeScript Checks
   ├─ TypeScript installed
   ├─ TypeScript version >= 5.0.0
   ├─ tsconfig.json exists
   └─ Path aliases configured

6. Component Checks
   ├─ Components directory exists
   ├─ Utils file exists
   ├─ All components valid
   └─ No missing dependencies

7. Dependency Checks
   ├─ All required deps installed
   ├─ Check for outdated deps
   └─ Check for security issues (pnpm audit)
```

### Output Example

```
Running diagnostics...

Environment ✓
  ✓ Node.js 20.0.0
  ✓ pnpm 9.5.0
  ✓ Git repository

Configuration ✓
  ✓ aneka-ui.json found
  ✓ Valid JSON
  ✓ Schema valid
  ✓ Paths exist

Framework ✓
  ✓ React 18.3.0 installed
  ✓ Meets minimum version

Tailwind CSS ✓
  ✓ Tailwind 3.4.1 installed
  ✓ Config file found
  ⚠ No custom colors defined (recommend adding brand colors)

TypeScript ✓
  ✓ TypeScript 5.3.3 installed
  ✓ tsconfig.json found
  ✓ Path aliases configured

Components ✓
  ✓ Components directory exists
  ✓ Utils file exists
  ✓ 3 components installed
  ✓ All dependencies installed

Issues: 0 errors, 1 warning

⚠ Warning: No custom colors in Tailwind config
  └─ Suggestion: Add your brand colors to tailwind.config.js
```

### Auto-Fix Example

```bash
aneka-ui doctor --fix
```

```
Running diagnostics with auto-fix...

✗ Utils file missing
  └─ Fixing: Creating lib/utils.ts... ✓

✗ Path aliases not configured
  └─ Fixing: Adding paths to tsconfig.json... ✓

✗ Missing dependency: clsx
  └─ Fixing: Installing clsx... ✓

All issues fixed!
```

---

## 🔧 Config File Format

### aneka-ui.json

```json
{
  "$schema": "https://aneka-ui.com/schema.json",
  "framework": "react" | "vue" | "angular",
  "style": "material" | "hig" | "oneui",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css"
  },
  "typescript": {
    "config": "tsconfig.json"
  }
}
```

### Schema Validation

The CLI uses Zod for runtime validation:

```typescript
import { z } from "zod";

export const configSchema = z.object({
  $schema: z.string().optional(),
  framework: z.enum(["react", "vue", "angular"]),
  style: z.enum(["material", "hig", "oneui"]),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
  }),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
  }),
  typescript: z
    .object({
      config: z.string(),
    })
    .optional(),
});

export type Config = z.infer<typeof configSchema>;
```

---

## 📚 Related Specifications

- [Architecture](./architecture.md) - CLI package structure
- [Technology Stack](./technology-stack.md) - CLI tooling
- [Critical Requirements](./critical-requirements.md) - CLI requirements

---

**This CLI provides a seamless, user-friendly experience for managing Aneka UI components.**
