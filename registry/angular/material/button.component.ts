import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

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

type ButtonVariants = VariantProps<typeof buttonVariants>;

@Component({
  selector: "aneka-button",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="computedClass" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariants["variant"] = "filled";
  @Input() size: ButtonVariants["size"] = "default";
  @Input() class?: string;
  @Input() disabled = false;

  get computedClass(): string {
    return cn(
      buttonVariants({ variant: this.variant, size: this.size }),
      this.class
    );
  }
}
