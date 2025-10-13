# File & Naming Conventions

> **Specification Section:** File Organization & Naming
> **Last Updated:** October 2025

This document defines all file naming conventions, directory structure, and code organization standards for the Aneka UI project.

---

## 🎯 Core Principles

1. **Framework-Specific Naming:** Each framework has its own conventions
2. **Consistency:** Same patterns across all components
3. **Discoverability:** File names match component names
4. **Predictability:** Easy to find and understand files

---

## 📁 Framework-Specific File Naming

### React Components

**Convention:** Lowercase with hyphens (kebab-case) for files

```
registry/react/material/
├── button.tsx              ✅ Correct
├── card.tsx                ✅ Correct
├── badge.tsx               ✅ Correct
├── dialog.tsx              ✅ Correct
└── tooltip.tsx             ✅ Correct

❌ WRONG:
├── Button.tsx              ❌ PascalCase (Vue convention)
├── button.component.tsx    ❌ Angular convention
└── button-component.tsx    ❌ Unnecessary suffix
```

**Rationale:**

- Matches shadcn/ui conventions
- Common in React ecosystem
- Easier to type (no Shift key)

**Export Pattern:**

```typescript
// button.tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...)
Button.displayName = "Button"
export { Button, buttonVariants }

// Usage in user's project
import { Button } from "@/components/ui/button"
```

### Vue Components

**Convention:** PascalCase for files

```
registry/vue/material/
├── Button.vue              ✅ Correct
├── Card.vue                ✅ Correct
├── Badge.vue               ✅ Correct
├── Dialog.vue              ✅ Correct
└── Tooltip.vue             ✅ Correct

❌ WRONG:
├── button.vue              ❌ lowercase (React convention)
├── button.component.vue    ❌ Unnecessary suffix
└── ButtonComponent.vue     ❌ Redundant
```

**Rationale:**

- Vue official style guide recommends PascalCase
- Matches single-file component best practices
- Distinguishes components from regular scripts

**Export Pattern:**

```vue
<!-- Button.vue -->
<script setup lang="ts">
// Component logic
</script>

<template>
  <button>
    <slot />
  </button>
</template>

<!-- Usage in user's project -->
<script setup>
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <Button>Click me</Button>
</template>
```

### Angular Components

**Convention:** Lowercase with `.component.ts` suffix

```
registry/angular/material/
├── button.component.ts     ✅ Correct
├── card.component.ts       ✅ Correct
├── badge.component.ts      ✅ Correct
├── dialog.component.ts     ✅ Correct
└── tooltip.component.ts    ✅ Correct

❌ WRONG:
├── button.ts               ❌ Missing suffix
├── ButtonComponent.ts      ❌ PascalCase file
├── Button.component.ts     ❌ Mixed case
└── button-component.ts     ❌ Hyphen in middle
```

**Rationale:**

- Angular CLI convention
- Distinguishes components from services/directives
- Standard in Angular ecosystem

**Export Pattern:**

```typescript
// button.component.ts
@Component({
  selector: 'aneka-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [class]="computedClass"><ng-content></ng-content></button>`
})
export class ButtonComponent {
  @Input() variant: ButtonVariants['variant'] = 'default'
  // ...
}

// Usage in user's project
import { ButtonComponent } from '@/components/ui/button.component'

@Component({
  template: `<aneka-button variant="primary">Click me</aneka-button>`
})
```

---

## 📂 Directory Structure Conventions

### Registry Organization

```
registry/
├── schema.json                     # JSON schema
├── index.json                      # Component index
│
├── react/                          # React components
│   ├── material/                   # Material Design
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── hig/                        # Apple HIG
│   │   └── ...
│   └── oneui/                      # Samsung One UI
│       └── ...
│
├── vue/                            # Vue components
│   ├── material/
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   └── ...
│   ├── hig/
│   │   └── ...
│   └── oneui/
│       └── ...
│
└── angular/                        # Angular components
    ├── material/
    │   ├── button.component.ts
    │   ├── card.component.ts
    │   └── ...
    ├── hig/
    │   └── ...
    └── oneui/
        └── ...
```

**Hierarchy:** `framework → style → component`

**Why this structure:**

- Easy to find: "I want React Material button" → `react/material/button.tsx`
- Clean separation by framework
- Parallel structure makes templates easier
- CLI can easily construct paths

### User Project Structure

After running `aneka-ui add button card`:

```
user-project/
├── src/
│   ├── components/
│   │   └── ui/                     # Aneka UI components
│   │       ├── button.tsx          # React
│   │       ├── card.tsx            # React
│   │       ├── Button.vue          # Vue
│   │       ├── Card.vue            # Vue
│   │       ├── button.component.ts # Angular
│   │       └── card.component.ts   # Angular
│   │
│   └── lib/
│       └── utils.ts                # cn() helper function
│
├── aneka-ui.json                   # Config file
└── tailwind.config.js
```

---

## 📝 Code Organization

### File Structure for Components

**React Component File:**

```typescript
// 1. Imports
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 2. Variants (CVA)
const buttonVariants = cva(
  "base-classes",
  { variants: { /* ... */ } }
)

