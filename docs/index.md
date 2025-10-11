---
layout: home

hero:
  name: Aneka UI
  text: Design System Patterns with YOUR Brand Colors
  tagline: Framework-agnostic component library with Material Design, Apple HIG, and Samsung One UI patterns
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/AmitGurbani/aneka-ui
    - theme: alt
      text: View Demo
      link: https://aneka-ui-demo.vercel.app

features:
  - icon: 🎨
    title: 3 Design Systems
    details: Material Design, Apple HIG, and Samsung One UI - each with authentic patterns and motion

  - icon: ⚛️
    title: 3 Frameworks
    details: React, Vue, and Angular - true framework-native components, not wrappers

  - icon: 🎯
    title: Your Brand Colors
    details: Design patterns adapt to your Tailwind colors - you control the palette

  - icon: 📋
    title: Copy-Paste Ownership
    details: Components live in your codebase, inspired by Shadcn UI's approach

  - icon: 🔧
    title: Powerful CLI
    details: Install, update, and manage components with a full-featured CLI tool

  - icon: ♿
    title: Accessible
    details: Built with Radix UI primitives for robust accessibility support
---

## Quick Start

Install components with one command:

```bash
npx @aneka-ui/cli init
npx @aneka-ui/cli add button card badge
```

Then use them in your project:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Aneka UI</CardTitle>
      </CardHeader>
      <Button>Get Started</Button>
    </Card>
  );
}
```

## Why Aneka UI?

**Patterns, Not Colors** - Aneka UI provides authentic design system patterns (spacing, typography, motion) while you provide the colors. This gives you brand consistency while following design system best practices.

**Framework-Native** - React components use `forwardRef` and hooks. Vue components use Composition API. Angular components use standalone components. No wrappers, no compromises.

**Copy-Paste Philosophy** - Components are copied to your project, not installed as dependencies. You own the code and can modify it freely.

## Design Systems Included

- **Material Design** - Google's design language with 8pt grid, elevation shadows, and 200ms animations
- **Apple HIG** - Apple's Human Interface Guidelines with subtle shadows and spring-like animations
- **Samsung One UI** - Samsung's design system with generous spacing and bold typography

[Learn more about our philosophy →](/guide/philosophy)
