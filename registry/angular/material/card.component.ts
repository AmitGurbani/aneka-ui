import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { cn } from "@/lib/utils";

@Component({
  selector: "aneka-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() class?: string;

  get computedClass(): string {
    return cn(
      "rounded-lg border border-border bg-card text-card-foreground shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]",
      this.class
    );
  }
}
