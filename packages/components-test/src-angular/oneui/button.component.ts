import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold rounded-2xl transition-all duration-250 ease-[cubic-bezier(0.33,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-primary/90 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-secondary/90 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-destructive/90 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        ghost: "text-primary hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7 py-4",
        sm: "h-10 px-5 py-3 text-xs",
        lg: "h-14 px-9 py-5 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
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
  @Input() variant: ButtonVariants["variant"] = "default";
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
