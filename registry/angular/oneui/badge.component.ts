import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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

type BadgeVariants = VariantProps<typeof badgeVariants>;

@Component({
  selector: "aneka-badge",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariants["variant"] = "default";
  @Input() class?: string;

  get computedClass(): string {
    return cn(badgeVariants({ variant: this.variant }), this.class);
  }
}
