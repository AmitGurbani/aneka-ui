import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { cn } from "@/lib/utils";

@Component({
  selector: "aneka-tooltip",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  `,
})
export class TooltipComponent {
  @Input() class?: string;

  get computedClass(): string {
    return cn(
      "z-50 overflow-hidden rounded-[4px] bg-primary px-3 py-1.5 text-xs font-normal tracking-normal text-primary-foreground shadow-[0_2px_2px_-1px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]",
      this.class
    );
  }
}
