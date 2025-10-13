import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { TooltipComponent } from "../../src-angular/material/tooltip.component";

describe("Material Design Tooltip", () => {
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

  describe("Rendering", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should render as div element", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip).toBeTruthy();
      expect(tooltip?.tagName).toBe("DIV");
    });

    it("should render content correctly", () => {
      const tooltip = compiled.querySelector("div");
      tooltip!.textContent = "Tooltip text";
      expect(tooltip?.textContent).toContain("Tooltip text");
    });
  });

  describe("Material Design Styling", () => {
    it("should have 4px border radius", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("rounded-[4px]")).toBe(true);
    });

    it("should have primary background", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("bg-primary")).toBe(true);
      expect(tooltip?.classList.contains("text-primary-foreground")).toBe(true);
    });

    it("should have proper padding", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("px-3")).toBe(true);
      expect(tooltip?.classList.contains("py-1.5")).toBe(true);
    });

    it("should have small text size", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("text-xs")).toBe(true);
    });

    it("should have Material Design shadow", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.className).toContain(
        "shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
      );
    });

    it("should have proper z-index", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("z-50")).toBe(true);
    });

    it("should have overflow-hidden", () => {
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("overflow-hidden")).toBe(true);
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      component.class = "custom-tooltip";
      fixture.detectChanges();
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("custom-tooltip")).toBe(true);
    });

    it("should merge custom class with default classes", () => {
      component.class = "animate-in";
      fixture.detectChanges();
      const tooltip = compiled.querySelector("div");
      expect(tooltip?.classList.contains("animate-in")).toBe(true);
      expect(tooltip?.classList.contains("bg-primary")).toBe(true);
    });
  });
});
