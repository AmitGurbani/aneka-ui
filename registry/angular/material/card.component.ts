import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@/lib/utils';

@Component({
  selector: 'aneka-card',
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
      'rounded-lg border border-border bg-card text-card-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
      this.class
    );
  }
}
