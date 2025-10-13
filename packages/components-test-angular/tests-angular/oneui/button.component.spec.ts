import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ButtonComponent } from "../../src-angular/oneui/button.component";

describe("OneUI Button", () => {
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

  it("should render", () => {
    expect(component).toBeTruthy();
    const button = compiled.querySelector("button");
    expect(button).toBeTruthy();
  });

  describe("variants", () => {
    it("should render default variant", () => {
      component.variant = "default";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-primary")).toBe(true);
      expect(button?.classList.contains("text-primary-foreground")).toBe(true);
    });

    it("should render secondary variant", () => {
      component.variant = "secondary";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-secondary")).toBe(true);
      expect(button?.classList.contains("text-secondary-foreground")).toBe(
        true
      );
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

    it("should render outline variant", () => {
      component.variant = "outline";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("border-2")).toBe(true);
      expect(button?.classList.contains("border-primary")).toBe(true);
      expect(button?.classList.contains("bg-background")).toBe(true);
      expect(button?.classList.contains("text-primary")).toBe(true);
    });

    it("should render ghost variant", () => {
      component.variant = "ghost";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("text-primary")).toBe(true);
      expect(button?.classList.contains("hover:bg-primary/10")).toBe(true);
    });

    it("should render link variant", () => {
      component.variant = "link";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("text-primary")).toBe(true);
      expect(button?.classList.contains("underline-offset-4")).toBe(true);
    });
  });

  describe("sizes", () => {
    it("should render default size", () => {
      component.size = "default";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-12")).toBe(true);
      expect(button?.classList.contains("px-7")).toBe(true);
      expect(button?.classList.contains("py-4")).toBe(true);
    });

    it("should render small size", () => {
      component.size = "sm";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-10")).toBe(true);
      expect(button?.classList.contains("px-5")).toBe(true);
      expect(button?.classList.contains("py-3")).toBe(true);
      expect(button?.classList.contains("text-xs")).toBe(true);
    });

    it("should render large size", () => {
      component.size = "lg";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-14")).toBe(true);
      expect(button?.classList.contains("px-9")).toBe(true);
      expect(button?.classList.contains("py-5")).toBe(true);
      expect(button?.classList.contains("text-base")).toBe(true);
    });

    it("should render icon size", () => {
      component.size = "icon";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-12")).toBe(true);
      expect(button?.classList.contains("w-12")).toBe(true);
    });
  });

  describe("OneUI-specific styling", () => {
    it("should have extra rounded corners (16px)", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("rounded-2xl")).toBe(true);
    });

    it("should have semibold font weight", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("font-semibold")).toBe(true);
    });

    it("should have smooth transition (250ms)", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("transition-all")).toBe(true);
      expect(button?.classList.contains("duration-250")).toBe(true);
    });

    it("should have cubic bezier easing", () => {
      const button = compiled.querySelector("button");
      expect(button?.className).toContain("ease-[cubic-bezier(0.33,0,0.2,1)]");
    });
  });

  describe("props", () => {
    it("should accept custom class", () => {
      component.class = "custom-class";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("custom-class")).toBe(true);
    });

    it("should handle disabled state", () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.disabled).toBe(true);
    });
  });

  describe("accessibility", () => {
    it("should be keyboard accessible", () => {
      const button = compiled.querySelector("button");
      expect(button?.tagName.toLowerCase()).toBe("button");
    });
  });
});
