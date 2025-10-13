# Overview & Philosophy

> **Specification Section:** Project Overview
> **Last Updated:** October 2025

This document defines the core philosophy, mission, and approach of the Aneka UI project.

---

## 🎯 Project Mission

**Aneka UI** provides authentic design system patterns from Material Design, Apple HIG, and Samsung One UI that seamlessly adapt to your brand colors. We give developers the structure, spacing, typography, and motion patterns of these renowned design systems while letting them maintain complete control over colors and customization.

### Vision Statement

> "Design system patterns with YOUR brand colors"

We believe that developers should have access to world-class design system patterns without being locked into the color schemes of Google, Apple, or Samsung. Aneka UI delivers the **structure and behavior** while you provide the **identity and brand**.

---

## 🔑 Core Philosophy

### 1. Design System PATTERNS, Not Colors

**What We Provide:**

- Spacing systems (padding, margins, gaps)
- Typography hierarchies (font sizes, weights, line heights)
- Motion patterns (transitions, animations, easing functions)
- Component behaviors (interactions, states, animations)
- Layout patterns (grids, flexbox arrangements)
- Border radius styles
- Shadow elevation systems

**What You Provide:**

- Brand colors (primary, secondary, accent)
- Foreground/background combinations
- Destructive/success/warning colors
- Dark mode color schemes
- Custom color palettes

**Why This Matters:**

Traditional component libraries like Material-UI or Vuetify ship with built-in color schemes. This creates several problems:

1. **Color Overriding Complexity:** You spend time fighting the library's colors
2. **Bundle Size:** CSS variables and theming systems add unnecessary weight
3. **Customization Friction:** Every color change requires understanding the library's theming system
4. **Loss of Identity:** Your app looks like "yet another Material app"

**Our Approach:**

```javascript
// ❌ Traditional libraries - Fighting built-in colors
<Button color="primary" /> // What is "primary"? The library decides.

// ✅ Aneka UI - Your colors, our patterns
<Button className="bg-[#FF6B35] text-white" /> // Material Design patterns, YOUR color
```

We use Tailwind's utility classes with **direct color values**. The button component implements Material Design's elevation, radius, and motion patterns, but the colors come from your `tailwind.config.js`.

### 2. Copy-Paste Ownership Model

Inspired by **shadcn/ui**, Aneka UI is NOT an npm package that you install and import. Instead:

**How It Works:**

1. Run `aneka-ui init` in your project
2. Run `aneka-ui add button card` to copy components
3. Components are **copied into your `src/` directory**
4. You own the code and can modify it freely

**Benefits:**

- **Full Control:** Change any line of code without forking a library
- **Zero Lock-In:** No dependency to upgrade or maintain
- **Tree Shaking:** Only the code you use is in your bundle
- **Learning Tool:** Read and understand every line of the components
- **No Version Conflicts:** Each component is independent
- **Easy Debugging:** Step through your own code, not node_modules

**Comparison:**

```bash
# ❌ Traditional npm package
npm install @material-ui/core
# Result: node_modules/@material-ui/core (100+ MB, thousands of files)
# You import from: import { Button } from '@material-ui/core'
# You customize by: overriding CSS, using theme providers, fighting specificity

# ✅ Aneka UI copy-paste approach
aneka-ui add button
# Result: src/components/ui/button.tsx (one file, ~100 lines)
# You import from: import { Button } from '@/components/ui/button'
# You customize by: editing the file directly
```

### 3. Framework-Native Components

Each framework gets **true, idiomatic** implementations. We don't transpile React to Vue or use web components as a common denominator.

**React Components:**

- Use `React.forwardRef` for ref forwarding
- Include `displayName` for debugging
- Export TypeScript interfaces
- Support `asChild` pattern via Radix Slot

**Vue Components:**

- Use Composition API (`<script setup>`)
- Single File Components (.vue)
- Proper `props` and `emits`
- TypeScript support with `defineProps`

