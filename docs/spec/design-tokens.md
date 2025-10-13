# Design Tokens

> **Specification Section:** Design System Tokens
> **Last Updated:** October 2025

This document defines the complete design token specifications for Material Design, Apple HIG, and Samsung One UI design systems.

---

## 🎨 Token Philosophy

**What Are Design Tokens?**

Design tokens are the visual design atoms of the design system—specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure consistency and maintainability.

**Aneka UI Token Approach:**

We define tokens for:

- **Spacing** (padding, margins, gaps)
- **Border Radius** (corner rounding)
- **Shadows** (elevation and depth)
- **Typography** (text transform, weight, tracking)
- **Motion** (duration, easing functions)
- **Interactions** (hover, active, focus states)

**What We DON'T Define:**

- ❌ **Colors** - Users provide via Tailwind config
- ❌ **Fonts** - Users choose their typography
- ❌ **Icons** - Users provide their icon system

---

## 📦 Token Package Structure

```typescript
// packages/tokens/src/index.ts
export * from "./material";
export * from "./hig";
export * from "./oneui";

// Usage
import { materialTokens } from "@aneka-ui/tokens/material";
import { higTokens } from "@aneka-ui/tokens/hig";
import { oneuiTokens } from "@aneka-ui/tokens/oneui";
```

**Note:** The tokens package is **optional**. Components have tokens inlined. The package is for advanced users who want programmatic access.

---

## 🎯 Material Design Tokens

### Overview

**Character:** Bold, geometric, structured
**Origin:** Google's Material Design 3
**Key Characteristics:**

- Uppercase text with letter spacing
- Small border radius (4px)
- Elevation-based shadows
- Standard easing curves
- Grid-based spacing

### Complete Token Specification

```typescript
// packages/tokens/src/material.ts

export const materialTokens = {
  /**
   * Spacing System
   * Based on 8px grid (Material's baseline grid)
   */
  spacing: {
    xs: "0.5rem", // 8px  - Compact padding
    sm: "1rem", // 16px - Default padding
    md: "1.5rem", // 24px - Section spacing
    lg: "2rem", // 32px - Large gaps
    xl: "3rem", // 48px - Major sections
  },

  /**
   * Border Radius
   * Material uses subtle rounding
   */
  radius: {
    none: "0", // 0px  - Sharp corners
    sm: "0.25rem", // 4px  - Default (buttons, cards)
    md: "0.5rem", // 8px  - Moderate rounding
    lg: "0.75rem", // 12px - Large elements
    full: "9999px", // Fully rounded (pills, badges)
  },

  /**
   * Shadows (Elevation Levels)
   * Material Design uses distinct elevation layers
   */
  shadows: {
    1: "0 1px 2px 0 rgb(0 0 0 / 0.05)", // 1dp - Raised
    2: "0 2px 4px 0 rgb(0 0 0 / 0.1)", // 2dp - Default buttons
    4: "0 4px 8px 0 rgb(0 0 0 / 0.12)", // 4dp - Hover state
    6: "0 6px 12px 0 rgb(0 0 0 / 0.15)", // 6dp - Dialogs
    8: "0 8px 16px 0 rgb(0 0 0 / 0.18)", // 8dp - Elevated surfaces
    12: "0 12px 24px 0 rgb(0 0 0 / 0.2)", // 12dp - App bars
    16: "0 16px 32px 0 rgb(0 0 0 / 0.22)", // 16dp - Navigation drawer
    24: "0 24px 48px 0 rgb(0 0 0 / 0.25)", // 24dp - Modals
  },

  /**
   * Typography
   * Material uses uppercase with tracking
   */
  typography: {
    transform: "uppercase", // UPPERCASE TEXT
    weight: "500", // Medium weight
    tracking: "0.05em", // Letter spacing (50)
    lineHeight: "1.5", // 150% line height
  },

  /**
   * Motion (Transitions & Animations)
   * Material uses standard easing
   */
  motion: {
    duration: {
      fast: "150ms", // Quick transitions
      base: "200ms", // Default duration
      slow: "300ms", // Deliberate animations
      slower: "400ms", // Complex animations
    },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)", // Standard easing
      decelerate: "cubic-bezier(0.0, 0, 0.2, 1)", // Enter screen
      accelerate: "cubic-bezier(0.4, 0, 1, 1)", // Exit screen
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)", // Sharp movement
    },
  },

  /**
   * Interaction States
   */
  interactions: {
    hoverOpacity: "0.9", // 90% opacity on hover
    activeOpacity: "0.8", // 80% opacity when pressed
    disabledOpacity: "0.5", // 50% opacity when disabled
    focusRingWidth: "2px", // Focus ring thickness
    focusRingOffset: "2px", // Focus ring offset
  },
} as const;

export type MaterialTokens = typeof materialTokens;
```

