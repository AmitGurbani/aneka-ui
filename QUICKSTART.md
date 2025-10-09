# Aneka UI - Quick Start Guide

Get up and running with Aneka UI in 5 minutes.

## 🚀 For End Users (Using the CLI)

### Installation

```bash
npm install -g @aneka-ui/cli
```

### Initialize in Your Project

```bash
cd your-project
aneka-ui init
```

Follow the prompts to:
- Select framework (React/Vue/Angular)
- Choose design style (Material/HIG/OneUI)
- Configure directories

### Add Components

```bash
aneka-ui add button card badge
```

### Use Components

```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return <Button variant="default">Click me</Button>;
}
```

---

## 🛠️ For Contributors (Building the Project)

### Prerequisites

- Node.js 18.0.0+
- pnpm 8.0.0+

### Setup

```bash
# 1. Clone repository
git clone https://github.com/yourusername/aneka-ui.git
cd aneka-ui

# 2. Install dependencies
pnpm install

# 3. Build packages
pnpm build

# 4. Generate components (repeat for each component)
pnpm tsx scripts/generate-component.ts button
# Select frameworks: React, Vue, Angular
# Select styles: Material, HIG, OneUI

# 5. Build registry
pnpm build:registry

# 6. Validate
pnpm validate:registry

# 7. Test CLI locally
cd packages/cli
pnpm link --global

# 8. Test in sample project
cd /path/to/test-project
aneka-ui init
aneka-ui add button
```

### Development Workflow

```bash
# Start development mode
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

---

## 📝 Generate All Components

To complete the component library, generate all remaining components:

```bash
# Material Design Components (React)
pnpm tsx scripts/generate-component.ts button   # ✅ Already exists
pnpm tsx scripts/generate-component.ts card     # ✅ Already exists
pnpm tsx scripts/generate-component.ts badge    # ✅ Already exists
pnpm tsx scripts/generate-component.ts dialog   # ✅ Already exists
pnpm tsx scripts/generate-component.ts tooltip  # ✅ Already exists

# For each component above, generate Vue and Angular versions:
# Select framework: Vue or Angular
# Select style: Material
# Repeat for HIG and OneUI styles
```

---

## 🎨 Component Examples

### Material Design Button

```tsx
// Uppercase text, 4px radius, 200ms animation
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
```

### Apple HIG Button

```tsx
// Sentence case, 6px radius, scale on press
<Button variant="default">Primary action</Button>
<Button variant="secondary">Secondary</Button>
```

### Samsung One UI Button

```tsx
// Bold text, 16px radius, prominent shadow
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
```

---

## 📦 Project Structure

```
aneka-ui/
├── packages/
│   ├── cli/              # ✅ Complete - CLI tool
│   └── tokens/           # ✅ Complete - Design tokens
├── registry/             # 🔧 15% complete - Components
│   ├── react/
│   ├── vue/
│   └── angular/
├── scripts/              # ✅ Complete - Build scripts
├── docs/                 # 📝 Planned - Documentation
├── storybook/            # 📝 Planned - Playground
└── examples/             # 📝 Planned - Examples
```

---

## 🔗 Key Resources

- **[README.md](README.md)** - Full project documentation
- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - What's been generated
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute

---

## 🐛 Troubleshooting

### "Command not found: aneka-ui"
```bash
# Link CLI globally
cd packages/cli
pnpm link --global
```

### "Component not found"
```bash
# Build registry first
pnpm build:registry
```

### Type errors
```bash
# Rebuild packages
pnpm build
```

---

## ✅ Checklist

**Setup:**
- [ ] Cloned repository
- [ ] Installed dependencies (`pnpm install`)
- [ ] Built packages (`pnpm build`)

**Components:**
- [ ] Generated missing components
- [ ] Customized with design system styles
- [ ] Built registry (`pnpm build:registry`)
- [ ] Validated (`pnpm validate:registry`)

**Testing:**
- [ ] Linked CLI globally
- [ ] Tested in sample project
- [ ] Verified component installation
- [ ] Checked component rendering

**Documentation:**
- [ ] Read README.md
- [ ] Read SETUP.md
- [ ] Read CONTRIBUTING.md

---

## 🎯 Next Steps

1. **Complete Components**: Generate remaining 38 component files
2. **Add Tests**: Write tests for all components
3. **Build Docs**: Create documentation site with Astro
4. **Create Storybook**: Set up component playground
5. **Add Examples**: Create example applications
6. **Publish**: Release to npm

---

**Need help?** Check [SETUP.md](SETUP.md) for detailed instructions or [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

**Ready to build?** Run `pnpm tsx scripts/generate-component.ts` to start! 🚀