// 3. TypeScript Types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// 4. Component Definition
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// 5. Display Name
Button.displayName = "Button"

// 6. Exports
export { Button, buttonVariants }
```

**Order Matters:**

1. Imports (external, then internal)
2. Variants and constants
3. Types and interfaces
4. Component definition
5. Display name
6. Exports

---

## 🏷️ Naming Conventions

### Component Names

| Type                  | Convention              | Example                            |
| --------------------- | ----------------------- | ---------------------------------- |
| **React Component**   | PascalCase              | `Button`, `CardHeader`             |
| **React File**        | kebab-case              | `button.tsx`, `card.tsx`           |
| **Vue Component**     | PascalCase              | `Button`, `CardHeader`             |
| **Vue File**          | PascalCase              | `Button.vue`, `Card.vue`           |
| **Angular Component** | PascalCase + Component  | `ButtonComponent`, `CardComponent` |
| **Angular File**      | kebab-case + .component | `button.component.ts`              |

### Variable Names

| Type                | Convention           | Example                          |
| ------------------- | -------------------- | -------------------------------- |
| **Variants (CVA)**  | camelCase + Variants | `buttonVariants`, `cardVariants` |
| **Props Interface** | PascalCase + Props   | `ButtonProps`, `CardProps`       |
| **Utils**           | camelCase            | `cn`, `formatDate`               |
| **Constants**       | UPPER_SNAKE_CASE     | `DEFAULT_TIMEOUT`, `MAX_RETRIES` |

### Function Names

| Type               | Convention                | Example                        |
| ------------------ | ------------------------- | ------------------------------ |
| **Components**     | PascalCase                | `Button`, `Card`               |
| **Hooks**          | camelCase + use prefix    | `useMediaQuery`, `useToast`    |
| **Utils**          | camelCase                 | `cn`, `formatDate`, `debounce` |
| **Event Handlers** | camelCase + handle prefix | `handleClick`, `handleSubmit`  |

---

## 📄 Compound Components

### Naming Pattern

For compound components (like Card), follow this pattern:

**React:**

```typescript
// All in one file: card.tsx
export const Card = ...
export const CardHeader = ...
export const CardTitle = ...
export const CardDescription = ...
export const CardContent = ...
export const CardFooter = ...
```

**Naming Convention:**

- Main component: `ComponentName` (e.g., `Card`)
- Sub-components: `ComponentNameSubComponent` (e.g., `CardHeader`, `CardTitle`)

**Do NOT:**

- ❌ `Card_Header` (underscores)
- ❌ `CardComponentHeader` (redundant Component)
- ❌ `Header` (too generic)

---

## 🔤 Import/Export Conventions

### Named Exports (Preferred)

```typescript
// ✅ GOOD: Named exports
export { Button, buttonVariants };

// Usage
import { Button } from "@/components/ui/button";
```

### No Default Exports

```typescript
// ❌ BAD: Default exports
export default Button;

// Problems:
// - Can be renamed on import
// - Harder to refactor
// - Inconsistent usage
```

### Barrel Exports (Avoid)

```typescript
// ❌ AVOID: Barrel exports in registry
// registry/react/material/index.ts
export * from "./button";
export * from "./card";

// Why avoid:
// - Users should import specific components
// - Keeps components independent
// - Better tree-shaking
```

---

## 📋 File Headers & Comments

### Component File Header

```typescript
/**
 * Material Design Button Component
 *
 * A button component with multiple variants and sizes following Material Design 3 guidelines.
 *
 * @example
 * <Button variant="default" size="lg">Click me</Button>
 *
 * @see https://aneka-ui.com/components/button
 */
```

### Variant Documentation

```typescript
const buttonVariants = cva(
  // Base classes - Applied to all variants
  "inline-flex items-center justify-center ...",
  {
    variants: {
      variant: {
        // Default variant - Primary action button
        default: "bg-primary text-primary-foreground ...",
        // Secondary variant - Secondary actions
        secondary: "bg-secondary text-secondary-foreground ...",
      },
    },
  }
);
```

---

## 🧪 Test File Conventions

### Test File Naming

**React:**

```
button.test.tsx              ✅ Next to component
button.test.ts               ✅ If no JSX
__tests__/button.test.tsx    ✅ In __tests__ folder
```

**Vue:**

```
Button.test.ts               ✅ PascalCase like component
__tests__/Button.test.ts     ✅ In __tests__ folder
```

**Angular:**

```
button.component.spec.ts     ✅ Angular convention
```

### Test Structure

```typescript
// button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      /* ... */
    });
  });

  describe("Variants", () => {
    it("applies default variant", () => {
      /* ... */
    });
  });

  describe("Refs", () => {
    it("forwards ref", () => {
      /* ... */
    });
  });
});
```

---

## 📚 Related Specifications

- [Architecture](./architecture.md) - Project structure
- [Components](./components.md) - Component specifications
- [Critical Requirements](./critical-requirements.md) - Non-negotiable rules

---

**Consistent file naming and organization make the codebase maintainable and predictable.**
