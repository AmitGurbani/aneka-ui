# What is Aneka UI?

Aneka UI is a framework-agnostic component library that provides authentic implementations of three major design systems: Material Design (Google), Apple HIG (Apple), and Samsung One UI (Samsung).

## The Problem

Most component libraries force you to choose between:

1. **Using their design system** - Great components, but your brand gets lost
2. **Building from scratch** - Full control, but missing proven patterns
3. **Heavy customization** - Endless CSS overrides that fight the library

## Our Solution

Aneka UI provides **design patterns** while you provide the **colors**:

- ✅ Authentic design system patterns (spacing, typography, motion)
- ✅ Your brand colors from Tailwind config
- ✅ Components copied to your codebase for full control
- ✅ Framework-native implementations (not wrappers)

## Key Features

### 🎨 Three Design Systems

Choose the design language that fits your product:

- **Material Design** - Google's systematic approach with elevation and crisp animations
- **Apple HIG** - Apple's minimal aesthetics with subtle shadows and spring motion
- **Samsung One UI** - Samsung's bold design with generous spacing and prominent shadows

### ⚛️ Three Frameworks

True framework-native components:

- **React** - Uses `forwardRef`, hooks, and React patterns
- **Vue** - Uses Composition API and Vue 3 features
- **Angular** - Uses standalone components and Angular patterns

### 📋 Copy-Paste Ownership

Components are copied into your project, inspired by [Shadcn UI](https://ui.shadcn.com):

- No runtime dependencies on Aneka UI
- Full source code in your repo
- Customize freely without fighting the library
- Update individual components when you want

### 🎯 Your Brand Colors

Components use your Tailwind theme:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // Your blue
          foreground: "#ffffff",
        },
        // ... your colors
      },
    },
  },
};
```

The design patterns adapt to **your** colors automatically.

## How It Works

1. **Install CLI** - One-time setup

   ```bash
   npm install -g @aneka-ui/cli
   ```

2. **Initialize** - Detects your framework and setup

   ```bash
   aneka-ui init
   ```

3. **Add Components** - Pick what you need

   ```bash
   aneka-ui add button card badge
   ```

4. **Use & Customize** - They're yours now!
   ```tsx
   import { Button } from "@/components/ui/button";
   ```

## Who Should Use Aneka UI?

✅ **Teams building branded products** that need design system quality

✅ **Developers** who want proven patterns without losing control

✅ **Projects** that need to match specific design languages (Material, HIG, One UI)

✅ **Multi-framework teams** using React, Vue, or Angular

## Who Shouldn't Use Aneka UI?

❌ If you need 100+ components today (we're starting with 5 core components)

❌ If you want zero configuration (you'll need Tailwind CSS setup)

❌ If you prefer npm dependencies over copy-paste approach

## Next Steps

- [Get Started](/guide/getting-started) - Install and set up Aneka UI
- [Philosophy](/guide/philosophy) - Understand our design decisions
- [Components](/components/button) - Browse available components
