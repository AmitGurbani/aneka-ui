# @aneka-ui/cli

CLI for installing and managing Aneka UI components.

## Installation

```bash
npm install -g @aneka-ui/cli
# or
pnpm add -g @aneka-ui/cli
```

## Usage

### Initialize Aneka UI

```bash
aneka-ui init
```

This will:
1. Detect your framework (React, Vue, or Angular)
2. Detect if you're in a monorepo
3. Prompt for design system style (Material, HIG, or OneUI)
4. Create `aneka-ui.json` configuration
5. Update `tsconfig.json` with path aliases
6. Create utility functions

### Add Components

```bash
# Add specific components
aneka-ui add button card

# Add all components
aneka-ui add --all

# Overwrite existing files
aneka-ui add button --overwrite

# Skip existing files
aneka-ui add button --skip
```

### List Components

```bash
# List all available components
aneka-ui list

# List only installed components
aneka-ui list --installed

# List only available (not installed) components
aneka-ui list --available
```

### Show Diff

```bash
# Compare local version with registry
aneka-ui diff button
```

### Update Components

```bash
# Update specific components
aneka-ui update button card

# Update all components
aneka-ui update --all

# Skip confirmation prompts
aneka-ui update --all --force
```

### Diagnose Issues

```bash
# Run diagnostics
aneka-ui doctor

# Attempt to fix issues
aneka-ui doctor --fix
```

## Configuration

The `aneka-ui.json` file in your project root controls component installation:

```json
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
```

## License

MIT
