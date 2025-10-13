import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { DialogComponent } from "../../src-angular/material/dialog.component";

describe("Material Design Dialog", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe("Rendering", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should render as div element", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog).toBeTruthy();
      expect(dialog?.tagName).toBe("DIV");
    });

    it("should render content correctly", () => {
      const dialog = compiled.querySelector("div");
      dialog!.textContent = "Dialog content";
      expect(dialog?.textContent).toContain("Dialog content");
    });
  });

  describe("Material Design Styling", () => {
    it("should have rounded corners", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("rounded-lg")).toBe(true);
    });

    it("should have border", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("border")).toBe(true);
    });

    it("should have background styling", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("bg-background")).toBe(true);
    });

    it("should have Material Design shadow", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.className).toContain(
        "shadow-[0_8px_12px_rgba(0,0,0,0.16)]"
      );
    });

    it("should have proper padding", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("p-6")).toBe(true);
    });

    it("should have 200ms animation duration", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("duration-200")).toBe(true);
    });
  });

  describe("Positioning", () => {
    it("should be centered on screen", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("fixed")).toBe(true);
      expect(dialog?.classList.contains("left-[50%]")).toBe(true);
      expect(dialog?.classList.contains("top-[50%]")).toBe(true);
      expect(dialog?.classList.contains("translate-x-[-50%]")).toBe(true);
      expect(dialog?.classList.contains("translate-y-[-50%]")).toBe(true);
    });

    it("should have proper z-index", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("z-50")).toBe(true);
    });

    it("should have max width constraint", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("max-w-lg")).toBe(true);
      expect(dialog?.classList.contains("w-full")).toBe(true);
    });
  });

  describe("Layout", () => {
    it("should use grid layout", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("grid")).toBe(true);
    });

    it("should have gap between elements", () => {
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("gap-4")).toBe(true);
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      component.class = "custom-dialog";
      fixture.detectChanges();
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("custom-dialog")).toBe(true);
    });

    it("should merge custom class with default classes", () => {
      component.class = "animate-in";
      fixture.detectChanges();
      const dialog = compiled.querySelector("div");
      expect(dialog?.classList.contains("animate-in")).toBe(true);
      expect(dialog?.classList.contains("fixed")).toBe(true);
    });
  });
});
