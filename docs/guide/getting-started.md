# Getting Started

Get up and running with Aneka UI in minutes.

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.0.0 or higher
- A React, Vue, or Angular project
- Tailwind CSS 3.4.0 or higher configured
- TypeScript 5.0.0 or higher (recommended)

## Installation

### Step 1: Install the CLI

Install the Aneka UI CLI globally:

::: code-group
```bash [npm]
npm install -g @aneka-ui/cli
```

```bash [pnpm]
pnpm add -g @aneka-ui/cli
```

```bash [yarn]
yarn global add @aneka-ui/cli
```

```bash [bun]
bun add -g @aneka-ui/cli
```
:::

Or use it directly with `npx`:

```bash
npx @aneka-ui/cli init
```

### Step 2: Initialize Aneka UI

Navigate to your project and run:

```bash
cd your-project
aneka-ui init
```

This interactive command will:

1. **Detect your framework** (React, Vue, or Angular)
2. **Detect monorepo** (if applicable)
3. **Prompt for design style** (Material, HIG, or One UI)
4. **Create configuration** file (`aneka-ui.json`)
5. **Set up utils** (`lib/utils.ts` with `cn` helper)
6. **Configure aliases** (update tsconfig paths)

Example initialization:

```bash
? Which framework are you using? › React
? Which design style do you prefer? › Material Design
? Where should we install components? › src/components/ui
✓ Configuration created at aneka-ui.json
✓ Utils created at src/lib/utils.ts
✓ Updated tsconfig.json paths
```

### Step 3: Add Components

Add individual components:

```bash
aneka-ui add button
```

Or add multiple components at once:

```bash
aneka-ui add button card badge dialog tooltip
```

Or add all available components:

```bash
aneka-ui add --all
```

The CLI will:
- Copy component files to your project
- Install required dependencies (Radix UI, etc.)
- Handle file conflicts interactively
- Show you what was installed

### Step 4: Configure Your Colors

Update your `tailwind.config.js` with your brand colors:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [],
}
```

Add CSS variables to your global CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
  }
}
```

### Step 5: Use Components

Import and use components in your project:

::: code-group
```tsx [React]
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Aneka UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

```vue [Vue]
<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card.vue'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Welcome to Aneka UI</CardTitle>
    </CardHeader>
    <CardContent>
      <Button>Click me</Button>
    </CardContent>
  </Card>
</template>
```

```ts [Angular]
import { Component } from '@angular/core';
import { ButtonComponent } from '@/components/ui/button.component';
import { CardComponent } from '@/components/ui/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <aneka-card>
      <h2>Welcome to Aneka UI</h2>
      <aneka-button>Click me</aneka-button>
    </aneka-card>
  `
})
export class AppComponent {}
```
:::

## Next Steps

- [Choose a Design System](/guide/material-design) - Learn about Material, HIG, and One UI
- [Browse Components](/components/button) - See all available components
- [CLI Reference](/cli/overview) - Learn all CLI commands
- [Philosophy](/guide/philosophy) - Understand our approach

## Need Help?

- [GitHub Issues](https://github.com/AmitGurbani/aneka-ui/issues)
- [GitHub Discussions](https://github.com/AmitGurbani/aneka-ui/discussions)
- [View Demo](https://aneka-ui-demo.vercel.app)
