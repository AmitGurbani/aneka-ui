import { DialogModule } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { cn } from "@/lib/utils";

@Component({
  selector: "aneka-dialog",
  standalone: true,
  imports: [CommonModule, DialogModule],
  template: `
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogComponent {
  @Input() class?: string;

  get computedClass(): string {
    return cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] duration-150 rounded-xl",
      this.class
    );
  }
}
