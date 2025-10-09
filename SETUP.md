# Aneka UI - Complete Setup Guide

This guide will help you complete the Aneka UI project setup and generate all remaining components.

## 📦 What's Already Generated

✅ **Core Infrastructure:**
- Root configuration (package.json, turbo.json, tsconfig, linting)
- pnpm workspace setup
- Build tooling

✅ **Packages:**
- `@aneka-ui/cli` - Complete CLI with all 6 commands
- `@aneka-ui/tokens` - Design system tokens for Material, HIG, OneUI

✅ **Registry:**
- Registry structure and schema
- Index configuration
- Sample React components (Material, HIG, OneUI Button variants)

✅ **Scripts:**
- `build-registry.ts` - Builds component registry
- `validate-registry.ts` - Validates component structure
- `generate-component.ts` - Generates new components

✅ **Documentation:**
- README.md with comprehensive project overview
- CONTRIBUTING.md with contribution guidelines
- CODE_OF_CONDUCT.md
- SECURITY.md
- LICENSE (MIT)

✅ **CI/CD:**
- GitHub Actions workflows (CI, Test, Release)
- Issue templates (Bug, Feature, Component)
- Pull request template

## 🚀 Next Steps

### 1. Install Dependencies

```bash
cd aneka-ui
pnpm install
```

### 2. Generate Remaining Components

The project currently has sample React Button components. To complete all 45 components (5 components × 3 styles × 3 frameworks), use the generator script:

#### Generate All Material Design Components

```bash
# Generate remaining React Material components
pnpm tsx scripts/generate-component.ts card
pnpm tsx scripts/generate-component.ts badge
pnpm tsx scripts/generate-component.ts dialog
pnpm tsx scripts/generate-component.ts tooltip
```

When prompted:
- Select framework: **React**
- Select style: **Material Design**
- Component type: Choose based on component complexity

#### Generate HIG (Apple) Components

```bash
# For each component (button, card, badge, dialog, tooltip)
pnpm tsx scripts/generate-component.ts <component-name>
```

Select:
- Framework: **React**
- Style: **Apple HIG**

#### Generate One UI Components

```bash
# For each component
pnpm tsx scripts/generate-component.ts <component-name>
```

Select:
- Framework: **React**
- Style: **Samsung One UI**

#### Generate Vue Components

```bash
# For each component and style
pnpm tsx scripts/generate-component.ts <component-name>
```

Select:
- Framework: **Vue**
- Style: **Material Design / HIG / OneUI**

#### Generate Angular Components

```bash
# For each component and style
pnpm tsx scripts/generate-component.ts <component-name>
```

Select:
- Framework: **Angular**
- Style: **Material Design / HIG / OneUI**

### 3. Customize Generated Components

After generation, customize each component with design system-specific characteristics:

#### Material Design (Google)
```typescript
// Characteristics:
- uppercase text
- 4px border radius (rounded-[4px])
- 200ms transitions (duration-200)
- Standard easing (ease-[cubic-bezier(0.4,0,0.2,1)])
- Elevation shadows (shadow-[0_2px_4px_rgba(0,0,0,0.1)])
```

#### Apple HIG
```typescript
// Characteristics:
- Sentence case text
- 6px border radius (rounded-md)
- 150ms transitions (duration-150)
- Spring-like easing (ease-[cubic-bezier(0.36,0,0.66,-0.56)])
- Scale on press (active:scale-[0.98])
- Subtle shadows (shadow-[0_2px_6px_rgba(0,0,0,0.1)])
```

#### Samsung One UI
```typescript
// Characteristics:
- Bold text (font-semibold)
- 16px border radius (rounded-2xl)
- 250ms transitions (duration-250)
- Smooth easing (ease-[cubic-bezier(0.33,0,0.2,1)])
- Prominent shadows (shadow-[0_4px_12px_rgba(0,0,0,0.1)])
```

### 4. Add Component Dependencies

Update `scripts/build-registry.ts` with dependencies for new components:

```typescript
const COMPONENT_DEPENDENCIES = {
  card: {
    deps: ["clsx", "tailwind-merge"],
  },
  dialog: {
    deps: [
      "@radix-ui/react-dialog",  // React
      "radix-vue",               // Vue
      "@angular/cdk",            // Angular
      "lucide-react",
      "clsx",
      "tailwind-merge"
    ],
  },
  // ... add more
};
```

### 5. Update Component Descriptions

In `scripts/build-registry.ts`:

```typescript
const COMPONENT_DESCRIPTIONS = {
  button: "Button component with multiple variants and sizes",
  card: "Card container with header, content, and footer sections",
  // ... add descriptions for all components
};
```

