import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkTooltip } from "@angular/cdk/tooltip";
import { cn } from "@/lib/utils";

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
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)]",
      this.class
    );
  }
}