### Tailwind Usage Examples

```typescript
// Button with Material Design tokens
<button className="
  uppercase                           // Material typography
  tracking-wide                       // 0.05em spacing
  font-medium                         // 500 weight
  rounded-[4px]                       // 4px radius
  px-4 py-2                          // Spacing
  shadow-[0_2px_4px_rgba(0,0,0,0.1)] // Elevation 2
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] // Elevation 4 on hover
  transition-all duration-200        // 200ms transition
  ease-[cubic-bezier(0.4,0,0.2,1)]  // Standard easing
  focus:outline-none
  focus:ring-2                       // 2px focus ring
  focus:ring-primary
  focus:ring-offset-2                // 2px offset
  disabled:opacity-50                // 50% when disabled
">
  CLICK ME
</button>

// Card with Material Design elevation
<div className="
  rounded-md                         // 8px radius
  p-6                                // 24px padding
  shadow-[0_2px_4px_rgba(0,0,0,0.1)] // Elevation 2
  transition-shadow duration-200
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] // Elevation 4 on hover
">
  Card Content
</div>
```

---

## 🍎 Apple HIG Tokens

### Overview

**Character:** Refined, subtle, human-centered
**Origin:** Apple's iOS/macOS Human Interface Guidelines
**Key Characteristics:**

- Sentence case text
- Moderate border radius (6-12px)
- Subtle shadows
- Spring-like animations
- Scale-on-press interaction

### Complete Token Specification

```typescript
// packages/tokens/src/hig.ts

export const higTokens = {
  /**
   * Spacing System
   * HIG uses similar spacing to Material
   */
  spacing: {
    xs: "0.5rem", // 8px  - Tight spacing
    sm: "1rem", // 16px - Default padding
    md: "1.5rem", // 24px - Section spacing
    lg: "2rem", // 32px - Large gaps
    xl: "3rem", // 48px - Major sections
  },

  /**
   * Border Radius
   * HIG uses more rounding than Material
   */
  radius: {
    none: "0", // 0px  - Sharp (rare)
    sm: "0.375rem", // 6px  - Small elements
    md: "0.75rem", // 12px - Default (buttons, cards)
    lg: "1rem", // 16px - Large surfaces
    xl: "1.25rem", // 20px - Very rounded
    full: "9999px", // Fully rounded
  },

  /**
   * Shadows
   * HIG uses softer, more subtle shadows
   */
  shadows: {
    1: "0 1px 3px 0 rgb(0 0 0 / 0.08)", // Subtle elevation
    2: "0 2px 6px 0 rgb(0 0 0 / 0.1)", // Default elevation
    3: "0 4px 12px 0 rgb(0 0 0 / 0.12)", // Raised surfaces
    4: "0 6px 16px 0 rgb(0 0 0 / 0.14)", // Floating elements
    5: "0 10px 24px 0 rgb(0 0 0 / 0.16)", // Modals/dialogs
    6: "0 15px 35px 0 rgb(0 0 0 / 0.18)", // High elevation
  },

  /**
   * Typography
   * HIG uses natural case with tight tracking
   */
  typography: {
    transform: "none", // Sentence case
    weight: "600", // Semibold (SF Pro default)
    tracking: "-0.025em", // Tight letter spacing
    lineHeight: "1.4", // 140% line height
  },

  /**
   * Motion
   * HIG uses spring-like, natural animations
   */
  motion: {
    duration: {
      fast: "120ms", // Quick, snappy
      base: "150ms", // Default (faster than Material)
      slow: "250ms", // Deliberate
      slower: "350ms", // Complex
    },
    easing: {
      standard: "cubic-bezier(0.36, 0, 0.66, -0.56)", // Spring-like
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)", // Smooth
      easeIn: "cubic-bezier(0.42, 0, 1, 1)", // Accelerate
      easeOut: "cubic-bezier(0, 0, 0.58, 1)", // Decelerate
      easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)", // Both
    },
  },

  /**
   * Interaction States
   * HIG uses scale transforms (iconic Apple press feedback)
   */
  interactions: {
    hoverOpacity: "0.9", // Subtle hover
    activeScale: "0.98", // Scale down when pressed (98%)
    disabledOpacity: "0.4", // 40% when disabled
    focusRingWidth: "3px", // Thicker focus ring
    focusRingOffset: "2px", // Focus ring offset
    focusRingColor: "rgba(0, 122, 255, 0.4)", // Blue with transparency
  },
} as const;

export type HIGTokens = typeof higTokens;
```