### 6. Build the Registry

```bash
# Build component registry JSON files
pnpm build:registry

# Validate registry structure
pnpm validate:registry
```

### 7. Build Packages

```bash
# Build all packages
pnpm build
```

### 8. Test the CLI

```bash
# Link CLI for local testing
cd packages/cli
pnpm link --global

# Test in a sample project
cd /path/to/test-project
aneka-ui init
aneka-ui add button
```

## 📁 Component File Reference

### React Component Template

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: { /* ... */ },
    defaultVariants: { /* ... */ },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ className }))}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component, componentVariants };
```

### Vue Component Template

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  "base-classes",
  {
    variants: { /* ... */ },
    defaultVariants: { /* ... */ },
  }
);

type ComponentVariants = VariantProps<typeof componentVariants>;

interface Props extends ComponentVariants {
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const classes = computed(() =>
  cn(componentVariants({ variant: props.variant }), props.class)
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

### Angular Component Template

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  "base-classes",
  {
    variants: { /* ... */ },
    defaultVariants: { /* ... */ },
  }
);

type ComponentVariants = VariantProps<typeof componentVariants>;

@Component({
  selector: 'aneka-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  `,
})
export class ComponentComponent {
  @Input() variant: ComponentVariants['variant'] = 'default';
  @Input() class?: string;

  get computedClass(): string {
    return cn(componentVariants({ variant: this.variant }), this.class);
  }
}
```

## 🎨 Design Token Reference

Use tokens from `@aneka-ui/tokens` for consistency:

```typescript
import { materialTokens } from '@aneka-ui/tokens/material';

// Spacing
materialTokens.spacing.md // "1.5rem"

// Radius
materialTokens.radius.sm // "0.25rem"

// Shadows
materialTokens.shadows[2] // "0 2px 4px..."

// Motion
materialTokens.motion.duration.base // "200ms"
materialTokens.motion.easing.standard // "cubic-bezier(...)"
```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
pnpm test

# Visual regression tests
pnpm test:visual

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

### Add Tests for New Components

Create test files in `packages/*/tests/` or component-level test files.

## 📚 Documentation Site (Future)

The `docs/` directory is prepared for Astro-based documentation:

```bash
cd docs
pnpm install
pnpm dev
```

## 🎭 Storybook (Future)

The `storybook/` directory is prepared for component playground:

```bash
cd storybook
pnpm install
pnpm storybook
```

## 🔧 Troubleshooting

### Issue: Components not found
**Solution:** Run `pnpm build:registry` to generate registry JSON files

### Issue: Type errors in CLI
**Solution:** Run `pnpm build` in packages/cli

### Issue: Missing dependencies
**Solution:** Run `pnpm install` in root directory

### Issue: Registry validation fails
**Solution:** Check component file naming matches framework conventions

## 📝 Component Checklist

For each component, ensure:

- [ ] Component file created in all 3 frameworks
- [ ] Component file created in all 3 styles (9 files total per component)
- [ ] Component uses correct design tokens
- [ ] Component has TypeScript types
- [ ] React components use `forwardRef` and `displayName`
- [ ] Vue components use Composition API
- [ ] Angular components are standalone
- [ ] Dependencies added to `COMPONENT_DEPENDENCIES`
- [ ] Description added to `COMPONENT_DESCRIPTIONS`
- [ ] Component added to `registry/index.json`
- [ ] Tests written
- [ ] Documentation created

## 🎯 Completion Status

**Total Components Needed:** 45 (5 components × 3 styles × 3 frameworks)

**Currently Generated:**
- ✅ React Material Button
- ✅ React Material Card
- ✅ React Material Badge
- ✅ React Material Dialog
- ✅ React Material Tooltip
- ✅ React HIG Button
- ✅ React OneUI Button

**Remaining:** Use the generator script to create the remaining 38 component files.

## 🚀 Quick Start Command Sequence

```bash
# 1. Install dependencies
pnpm install

# 2. Build packages
pnpm build

# 3. Generate missing components (repeat for each)
pnpm tsx scripts/generate-component.ts <component-name>

# 4. Build registry
pnpm build:registry

# 5. Validate
pnpm validate:registry

# 6. Test CLI
cd packages/cli && pnpm link --global

# 7. Run tests
pnpm test

# 8. Commit
git add .
git commit -m "feat: complete component library"
```

## 📞 Need Help?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines
- Review component examples in `registry/react/material/`
- Run `pnpm tsx scripts/generate-component.ts --help`

---

**Happy building! 🎉**
