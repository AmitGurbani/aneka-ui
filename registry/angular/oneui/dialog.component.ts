import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Dialog, DialogModule } from "@angular/cdk/dialog";
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
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-background p-8 shadow-[0_12px_24px_rgba(0,0,0,0.14)] duration-250 rounded-2xl",
      this.class
    );
  }
}