### Tailwind Usage Examples

```typescript
// Button with Apple HIG tokens
<button className="
  normal-case                        // Sentence case (not uppercase)
  tracking-tight                     // -0.025em spacing
  font-semibold                      // 600 weight
  rounded-md                         // 12px radius
  px-4 py-2
  shadow-[0_2px_6px_rgba(0,0,0,0.1)] // Subtle shadow
  transition-all duration-150        // 150ms transition
  ease-[cubic-bezier(0.36,0,0.66,-0.56)] // Spring-like easing
  hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
  active:scale-[0.98]                // Press feedback (iconic!)
  focus:outline-none
  focus:ring-3                       // 3px focus ring
  focus:ring-blue-500/40             // Blue with 40% opacity
  focus:ring-offset-2
  disabled:opacity-40
">
  Click Me
</button>

// Card with HIG styling
<div className="
  rounded-xl                         // 20px radius (more rounded)
  p-6
  shadow-[0_4px_12px_rgba(0,0,0,0.12)]
  transition-all duration-150
  hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)]
  hover:scale-[1.01]                 // Subtle lift on hover
">
  Card Content
</div>
```

---

## 📱 Samsung One UI Tokens

### Overview

**Character:** Bold, spacious, accessible
**Origin:** Samsung's One UI mobile design language
**Key Characteristics:**

- Normal case text
- Large border radius (16px+)
- Generous spacing (thumb-friendly)
- Prominent shadows
- Deliberate transitions

### Complete Token Specification

```typescript
// packages/tokens/src/oneui.ts

export const oneuiTokens = {
  /**
   * Spacing System
   * One UI uses more generous spacing
   */
  spacing: {
    xs: "0.75rem", // 12px - Minimum spacing
    sm: "1.25rem", // 20px - Default padding
    md: "2rem", // 32px - Section spacing
    lg: "2.5rem", // 40px - Large gaps
    xl: "4rem", // 64px - Major sections
  },

  /**
   * Border Radius
   * One UI is known for prominent rounding
   */
  radius: {
    none: "0", // 0px  - Sharp (rare)
    sm: "0.5rem", // 8px  - Small elements
    md: "1rem", // 16px - Default (signature look)
    lg: "1.5rem", // 24px - Large surfaces
    xl: "2rem", // 32px - Very rounded
    "2xl": "2.5rem", // 40px - Extra rounded
    full: "9999px", // Fully rounded
  },

  /**
   * Shadows
   * One UI uses more prominent shadows
   */
  shadows: {
    1: "0 2px 8px 0 rgb(0 0 0 / 0.08)", // Light elevation
    2: "0 4px 12px 0 rgb(0 0 0 / 0.1)", // Default elevation
    3: "0 6px 16px 0 rgb(0 0 0 / 0.12)", // Raised
    4: "0 8px 24px 0 rgb(0 0 0 / 0.14)", // Floating
    5: "0 12px 32px 0 rgb(0 0 0 / 0.16)", // Dialogs
    6: "0 16px 48px 0 rgb(0 0 0 / 0.18)", // High elevation
  },

  /**
   * Typography
   * One UI uses normal case with standard tracking
   */
  typography: {
    transform: "none", // Normal case
    weight: "600", // Semibold
    tracking: "normal", // No extra tracking
    lineHeight: "1.5", // 150% line height
  },

  /**
   * Motion
   * One UI uses slightly slower, more deliberate animations
   */
  motion: {
    duration: {
      fast: "200ms", // Still quick
      base: "250ms", // Default (slower than others)
      slow: "350ms", // Deliberate
      slower: "500ms", // Complex animations
    },
    easing: {
      standard: "cubic-bezier(0.33, 0, 0.2, 1)", // Smooth
      emphasize: "cubic-bezier(0.4, 0, 0.2, 1)", // Standard Material
      decelerate: "cubic-bezier(0, 0, 0.2, 1)", // Enter
      accelerate: "cubic-bezier(0.4, 0, 1, 1)", // Exit
    },
  },

  /**
   * Interaction States
   * One UI focuses on accessibility and touch
   */
  interactions: {
    hoverOpacity: "0.85", // More pronounced hover
    activeOpacity: "0.7", // Clear press feedback
    disabledOpacity: "0.5", // 50% disabled
    focusRingWidth: "3px", // Thick focus ring
    focusRingOffset: "3px", // More offset
    minTouchTarget: "44px", // Minimum touch target (accessibility)
  },
} as const;

export type OneUITokens = typeof oneuiTokens;
```

