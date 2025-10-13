# Getting Started with Aneka UI

Complete guide to getting started with Aneka UI, whether you're a user installing components or a contributor building the project.

---

## 🚀 For End Users

### Installation

Install the Aneka UI CLI globally:

```bash
npm install -g @aneka-ui/cli
# or
pnpm add -g @aneka-ui/cli
# or
yarn global add @aneka-ui/cli
```

### Initialize in Your Project

Navigate to your project directory and initialize Aneka UI:

```bash
cd your-project
aneka-ui init
```

The CLI will prompt you for:

- **Framework:** React, Vue, or Angular
- **Design Style:** Material Design, Apple HIG, or Samsung One UI
- **Component Directory:** Where to install components (default: `src/components/ui`)
- **Utils Directory:** Where to install utilities (default: `src/lib/utils`)

The CLI will:

- Detect your framework automatically
- Detect monorepo setup (if applicable)
- Create `aneka-ui.json` configuration file
- Set up TypeScript path aliases
- Install the `cn()` utility function

### Add Components

Install components to your project:

```bash
# Install specific components
aneka-ui add button card badge

# Install all components
aneka-ui add --all
```

The CLI will:

- Copy component files to your project
- Auto-install required dependencies
- Handle file conflicts (prompt to overwrite/skip)

### Use Components

Import and use components in your application:

**React:**

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

**Vue:**

```vue
<script setup>
import Button from "@/components/ui/Button.vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card.vue";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Welcome</CardTitle>
    </CardHeader>
    <CardContent>
      <Button variant="default">Click me</Button>
    </CardContent>
  </Card>
</template>
```

**Angular:**

```typescript
import { Component } from "@angular/core";
import { ButtonComponent } from "@/components/ui/button.component";
import { CardComponent } from "@/components/ui/card.component";

@Component({
  selector: "app-my-component",
  imports: [ButtonComponent, CardComponent],
  template: `
    <aneka-card>
      <aneka-card-header>
        <h2>Welcome</h2>
      </aneka-card-header>
      <aneka-card-content>
        <aneka-button variant="default">Click me</aneka-button>
      </aneka-card-content>
    </aneka-card>
  `,
})
export class MyComponent {}
```

### Configure Your Brand Colors

Add your brand colors to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // Your primary brand color
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        // Add more colors as needed
      },
    },
  },
};
```

### CLI Commands Reference

| Command                           | Description                         |
| --------------------------------- | ----------------------------------- |
| `aneka-ui init`                   | Initialize Aneka UI in your project |
| `aneka-ui add <components...>`    | Add components to your project      |
| `aneka-ui list`                   | List available components           |
| `aneka-ui diff <component>`       | Show differences between versions   |
| `aneka-ui update [components...]` | Update components to latest         |
| `aneka-ui doctor`                 | Diagnose and fix issues             |

---

## 🛠️ For Contributors

### Prerequisites

- **Node.js:** 18.0.0 or higher
- **pnpm:** 9.0.0 or higher
- **Git:** Latest version

### Clone and Setup

```bash
# 1. Clone the repository
git clone https://github.com/AmitGurbani/aneka-ui.git
cd aneka-ui

# 2. Install dependencies
pnpm install

# 3. Build all packages
pnpm build

# 4. Link CLI for local testing
cd packages/cli
pnpm link --global
cd ../..
```

### Project Structure

```
aneka-ui/
├── packages/              # Workspace packages
│   ├── cli/              # CLI tool (@aneka-ui/cli)
│   └── tokens/           # Design tokens (@aneka-ui/tokens)
├── registry/             # Component registry
│   ├── react/           # React components
│   ├── vue/             # Vue components
│   └── angular/         # Angular components
├── docs/                 # Documentation site
├── storybook/            # Component playground
├── examples/             # Example applications
├── scripts/              # Build and utility scripts
│   ├── build-registry.ts
│   ├── generate-component.ts
│   └── validate-registry.ts
└── tests/                # Integration tests
```

### Development Workflow

```bash
# Start development mode
pnpm dev

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run visual regression tests
pnpm test:visual

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck

# Build packages
pnpm build

# Build registry
pnpm build:registry

