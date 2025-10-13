import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ButtonComponent } from "../../src-angular/hig/button.component";

describe("Apple HIG Button", () => {
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

    it("should have default variant classes", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("bg-primary")).toBe(true);
      expect(button?.classList.contains("text-primary-foreground")).toBe(true);
    });
  });

  describe("Variants", () => {
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
    });

    it("should render ghost variant", () => {
      component.variant = "ghost";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("text-primary")).toBe(true);
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
      expect(button?.classList.contains("h-11")).toBe(true);
      expect(button?.classList.contains("px-6")).toBe(true);
    });

    it("should render small size", () => {
      component.size = "sm";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-8")).toBe(true);
      expect(button?.classList.contains("px-4")).toBe(true);
      expect(button?.classList.contains("text-xs")).toBe(true);
    });

    it("should render large size", () => {
      component.size = "lg";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-13")).toBe(true);
      expect(button?.classList.contains("px-8")).toBe(true);
      expect(button?.classList.contains("text-base")).toBe(true);
    });

    it("should render icon size", () => {
      component.size = "icon";
      fixture.detectChanges();
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("h-11")).toBe(true);
      expect(button?.classList.contains("w-11")).toBe(true);
    });
  });

  describe("Apple HIG Styling", () => {
    it("should have tight tracking", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("tracking-tight")).toBe(true);
      expect(button?.classList.contains("font-semibold")).toBe(true);
    });

    it("should have rounded-md border radius", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("rounded-md")).toBe(true);
    });

    it("should have Apple HIG transitions", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("transition-all")).toBe(true);
      expect(button?.classList.contains("duration-150")).toBe(true);
    });

    it("should have active scale effect", () => {
      const button = compiled.querySelector("button");
      expect(button?.classList.contains("active:scale-[0.98]")).toBe(true);
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
