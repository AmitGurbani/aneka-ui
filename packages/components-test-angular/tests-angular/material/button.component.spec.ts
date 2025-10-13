import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ButtonComponent } from "../../src-angular/material/button.component";

describe("Material Design 3 Button", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe("Rendering", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should render as button element by default", () => {
      const button = compiled.querySelector("button");
      expect(button).toBeTruthy();
      expect(button?.tagName).toBe("BUTTON");
    });

    it("should render content correctly", () => {
      const button = compiled.querySelector("button");
      button!.textContent = "Test Button";
      expect(button?.textContent).toContain("Test Button");
    });

    it("should have default variant classes", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-primary")).toBe(true);
      expect(button?.classList.contains("text-primary-foreground")).toBe(true);
    });
  });

  describe("Variants", () => {
    it("should render filled variant (default)", () => {
      component.variant = "filled";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-primary")).toBe(true);
      expect(button?.classList.contains("text-primary-foreground")).toBe(true);
    });

    it("should render filled-tonal variant", () => {
      component.variant = "filled-tonal";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-secondary")).toBe(true);
      expect(button?.classList.contains("text-secondary-foreground")).toBe(
        true
      );
    });

    it("should render elevated variant", () => {
      component.variant = "elevated";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-background")).toBe(true);
      expect(button?.classList.contains("text-primary")).toBe(true);
    });

    it("should render outlined variant", () => {
      component.variant = "outlined";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("border")).toBe(true);
      expect(button?.classList.contains("border-outline")).toBe(true);
    });

    it("should render text variant", () => {
      component.variant = "text";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("text-primary")).toBe(true);
    });

    it("should render destructive variant", () => {
      component.variant = "destructive";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-destructive")).toBe(true);
      expect(button?.classList.contains("text-destructive-foreground")).toBe(
        true
      );
    });

    it("should render link variant", () => {
      component.variant = "link";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("text-primary")).toBe(true);
      expect(button?.classList.contains("underline-offset-4")).toBe(true);
    });
  });

  describe("Sizes", () => {
    it("should render default size", () => {
      component.size = "default";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-10")).toBe(true);
      expect(button?.classList.contains("px-4")).toBe(true);
    });

    it("should render small size", () => {
      component.size = "sm";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-8")).toBe(true);
      expect(button?.classList.contains("px-3")).toBe(true);
      expect(button?.classList.contains("text-xs")).toBe(true);
    });

    it("should render large size", () => {
      component.size = "lg";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-12")).toBe(true);
      expect(button?.classList.contains("px-6")).toBe(true);
      expect(button?.classList.contains("text-base")).toBe(true);
    });

    it("should render icon size", () => {
      component.size = "icon";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-10")).toBe(true);
      expect(button?.classList.contains("w-10")).toBe(true);
    });
  });

  describe("Material Design 3 Styling", () => {
    it("should have sentence case text with normal tracking", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("tracking-normal")).toBe(true);
      expect(button?.classList.contains("uppercase")).toBe(false);
    });

    it("should have rounded corners (8px for default)", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("rounded-lg")).toBe(true);
    });

    it("should have rounded-xl for large size", () => {
      component.size = "lg";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("rounded-xl")).toBe(true);
    });

    it("should have rounded-md for small size", () => {
      component.size = "sm";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("rounded-md")).toBe(true);
    });

    it("should have Material Design transitions", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("transition-all")).toBe(true);
      expect(button?.classList.contains("duration-200")).toBe(true);
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      component.class = "custom-class";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("custom-class")).toBe(true);
    });

    it("should apply disabled state", () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.disabled).toBe(true);
      expect(button?.classList.contains("disabled:pointer-events-none")).toBe(
        true
      );
      expect(button?.classList.contains("disabled:opacity-50")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("should have proper button element", () => {
      const button = compiled.querySelector("button");
      expect(button?.tagName).toBe("BUTTON");
    });

    it("should have focus-visible outline", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("focus-visible:outline-none")).toBe(
        true
      );
      expect(button?.classList.contains("focus-visible:ring-2")).toBe(true);
      expect(button?.classList.contains("focus-visible:ring-primary")).toBe(
        true
      );
    });
  });
});
