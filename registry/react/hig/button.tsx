import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Apple HIG Button Variants
 * - Sentence case text with tight letter spacing
 * - 6px border radius
 * - Subtle shadows
 * - 150ms transitions with spring-like easing
 * - Scale down on press (active:scale-[0.98])
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold tracking-tight rounded-md transition-all duration-150 ease-[cubic-bezier(0.36,0,0.66,-0.56)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-secondary/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-destructive/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-primary/10 active:bg-primary/15",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-8 px-4 py-2 text-xs",
        lg: "h-13 px-8 py-4 text-base",
        icon: "h-11 w-11",
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
 * Apple HIG Button Component
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
