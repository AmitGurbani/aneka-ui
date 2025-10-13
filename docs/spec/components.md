# Component Specifications

> **Specification Section:** Launch Components
> **Last Updated:** October 2025

This document defines the complete specifications for all 5 launch components across 3 design systems and 3 frameworks.

---

## 📦 Launch Components Overview

| Component   | Type     | Complexity | Dependencies                                     |
| ----------- | -------- | ---------- | ------------------------------------------------ |
| **Button**  | Basic    | Simple     | @radix-ui/react-slot (React only)                |
| **Card**    | Compound | Medium     | None                                             |
| **Badge**   | Basic    | Simple     | None                                             |
| **Dialog**  | Complex  | Advanced   | @radix-ui/react-dialog, radix-vue, @angular/cdk  |
| **Tooltip** | Complex  | Advanced   | @radix-ui/react-tooltip, radix-vue, @angular/cdk |

**Total Component Files:** 45

- 5 components × 3 design systems × 3 frameworks = 45 files

---

## 1️⃣ Button Component

### Specification

**Description:** Button component with multiple variants and sizes.

**Features:**

- 6 Variants: default, secondary, destructive, outline, ghost, link
- 4 Sizes: default, sm, lg, icon
- Full TypeScript support
- Ref forwarding (React/Angular)
- asChild pattern support (React/Vue)
- Dark mode support

**Dependencies:**

- **React:** `@radix-ui/react-slot` (for asChild pattern)
- **Vue:** None
- **Angular:** None

**Additional:**

- `class-variance-authority` (CVA)
- `clsx`
- `tailwind-merge`

### Material Design Button (React)

**File:** `registry/react/material/button.tsx`

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Material Design Button Variants
 * - Uppercase text with medium letter spacing
 * - 4px border radius
 * - Elevation shadows
 * - 200ms transitions with standard easing
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium uppercase tracking-wide rounded-[4px] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-primary/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-secondary/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-destructive/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Material Design Button Component
 *
 * @example
 * <Button>CLICK ME</Button>
 * <Button variant="destructive" size="lg">DELETE</Button>
 * <Button asChild><a href="/path">LINK BUTTON</a></Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### HIG Button Differences

**Key Changes from Material:**

- `normal-case` instead of `uppercase`
- `tracking-tight` instead of `tracking-wide`
- `font-semibold` instead of `font-medium`
- `rounded-md` (12px) instead of `rounded-[4px]`
- `duration-150` instead of `duration-200`
- Add `active:scale-[0.98]` for press feedback
- Softer shadows: `shadow-sm` instead of `shadow-[0_2px_4px]`

### OneUI Button Differences

**Key Changes from Material:**

- `normal-case` (same as HIG)
- `tracking-normal`
- `rounded-2xl` (32px) - very rounded!
- `duration-250` - slower transitions
- Larger padding: `px-6 py-3` for default size
- `min-h-[44px]` for accessibility
- Prominent shadows: `shadow-lg`

---

## 2️⃣ Card Component

### Specification

**Description:** Card container with header, content, and footer sections (compound component pattern).

**Sub-components:**

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Features:**

- Compound component pattern
- All sub-components accept className
- Full TypeScript support
- Ref forwarding for all components (React)
- Dark mode support

**Dependencies:** None (besides CVA, clsx, tailwind-merge)

### Material Design Card (React)

**File:** `registry/react/material/card.tsx`

