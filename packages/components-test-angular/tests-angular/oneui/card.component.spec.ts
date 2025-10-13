import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { CardComponent } from "../../src-angular/oneui/card.component";

describe("OneUI Card", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe("Rendering", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should render as div element", () => {
      const card = compiled.querySelector("div");
      expect(card).toBeTruthy();
      expect(card?.tagName).toBe("DIV");
    });

    it("should render content correctly", () => {
      const card = compiled.querySelector("div");
      card!.textContent = "Card Content";
      expect(card?.textContent).toContain("Card Content");
    });
  });

  describe("OneUI Styling", () => {
    it("should have extra rounded corners (16px)", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("rounded-2xl")).toBe(true);
    });

    it("should have thicker border (2px)", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("border-2")).toBe(true);
      expect(card?.classList.contains("border-border")).toBe(true);
    });

    it("should have card background", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("bg-card")).toBe(true);
      expect(card?.classList.contains("text-card-foreground")).toBe(true);
    });

    it("should have OneUI shadow", () => {
      const card = compiled.querySelector("div");
      expect(card?.className).toContain("shadow-[0_4px_12px_rgba(0,0,0,0.1)]");
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      component.class = "custom-card";
      fixture.detectChanges();
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("custom-card")).toBe(true);
    });

    it("should merge custom class with default classes", () => {
      component.class = "p-6";
      fixture.detectChanges();
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("p-6")).toBe(true);
      expect(card?.classList.contains("rounded-2xl")).toBe(true);
    });
  });

  describe("Use Cases", () => {
    it("should work as a container", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("bg-card")).toBe(true);
      expect(card?.classList.contains("border-2")).toBe(true);
    });

    it("should support content projection", () => {
      const card = compiled.querySelector("div");
      expect(card).toBeTruthy();
    });
  });
});
