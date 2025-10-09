# Aneka UI Storybook

Interactive component documentation and playground for Aneka UI.

## Overview

This Storybook workspace showcases all components from the Aneka UI registry across three design systems:
- **Material Design** - Google's Material Design 3
- **Apple HIG** - Apple's Human Interface Guidelines
- **Samsung One UI** - Samsung's One UI design language

## Development

```bash
# Start Storybook dev server
pnpm dev

# Build static Storybook
pnpm build

# Preview production build
pnpm preview
```

Visit [http://localhost:6006](http://localhost:6006) to view Storybook.

## Component Syncing

Components in `src/components/` are **synced copies** from the registry (`/registry/react/`). This is intentional and follows the project's copy-paste philosophy.

### Why Duplicate Files?

The registry is a source template directory, not an npm package. Components need to:
1. Access dependencies installed in the storybook workspace
2. Work with Vite's build system without complex path resolution
3. Maintain the copy-paste pattern that end users will experience

### Keeping Components in Sync

When you update components in the registry, sync them to Storybook:

```bash
# From project root
pnpm sync:storybook
```

This copies all components from `/registry/react/` to `/storybook/src/components/`.

## Adding New Components

1. Add component to registry: `/registry/react/{material|hig|oneui}/`
2. Run sync script: `pnpm sync:storybook`
3. Create story file in: `/storybook/src/stories/{material|hig|oneui}/ComponentName.stories.tsx`

## Story Structure

Stories import from local components:

```tsx
import { Button } from '@/components/material/button';
```

Each story should showcase:
- Default variant
- All variants (default, secondary, destructive, outline, ghost, link)
- All sizes (sm, default, lg, icon)
- Disabled state
- Interactive examples

## Design System Comparison

Storybook makes it easy to compare how the same component looks across different design systems. Each component has stories in all three design system folders.
