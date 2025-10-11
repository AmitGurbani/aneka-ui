# Aneka UI

> **Design system patterns with YOUR brand colors**

Aneka UI is a framework-agnostic component library providing authentic Material Design, Apple HIG, and Samsung One UI patterns that adapt to your brand colors. Install components via CLI and customize them freely in your own codebase.

## 🌟 Features

- **3 Design Systems**: Material Design, Apple HIG, Samsung One UI
- **3 Frameworks**: React, Vue, Angular
- **Copy-Paste Approach**: Components live in your codebase (like Shadcn UI)
- **Your Brand Colors**: Design patterns adapt to your Tailwind colors
- **TypeScript**: Fully typed with strict mode
- **Accessible**: Built with Radix UI primitives
- **Framework-Native**: True React/Vue/Angular components

## 📦 Installation

```bash
# Install CLI globally
npm install -g @aneka-ui/cli

# Or use with npx
npx @aneka-ui/cli init
```

## 🚀 Quick Start

### 1. Initialize in your project

```bash
cd your-project
aneka-ui init
```

This will:

- Detect your framework (React/Vue/Angular)
- Detect monorepo setup
- Prompt for design style (Material/HIG/OneUI)
- Create configuration file
- Set up utils and path aliases

### 2. Add components

```bash
# Add specific components
aneka-ui add button card badge

# Add all components
aneka-ui add --all
```

### 3. Configure your colors

Add your brand colors to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // Your primary color
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b",
          foreground: "#ffffff",
        },
        // ... more colors
      },
    },
  },
};
```

### 4. Use components

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
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Design Systems

### Material Design (Google)

- 8pt grid system
- Uppercase button text
- 4px border radius
- Elevation shadows
- 200ms animations

### Apple HIG

- Clean, minimal shadows
- Sentence case text
- 6px-12px border radius
- Spring-like animations (150ms)
- Scale-down on press

### Samsung One UI

- Generous spacing
- Bold text (600 weight)
- Large border radius (16px+)
- Prominent shadows
- 250ms smooth animations

## 📚 Available Components

- **Button**: Multiple variants and sizes
- **Card**: Container with header, content, and footer
- **Badge**: Labels and status indicators
- **Dialog**: Modal with overlay and focus management
- **Tooltip**: Hover and keyboard accessible tooltips

## 🛠️ CLI Commands

### init

Initialize Aneka UI in your project

```bash
aneka-ui init
```

### add

Add components to your project

```bash
aneka-ui add button card
aneka-ui add --all
aneka-ui add button --overwrite
```

### list

List available components

```bash
aneka-ui list
aneka-ui list --installed
aneka-ui list --available
```

### diff

Show changes between local and registry

```bash
aneka-ui diff button
```

### update

Update components to latest versions

```bash
aneka-ui update button
aneka-ui update --all
aneka-ui update --all --force
```

### doctor

Diagnose setup issues

```bash
aneka-ui doctor
aneka-ui doctor --fix
```

## 📁 Project Structure

```
aneka-ui/
├── packages/
│   ├── cli/              # CLI tool
│   └── tokens/           # Design tokens
├── registry/             # Component registry
│   ├── react/
│   │   ├── material/
│   │   ├── hig/
│   │   └── oneui/
│   ├── vue/
│   └── angular/
├── docs/                 # Documentation site
├── storybook/            # Component playground
├── examples/             # Example apps
└── scripts/              # Build scripts
```

## 🔧 Requirements

- Node.js 18.0.0+
- TypeScript 5.0.0+
- Tailwind CSS 3.4.0+
- React 18.0.0+ / Vue 3.3.0+ / Angular 17.0.0+

## 🎯 Philosophy

### 1. Patterns, Not Colors

Aneka UI provides authentic design system **patterns** (spacing, typography, motion) while you provide the **colors**. This gives you brand consistency while following design system best practices.

### 2. Copy-Paste Ownership

Components are copied to your project, not installed as dependencies. You own the code and can modify it freely. This is inspired by Shadcn UI's approach.

### 3. Framework-Native

React components use `forwardRef` and hooks. Vue components use Composition API. Angular components use standalone components. No wrappers, no compromises.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Adding a New Component

1. Create component files in `registry/{framework}/{style}/`
2. Follow framework conventions (lowercase React, PascalCase Vue, lowercase+suffix Angular)
3. Use design tokens from `@aneka-ui/tokens`
4. Add to registry index
5. Write tests and documentation

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/aneka-ui.git
cd aneka-ui

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Start dev mode
pnpm dev
```

## 📄 License

MIT © [Your Name]

## 🙏 Acknowledgments

- Inspired by [Shadcn UI](https://ui.shadcn.com)
- Built with [Radix UI](https://radix-ui.com) primitives
- Design systems by Google, Apple, and Samsung

## 📬 Support

- [Documentation](https://aneka-ui.com/docs)
- [GitHub Issues](https://github.com/yourusername/aneka-ui/issues)
- [Discord Community](https://discord.gg/aneka-ui)

---

**Made with ❤️ for developers who want design system quality with brand flexibility**
