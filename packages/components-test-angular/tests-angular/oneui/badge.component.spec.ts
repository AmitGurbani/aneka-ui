import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { BadgeComponent } from "../../src-angular/oneui/badge.component";

describe("OneUI Badge", () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should render", () => {
    expect(component).toBeTruthy();
    const badge = compiled.querySelector(".inline-flex");
    expect(badge).toBeTruthy();
  });

  describe("variants", () => {
    it("should render default variant", () => {
      component.variant = "default";
      fixture.detectChanges();
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("border-transparent")).toBe(true);
      expect(badge?.classList.contains("bg-primary")).toBe(true);
      expect(badge?.classList.contains("text-primary-foreground")).toBe(true);
    });

    it("should render secondary variant", () => {
      component.variant = "secondary";
      fixture.detectChanges();
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("border-transparent")).toBe(true);
      expect(badge?.classList.contains("bg-secondary")).toBe(true);
      expect(badge?.classList.contains("text-secondary-foreground")).toBe(true);
    });

    it("should render destructive variant", () => {
      component.variant = "destructive";
      fixture.detectChanges();
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("border-transparent")).toBe(true);
      expect(badge?.classList.contains("bg-destructive")).toBe(true);
      expect(badge?.classList.contains("text-destructive-foreground")).toBe(
        true
      );
    });

    it("should render outline variant", () => {
      component.variant = "outline";
      fixture.detectChanges();
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("text-foreground")).toBe(true);
    });
  });

  describe("OneUI-specific styling", () => {
    it("should have fully rounded corners", () => {
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("rounded-full")).toBe(true);
    });

    it("should have thicker border (2px)", () => {
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("border-2")).toBe(true);
    });

    it("should have bold font weight", () => {
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("font-bold")).toBe(true);
    });

    it("should have larger padding", () => {
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.classList.contains("px-3")).toBe(true);
      expect(badge?.classList.contains("py-1")).toBe(true);
    });
  });

  describe("content", () => {
    it("should display text content", () => {
      const badge = compiled.querySelector(".inline-flex");
      expect(badge?.textContent).toBeDefined();
    });
  });
});
