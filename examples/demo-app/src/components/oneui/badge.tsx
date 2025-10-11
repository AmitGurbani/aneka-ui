import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Samsung One UI Badge Variants
 * - Bold text (700 weight)
 * - Small text (14px)
 * - Pill shape (rounded-full)
 * - 2px border
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-3 py-1 text-sm font-bold tracking-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-destructive/80",
        outline: "border-2 border-primary text-foreground",
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

/**
 * Samsung One UI Badge Component
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
