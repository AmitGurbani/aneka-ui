# add

Add components to your project.

## Usage

```bash
aneka-ui add <component...>
```

## Examples

```bash
# Add single component
aneka-ui add button

# Add multiple components
aneka-ui add button card badge

# Add all components
aneka-ui add --all

# Overwrite existing files
aneka-ui add button --overwrite

# Skip existing files
aneka-ui add button --skip
```

## Options

| Option | Description |
|--------|-------------|
| `--all` | Add all available components |
| `--overwrite` | Overwrite existing files without asking |
| `--skip` | Skip existing files without asking |

## What It Does

1. Fetches component code from registry
2. Copies files to your project
3. Installs required dependencies
4. Handles file conflicts interactively

[← Back to CLI Overview](/cli/overview)
