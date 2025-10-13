/* eslint-disable import/no-unresolved */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

/**
 * Material Design 3 Button Variants
 * - Sentence case text with natural letter spacing
 * - Larger border radius (8-12px) for softer aesthetic
 * - Reduced elevation, color-based differentiation
 * - 200ms transitions with standard easing
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-normal transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        filled:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_1px_3px_rgba(0,0,0,0.12)]",
        "filled-tonal":
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        elevated:
          "bg-background text-primary shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-background/95 hover:shadow-[0_2px_6px_rgba(0,0,0,0.15)]",
        outlined:
          "border border-outline bg-background text-primary hover:bg-primary/8",
        text: "text-primary hover:bg-primary/8",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-8 px-3 py-1.5 text-xs rounded-md",
        lg: "h-12 px-6 py-3 text-base rounded-xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "filled",
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
 * Material Design 3 Button Component
 * Supports MD3 button types: filled, filled-tonal, elevated, outlined, and text
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
