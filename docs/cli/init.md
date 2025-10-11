# init

Initialize Aneka UI in your project.

## Usage

```bash
aneka-ui init
```

## Description

The `init` command sets up Aneka UI in your project by:

1. Detecting your framework (React, Vue, or Angular)
2. Detecting monorepo setup (pnpm, Lerna, Turborepo, Nx)
3. Prompting for design style preference
4. Creating configuration file
5. Setting up utility functions
6. Configuring path aliases

## Options

| Option    | Alias | Description                      |
| --------- | ----- | -------------------------------- |
| `--yes`   | `-y`  | Skip prompts and use defaults    |
| `--force` | `-f`  | Overwrite existing configuration |

## Examples

### Interactive Mode

```bash
aneka-ui init
```

This will prompt you for:

- Design style (Material, HIG, OneUI)
- Components directory location
- Tailwind config location

### Skip Prompts

```bash
aneka-ui init --yes
```

Uses default settings:

- Design style: Material Design
- Components: `src/components/ui`
- Tailwind: `tailwind.config.js`

### Force Overwrite

```bash
aneka-ui init --force
```

Overwrites existing `aneka-ui.json` without asking.

## What Gets Created

### Configuration File

`aneka-ui.json`:

```json
{
  "version": "1.0.0",
  "framework": "react",
  "style": "material",
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Utils File

`src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Updated tsconfig.json

Adds path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Framework Detection

The CLI automatically detects your framework from `package.json`:

- **React**: Checks for `react` dependency
- **Vue**: Checks for `vue` dependency
- **Angular**: Checks for `@angular/core` dependency

## Monorepo Detection

Supports multiple monorepo tools:

- **pnpm**: Looks for `pnpm-workspace.yaml`
- **Lerna**: Looks for `lerna.json`
- **Turborepo**: Looks for `turbo.json`
- **Nx**: Looks for `nx.json`

## Troubleshooting

### "Framework not detected"

Ensure you have a `package.json` with framework dependencies:

```bash
npm install react react-dom
# or
npm install vue
# or
npm install @angular/core
```

### "Not a valid project"

Run `init` from your project root (where `package.json` is located).

### "Tailwind not found"

Install Tailwind CSS first:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## Next Steps

After initialization:

1. [Add components](/cli/add) - Install your first components
2. [Configure colors](/guide/getting-started#step-4-configure-your-colors) - Set up your brand colors
3. [Browse components](/components/button) - See what's available