**Angular Components:**

- Standalone components (no modules)
- Proper `@Input()` and `@Output()` decorators
- TypeScript classes
- Angular-style templates

**Why This Matters:**

```typescript
// ❌ Generic web component approach (not framework-native)
<aneka-button variant="primary">Click me</aneka-button>
// Problems: No types, no framework integration, feels foreign

// ✅ Framework-native React
import { Button } from '@/components/ui/button'
<Button variant="primary" ref={buttonRef}>Click me</Button>
// Full TypeScript support, ref forwarding, feels like React

// ✅ Framework-native Vue
import Button from '@/components/ui/Button.vue'
<Button variant="primary" @click="handleClick">Click me</Button>
// Composition API, Vue events, feels like Vue

// ✅ Framework-native Angular
import { ButtonComponent } from '@/components/ui/button.component'
<aneka-button variant="primary" (click)="handleClick()">Click me</aneka-button>
// Angular syntax, decorators, feels like Angular
```

---

## 🎨 Design System Approach

Aneka UI implements three distinct design systems, each with authentic patterns:

### Material Design (Google)

- **Origin:** Google's Material Design 3
- **Character:** Bold, geometric, structured
- **Patterns:**
  - Uppercase button text with letter spacing
  - 4px border radius (subtle rounding)
  - Elevation shadows (distinct depth layers)
  - 200ms transitions with standard easing
  - Grid-based spacing

### Apple HIG (Human Interface Guidelines)

- **Origin:** Apple's iOS/macOS design language
- **Character:** Refined, subtle, human-centered
- **Patterns:**
  - Sentence case text (natural reading)
  - 6-12px border radius (moderate rounding)
  - Subtle shadows (soft depth)
  - Spring-like animations (natural motion)
  - Scale on press (0.98 active state)
  - 150ms transitions

### Samsung One UI

- **Origin:** Samsung's mobile design language
- **Character:** Bold, spacious, accessible
- **Patterns:**
  - Normal case text
  - 16px+ border radius (prominent rounding)
  - Generous spacing (thumb-friendly)
  - Prominent shadows (strong depth)
  - 250ms transitions (deliberate motion)
  - Larger touch targets

**Example: Button Comparison**

```typescript
// Material Design Button
<button className="
  uppercase           // MATERIAL DESIGN TEXT
  tracking-wide       // Letter spacing
  rounded-[4px]       // Small radius
  shadow-[0_2px_4px_rgba(0,0,0,0.1)]  // Elevation
  duration-200        // Quick transition
">
  CLICK ME
</button>

// Apple HIG Button
<button className="
  normal-case         // Sentence case
  tracking-tight      // Tight letter spacing
  rounded-md          // 6px radius
  shadow-sm           // Subtle shadow
  duration-150        // Snappy transition
  active:scale-[0.98] // Press feedback
">
  Click Me
</button>

// Samsung One UI Button
<button className="
  normal-case         // Normal text
  rounded-2xl         // 16px radius (large)
  shadow-lg           // Prominent shadow
  duration-250        // Deliberate transition
  px-6 py-3           // Generous padding
">
  Click Me
</button>
```

---

## 🎯 Target Audience

### Primary Users

1. **Startup Developers:** Need professional design quickly without design resources
2. **Design System Implementers:** Building custom design systems based on proven patterns
3. **Framework Switchers:** Moving from Material-UI/Vuetify/etc. but want familiar patterns
4. **Learning Developers:** Want to understand how design systems work under the hood
5. **Agencies:** Need to ship consistent, branded experiences for multiple clients

### Use Cases

**Scenario 1: Startup MVP**

- Need professional UI quickly
- Want their own brand colors
- Don't have design resources
- Choose Material/HIG/OneUI based on preference
- Copy components and ship

**Scenario 2: Design System Foundation**

