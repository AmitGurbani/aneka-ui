import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { BadgeComponent } from "../../src-angular/material/badge.component";

describe("Material Design Badge", () => {
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

  describe("Rendering", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should render as div element", () => {
      const badge = compiled.querySelector("div");
      expect(badge).toBeTruthy();
      expect(badge?.tagName).toBe("DIV");
    });

    it("should render content correctly", () => {
      const badge = compiled.querySelector("div");
      badge!.textContent = "New";
      expect(badge?.textContent).toContain("New");
    });

    it("should have default variant classes", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("bg-primary")).toBe(true);
      expect(badge?.classList.contains("text-primary-foreground")).toBe(true);
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      component.variant = "default";
      fixture.detectChanges();
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("bg-primary")).toBe(true);
      expect(badge?.classList.contains("text-primary-foreground")).toBe(true);
      expect(badge?.classList.contains("border-transparent")).toBe(true);
    });

    it("should render secondary variant", () => {
      component.variant = "secondary";
      fixture.detectChanges();
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("bg-secondary")).toBe(true);
      expect(badge?.classList.contains("text-secondary-foreground")).toBe(true);
    });

    it("should render destructive variant", () => {
      component.variant = "destructive";
      fixture.detectChanges();
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("bg-destructive")).toBe(true);
      expect(badge?.classList.contains("text-destructive-foreground")).toBe(
        true
      );
    });

    it("should render outline variant", () => {
      component.variant = "outline";
      fixture.detectChanges();
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("border")).toBe(true);
      expect(badge?.classList.contains("border-primary")).toBe(true);
      expect(badge?.classList.contains("text-foreground")).toBe(true);
    });
  });

  describe("Material Design Styling", () => {
    it("should have uppercase text styling", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("uppercase")).toBe(true);
      expect(badge?.classList.contains("tracking-wide")).toBe(true);
    });

    it("should have rounded-full shape", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("rounded-full")).toBe(true);
    });

    it("should have proper padding", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("px-2.5")).toBe(true);
      expect(badge?.classList.contains("py-0.5")).toBe(true);
    });

    it("should have small text size", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("text-xs")).toBe(true);
      expect(badge?.classList.contains("font-semibold")).toBe(true);
    });

    it("should have Material Design transitions", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("transition-colors")).toBe(true);
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      component.class = "custom-badge";
      fixture.detectChanges();
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("custom-badge")).toBe(true);
    });

    it("should merge custom class with default classes", () => {
      component.class = "ml-2";
      fixture.detectChanges();
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("ml-2")).toBe(true);
      expect(badge?.classList.contains("inline-flex")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("should have focus ring for keyboard navigation", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("focus:outline-none")).toBe(true);
      expect(badge?.classList.contains("focus:ring-2")).toBe(true);
      expect(badge?.classList.contains("focus:ring-ring")).toBe(true);
    });

    it("should have inline-flex display", () => {
      const badge = compiled.querySelector("div");
      expect(badge?.classList.contains("inline-flex")).toBe(true);
      expect(badge?.classList.contains("items-center")).toBe(true);
    });
  });
});
