import { CdkTooltip } from "@angular/cdk/tooltip";
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { cn } from "../lib/utils";

@Component({
  selector: "aneka-tooltip",
  standalone: true,
  imports: [CommonModule, CdkTooltip],
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
      "z-50 overflow-hidden rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
      this.class
    );
  }
}