- Building custom design system
- Want proven patterns as starting point
- Will heavily customize
- Appreciate full code ownership
- Use Aneka as scaffolding

**Scenario 3: Migration from Component Library**

- Currently using Material-UI/Vuetify/etc.
- Tired of fighting the framework
- Want more control
- Prefer copy-paste model
- Gradually migrate components

**Scenario 4: Learning Resource**

- Learning design systems
- Want to see how patterns are implemented
- Appreciate readable, documented code
- Use as reference implementation

---

## 🚫 What Aneka UI Is NOT

To avoid confusion, here's what we explicitly do NOT do:

### 1. Not a Traditional npm Library

- No `npm install @aneka-ui/react`
- No imports from `node_modules`
- No version dependencies to manage

### 2. Not a Complete Design System

- No color palette decisions
- No branded icons
- No opinionated fonts
- No mandatory theming system

### 3. Not a Visual Builder

- No drag-and-drop interface
- No visual design tools
- No WYSIWYG editor

### 4. Not a Component Marketplace

- No paid components
- No premium features
- No upselling
- 100% open source

### 5. Not a Framework

- No custom build system
- No proprietary tooling
- No vendor lock-in
- Just components + CLI

---

## 🏗️ Technical Approach

### Styling Strategy: Tailwind-First

We exclusively use **Tailwind CSS utility classes** with these principles:

1. **Direct Colors:** `bg-primary` not `bg-blue-500`
2. **No CSS Variables:** No `var(--primary-color)`
3. **User's Tailwind Config:** Colors come from `tailwind.config.js`
4. **Utility Classes:** No custom CSS files
5. **CVA for Variants:** Type-safe variant composition

### Component Architecture

```typescript
// Pattern: CVA + cn + forwardRef

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import * as React from "react"

// 1. Define variants with CVA
const buttonVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: { default: "...", secondary: "..." },
      size: { default: "...", sm: "..." }
    }
  }
)

// 2. Export TypeScript types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 3. Component with forwardRef
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
```

### CLI-Driven Workflow

```bash
# 1. Initialize (one time per project)
aneka-ui init
# - Detects framework
# - Detects monorepo
# - Creates config
# - Sets up utils

# 2. Add components (as needed)
aneka-ui add button card badge
# - Copies component files
# - Installs dependencies
# - Handles conflicts

# 3. Update components (when new versions available)
aneka-ui update button
# - Shows diff
# - Confirms update
# - Updates dependencies

# 4. Maintain (ongoing)
aneka-ui doctor
# - Checks configuration
# - Validates dependencies
# - Suggests fixes
```

---

## 📈 Success Criteria

Aneka UI is successful when:

1. **Developers Choose Us:** Preferred over npm component libraries for new projects
2. **Fast Adoption:** From `aneka-ui init` to production in < 1 hour
3. **Zero Friction:** No time spent fighting colors or customization
4. **Community Growth:** Active contributors submitting new components
5. **Framework Parity:** Equal quality across React, Vue, Angular
6. **Learning Resource:** Developers learn design patterns by reading our code

---

## 🔮 Future Vision

While maintaining our core philosophy, future directions include:

1. **More Components:** Expand from 5 to 30+ components
2. **More Design Systems:** Add Fluent, Spectrum, others
3. **Component Generator:** CLI tool to generate new components
4. **Plugin System:** Community plugins for custom design systems
5. **Figma Integration:** Export Figma components to Aneka format
6. **Documentation Site:** Comprehensive docs with live examples

---

## 📚 Related Specifications

- [Architecture & Project Structure](./architecture.md) - How we organize the codebase
- [Technology Stack](./technology-stack.md) - Tools and libraries we use
- [Design Tokens](./design-tokens.md) - Detailed design system patterns
- [Critical Requirements](./critical-requirements.md) - Non-negotiable implementation rules

---

**This philosophy guides every decision in the Aneka UI project. When in doubt, refer back to these core principles.**
