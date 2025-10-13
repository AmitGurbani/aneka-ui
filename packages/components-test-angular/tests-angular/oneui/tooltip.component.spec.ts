import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { TooltipComponent } from "../../src-angular/oneui/tooltip.component";

describe("OneUI Tooltip", () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should render", () => {
    expect(component).toBeTruthy();
    const tooltip = compiled.querySelector(".z-50");
    expect(tooltip).toBeTruthy();
  });

  describe("OneUI-specific styling", () => {
    it("should have extra rounded corners (16px)", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("rounded-2xl")).toBe(true);
    });

    it("should have proper z-index", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("z-50")).toBe(true);
    });

    it("should have overflow hidden", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("overflow-hidden")).toBe(true);
    });

    it("should have primary background", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("bg-primary")).toBe(true);
    });

    it("should have primary foreground text", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("text-primary-foreground")).toBe(true);
    });

    it("should have larger padding", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("px-4")).toBe(true);
      expect(tooltip?.classList.contains("py-2")).toBe(true);
    });

    it("should have small text size", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("text-sm")).toBe(true);
    });

    it("should have OneUI shadow", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.className).toContain(
        "shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      );
    });
  });

  describe("content", () => {
    it("should display content", () => {
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip).toBeTruthy();
    });
  });

  describe("custom styling", () => {
    it("should accept custom class", () => {
      component.class = "custom-class";
      fixture.detectChanges();
      const tooltip = compiled.querySelector(".z-50");
      expect(tooltip?.classList.contains("custom-class")).toBe(true);
    });
  });
});