### Tailwind Usage Examples

```typescript
// Button with One UI tokens
<button className="
  normal-case                        // Normal text (not uppercase)
  font-semibold                      // 600 weight
  tracking-normal                    // No extra spacing
  rounded-2xl                        // 32px radius (very rounded!)
  px-6 py-3                          // Generous padding
  min-h-[44px]                       // Minimum touch target
  shadow-[0_4px_12px_rgba(0,0,0,0.1)] // Prominent shadow
  transition-all duration-250        // 250ms transition
  ease-[cubic-bezier(0.33,0,0.2,1)]  // Smooth easing
  hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]
  hover:opacity-85                   // Hover feedback
  active:opacity-70                  // Press feedback
  focus:outline-none
  focus:ring-3                       // 3px focus ring
  focus:ring-primary
  focus:ring-offset-3                // 3px offset
  disabled:opacity-50
">
  Click Me
</button>

// Card with One UI styling
<div className="
  rounded-3xl                        // 48px radius (very rounded!)
  p-8                                // Generous padding (32px)
  shadow-[0_6px_16px_rgba(0,0,0,0.12)]
  transition-all duration-250
  hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]
">
  Card Content
</div>
```

---

## 📊 Token Comparison

### Side-by-Side Comparison

| Token                | Material Design     | Apple HIG        | Samsung One UI  |
| -------------------- | ------------------- | ---------------- | --------------- |
| **Text Case**        | UPPERCASE           | Sentence case    | Normal case     |
| **Default Radius**   | 4px                 | 12px             | 16px            |
| **Spacing Scale**    | Standard (8px grid) | Standard         | Generous (+25%) |
| **Shadow Strength**  | Medium              | Subtle           | Prominent       |
| **Transition Speed** | 200ms               | 150ms            | 250ms           |
| **Font Weight**      | 500                 | 600              | 600             |
| **Letter Spacing**   | Wide (+0.05em)      | Tight (-0.025em) | Normal          |
| **Active State**     | Opacity change      | Scale to 98%     | Opacity change  |

### Visual Comparison

```typescript
// Three buttons side by side

// Material Design
<button className="uppercase tracking-wide rounded-[4px] px-4 py-2 shadow-md duration-200">
  CLICK ME
</button>

// Apple HIG
<button className="tracking-tight rounded-md px-4 py-2 shadow-sm duration-150 active:scale-[0.98]">
  Click Me
</button>

// Samsung One UI
<button className="rounded-2xl px-6 py-3 shadow-lg duration-250">
  Click Me
</button>
```

---

## 🎨 Using Tokens in Components

### Approach 1: Inline Tokens (Recommended)

Components have tokens directly in their CVA definitions:

```typescript
// Material Design button
const buttonVariants = cva(
  "inline-flex items-center justify-center " +
    "uppercase tracking-wide font-medium " + // Material typography
    "rounded-[4px] " + // Material radius
    "transition-all duration-200 " + // Material motion
    "ease-[cubic-bezier(0.4,0,0.2,1)]", // Material easing
  {
    variants: {
      /* ... */
    },
  }
);
```

**Benefits:**

- No extra dependency
- Self-contained components
- Users see exact values

### Approach 2: Token Package (Optional)

Advanced users can reference tokens programmatically:

```typescript
import { materialTokens } from "@aneka-ui/tokens/material";

// Use in custom components
const MyComponent = styled.div`
  border-radius: ${materialTokens.radius.sm};
  box-shadow: ${materialTokens.shadows[2]};
  transition: all ${materialTokens.motion.duration.base}
    ${materialTokens.motion.easing.standard};
`;
```

---

## 🔧 Extending Tailwind Config

Users can extend their Tailwind config with design system tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Material Design shadows
      boxShadow: {
        "material-1": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "material-2": "0 2px 4px 0 rgb(0 0 0 / 0.1)",
        "material-4": "0 4px 8px 0 rgb(0 0 0 / 0.12)",
      },
      // Material Design transitions
      transitionDuration: {
        "material-fast": "150ms",
        "material-base": "200ms",
        "material-slow": "300ms",
      },
      transitionTimingFunction: {
        "material-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
};
```

---

## 📚 Related Specifications

- [Overview & Philosophy](./overview.md) - Understanding the approach
- [Components](./components.md) - Component implementations using tokens
- [Critical Requirements](./critical-requirements.md) - Token usage requirements

---

**These design tokens ensure authentic Material, HIG, and One UI patterns while allowing complete color customization.**