# Validate registry
pnpm validate:registry
```

### Component Generation

The project is complete with all 45 components (5 components × 3 design systems × 3 frameworks). To generate additional components:

```bash
# Generate a new component
pnpm tsx scripts/generate-component.ts <component-name>
```

The generator will prompt you for:

- Framework (React/Vue/Angular)
- Design style (Material/HIG/OneUI)
- Component type (basic/compound/complex)

### Design System Guidelines

#### Material Design (Google)

- Uppercase text with letter spacing
- 4px border radius (`rounded-[4px]`)
- Elevation shadows (`shadow-[0_2px_4px_rgba(0,0,0,0.1)]`)
- 200ms transitions (`duration-200`)
- Standard easing (`ease-[cubic-bezier(0.4,0,0.2,1)]`)

#### Apple HIG

- Sentence case text
- 6-12px border radius (`rounded-md` to `rounded-xl`)
- Subtle shadows (`shadow-[0_2px_6px_rgba(0,0,0,0.1)]`)
- 150ms transitions (`duration-150`)
- Spring-like easing (`ease-[cubic-bezier(0.36,0,0.66,-0.56)]`)
- Scale on press (`active:scale-[0.98]`)

#### Samsung One UI

- Normal case text with bold weight
- 16px+ border radius (`rounded-2xl`)
- Prominent shadows (`shadow-[0_4px_12px_rgba(0,0,0,0.1)]`)
- 250ms transitions (`duration-250`)
- Smooth easing (`ease-[cubic-bezier(0.33,0,0.2,1)]`)
- Generous spacing and padding

### Testing Components

```bash
# Run unit tests
pnpm test

# Run specific test file
pnpm test button.test.tsx

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# Visual regression tests
pnpm test:visual
```

### Building Documentation

```bash
# Start documentation site
pnpm --filter @aneka-ui/docs dev

# Build documentation
pnpm --filter @aneka-ui/docs build
```

### Running Storybook

```bash
# Start Storybook
pnpm --filter @aneka-ui/storybook dev

# Build Storybook
pnpm --filter @aneka-ui/storybook build
```

### Making Changes

1. **Create a branch:**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and test:**

   ```bash
   pnpm build
   pnpm test
   pnpm lint
   ```

3. **Add a changeset:**

   ```bash
   pnpm changeset
   ```

4. **Commit with conventional commits:**

   ```bash
   git commit -m "feat: add new feature"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature
   ```

### Component Checklist

When creating or updating components, ensure:

- [ ] Component file created in correct location
- [ ] File naming follows framework conventions
- [ ] TypeScript strict mode compliance
- [ ] React components use `forwardRef` and `displayName`
- [ ] Vue components use Composition API
- [ ] Angular components are standalone
- [ ] All variants and sizes implemented
- [ ] Dark mode support added (`dark:` classes)
- [ ] Accessibility attributes included (ARIA)
- [ ] Tests written (unit + visual)
- [ ] Documentation updated
- [ ] Changeset added

---

## 🎨 Design Token Reference

Use design tokens from `@aneka-ui/tokens` for consistency:

```typescript
import { materialTokens } from "@aneka-ui/tokens/material";
import { higTokens } from "@aneka-ui/tokens/hig";
import { oneuiTokens } from "@aneka-ui/tokens/oneui";

// Spacing
materialTokens.spacing.md; // "1.5rem"

// Border radius
materialTokens.radius.sm; // "0.25rem"

// Shadows
materialTokens.shadows[2]; // "0 2px 4px..."

// Motion
materialTokens.motion.duration.base; // "200ms"
materialTokens.motion.easing.standard; // "cubic-bezier(...)"
```

---

## 🐛 Troubleshooting

### "Command not found: aneka-ui"

```bash
# Link CLI globally
cd packages/cli
pnpm link --global
```

### "Component not found" Error

```bash
# Build registry first
pnpm build:registry

# Validate registry
pnpm validate:registry
```

### Type Errors

```bash
# Rebuild packages
pnpm build

# Type check
pnpm typecheck
```

### Import Errors

```bash
# Reinstall dependencies
pnpm install

# Clear cache and rebuild
pnpm clean
pnpm install
pnpm build
```

### Test Failures

```bash
# Clear test cache
pnpm test --clearCache

# Run tests in watch mode to debug
pnpm test:watch
```

---

## 📚 Additional Resources

- **[SPECIFICATION.md](https://github.com/AmitGurbani/aneka-ui/blob/main/SPECIFICATION.md)** - Complete project specification
- **[CONTRIBUTING.md](https://github.com/AmitGurbani/aneka-ui/blob/main/CONTRIBUTING.md)** - Contribution guidelines
- **[README.md](https://github.com/AmitGurbani/aneka-ui/blob/main/README.md)** - Project overview
- **[Documentation Site](https://amitgurbani.github.io/aneka-ui/)** - Live documentation

---

## 🆘 Getting Help

- **Issues:** [GitHub Issues](https://github.com/AmitGurbani/aneka-ui/issues)
- **Discussions:** [GitHub Discussions](https://github.com/AmitGurbani/aneka-ui/discussions)
- **Documentation:** [Official Docs](https://amitgurbani.github.io/aneka-ui/)

---

**Ready to start?** Choose your path above and begin building with Aneka UI! 🚀
