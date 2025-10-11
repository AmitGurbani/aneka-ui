# CLI Overview

The Aneka UI CLI is a powerful command-line tool for managing components in your project.

## Installation

Install globally:

```bash
npm install -g @aneka-ui/cli
```

Or use with npx:

```bash
npx @aneka-ui/cli <command>
```

## Commands

### init

Initialize Aneka UI in your project.

```bash
aneka-ui init
```

[Learn more →](/cli/init)

### add

Add components to your project.

```bash
aneka-ui add button card badge
```

[Learn more →](/cli/add)

### list

List available and installed components.

```bash
aneka-ui list
aneka-ui list --installed
```

[Learn more →](/cli/list)

### diff

Show differences between local and registry components.

```bash
aneka-ui diff button
```

[Learn more →](/cli/diff)

### update

Update components to latest versions.

```bash
aneka-ui update --all
```

[Learn more →](/cli/update)

### doctor

Diagnose and fix setup issues.

```bash
aneka-ui doctor --fix
```

[Learn more →](/cli/doctor)

## Features

### Framework Detection

Automatically detects your framework (React, Vue, Angular) from `package.json`.

### Monorepo Support

Detects and supports:

- pnpm workspaces
- Lerna
- Turborepo
- Nx

### Package Manager Detection

Automatically uses your package manager:

- npm
- pnpm
- yarn
- bun

### Conflict Resolution

Handles file conflicts interactively:

- View differences
- Choose to overwrite or skip
- Preserve your customizations

### Dependency Management

Automatically installs required dependencies:

- Radix UI primitives
- Utility libraries
- Framework-specific packages

## Configuration

The CLI creates an `aneka-ui.json` file:

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

## Next Steps

- [init command](/cli/init) - Set up Aneka UI
- [add command](/cli/add) - Add components
- [Component docs](/components/button) - Browse components