```typescript
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Material Design Card
 * - 8px border radius
 * - 1px border
 * - Elevation 1 shadow
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

**Usage Example:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### HIG Card Differences

**Key Changes:**

- `rounded-xl` (20px) instead of `rounded-lg`
- Softer shadow: `shadow-sm` with subtle blur
- Slightly less padding in some areas

### OneUI Card Differences

**Key Changes:**

- `rounded-3xl` (48px) - very rounded!
- `p-8` for more generous padding
- Prominent shadow: `shadow-lg`
- Larger spacing between sections

---

## 3️⃣ Badge Component

### Specification

**Description:** Badge component for labels and status indicators.

**Features:**

- 4 Variants: default, secondary, destructive, outline
- Inline-flex layout
- Full TypeScript support
- Dark mode support

**Dependencies:** None (besides CVA, clsx, tailwind-merge)

### Material Design Badge (React)

**File:** `registry/react/material/badge.tsx`

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Material Design Badge
 * - Uppercase text
 * - Extra small text (xs)
 * - Fully rounded (pill shape)
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-destructive/80",
        outline: "border border-primary text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

**Usage Example:**

```tsx
<Badge>NEW</Badge>
<Badge variant="secondary">BETA</Badge>
<Badge variant="destructive">ERROR</Badge>
<Badge variant="outline">OUTLINE</Badge>
```

### HIG Badge Differences

**Key Changes:**

- `normal-case` instead of `uppercase`
- `rounded-md` (12px) instead of `rounded-full`
- `border` of 1px on all variants
- Softer shadows

### OneUI Badge Differences

**Key Changes:**

- `normal-case` with `font-bold`
- `text-sm` instead of `text-xs` (larger text)
- `rounded-full` (same as Material)
- `border-2` (thicker border)
- More padding: `px-3 py-1`

---

## 4️⃣ Dialog Component

### Specification

**Description:** Modal dialog with overlay and focus management.

**Sub-components:**

- `Dialog` - Root component
- `DialogTrigger` - Trigger button
- `DialogContent` - Dialog content container
- `DialogHeader` - Header section
- `DialogTitle` - Title (required for accessibility)
- `DialogDescription` - Description
- `DialogFooter` - Footer section
- `DialogClose` - Close button

**Features:**

- Focus trap when open
- Escape key closes
- Click outside closes
- Scroll lock on body
- Portal rendering
- Animation on open/close
- Accessible (ARIA attributes)

**Dependencies:**

- **React:** `@radix-ui/react-dialog`
- **Vue:** `radix-vue` (Dialog component)
- **Angular:** `@angular/cdk/dialog`

### Material Design Dialog (React)

**File:** `registry/react/material/dialog.tsx`

```typescript
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react"; // Note: User provides icons

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-[0_6px_12px_rgba(0,0,0,0.15)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-md sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

**Usage Example:**

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### HIG Dialog Differences

**Key Changes:**

- `rounded-xl` instead of `rounded-lg`
- Softer shadows
- Slightly different animation timing (150ms)

### OneUI Dialog Differences

**Key Changes:**

- `rounded-3xl` - very rounded corners
- Larger padding: `p-8`
- Prominent shadows
- Slower animations (250ms)

---

## 5️⃣ Tooltip Component

### Specification

**Description:** Tooltip with hover and keyboard support.

**Sub-components:**

- `TooltipProvider` - Context provider (React only)
- `Tooltip` - Root component
- `TooltipTrigger` - Trigger element
- `TooltipContent` - Tooltip content

**Features:**

- Hover delay (configurable)
- Keyboard accessible (focus shows tooltip)
- Collision detection (stays in viewport)
- Portal rendering
- Arrow pointer (optional)
- Animation on show/hide

**Dependencies:**

- **React:** `@radix-ui/react-tooltip`
- **Vue:** `radix-vue` (Tooltip component)
- **Angular:** `@angular/cdk/overlay` + custom implementation

### Material Design Tooltip (React)

**File:** `registry/react/material/tooltip.tsx`

```typescript
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

**Usage Example:**

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### HIG Tooltip Differences

**Key Changes:**

- `rounded-lg` (12px) instead of `rounded-md`
- Softer background: `bg-gray-900/90` instead of solid
- Backdrop blur: `backdrop-blur-sm`

### OneUI Tooltip Differences

**Key Changes:**

- `rounded-xl` (16px)
- Larger padding: `px-4 py-2`
- Larger text: `text-sm`
- Prominent background

---

## 📋 Component Checklist

### Required for All Components

- [ ] TypeScript strict mode compliance
- [ ] Full type exports (interfaces/types)
- [ ] Dark mode support (all variants)
- [ ] `className` prop support (for overrides)
- [ ] Proper ARIA attributes (where applicable)
- [ ] Focus management (keyboard navigation)
- [ ] Disabled state handling
- [ ] Loading state (where applicable)

### React-Specific Requirements

- [ ] `React.forwardRef` for all components
- [ ] `displayName` set for all components
- [ ] Proper prop spreading (`...props`)
- [ ] asChild pattern support (where applicable)

### Vue-Specific Requirements

- [ ] Composition API (`<script setup>`)
- [ ] Proper `defineProps` with types
- [ ] `defineEmits` where needed
- [ ] Slot support

### Angular-Specific Requirements

- [ ] Standalone component
- [ ] `@Input()` decorators with types
- [ ] `@Output()` decorators where needed
- [ ] Proper `ng-content` projection

---

## 🎨 Design System Differences Summary

### Button

| Aspect    | Material  | HIG        | OneUI     |
| --------- | --------- | ---------- | --------- |
| Text Case | UPPERCASE | Sentence   | Normal    |
| Radius    | 4px       | 12px       | 32px      |
| Padding   | px-4 py-2 | px-4 py-2  | px-6 py-3 |
| Shadow    | Medium    | Subtle     | Prominent |
| Active    | Opacity   | Scale 0.98 | Opacity   |

### Card

| Aspect  | Material | HIG    | OneUI     |
| ------- | -------- | ------ | --------- |
| Radius  | 8px      | 20px   | 48px      |
| Shadow  | Subtle   | Soft   | Prominent |
| Padding | p-6      | p-6    | p-8       |
| Border  | 1px      | Subtle | 2px       |

### Badge

| Aspect    | Material  | HIG    | OneUI  |
| --------- | --------- | ------ | ------ |
| Text Case | UPPERCASE | Normal | Normal |
| Text Size | xs        | xs     | sm     |
| Radius    | Full      | 12px   | Full   |
| Border    | None      | 1px    | 2px    |

### Dialog

| Aspect    | Material | HIG   | OneUI     |
| --------- | -------- | ----- | --------- |
| Radius    | 8px      | 20px  | 48px      |
| Shadow    | Medium   | Soft  | Prominent |
| Animation | 200ms    | 150ms | 250ms     |
| Padding   | p-6      | p-6   | p-8       |

### Tooltip

| Aspect     | Material    | HIG         | OneUI     |
| ---------- | ----------- | ----------- | --------- |
| Radius     | 4px         | 12px        | 16px      |
| Text Size  | xs          | xs          | sm        |
| Padding    | px-3 py-1.5 | px-3 py-1.5 | px-4 py-2 |
| Background | Solid       | Translucent | Solid     |

---

## 📚 Related Specifications

- [Design Tokens](./design-tokens.md) - Detailed token specifications
- [File Conventions](./file-conventions.md) - Naming and structure
- [Testing Requirements](./testing-requirements.md) - Component testing
- [Critical Requirements](./critical-requirements.md) - Non-negotiable rules

---

**These 5 components form the foundation of Aneka UI. All future components will follow these established patterns.**
