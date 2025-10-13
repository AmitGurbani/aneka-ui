import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { CardComponent } from "../../src-angular/hig/card.component";

describe("HIG Card", () => {
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

  describe("HIG Styling", () => {
    it("should have rounded corners (12px)", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("rounded-xl")).toBe(true);
    });

    it("should have border", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("border")).toBe(true);
      expect(card?.classList.contains("border-border")).toBe(true);
    });

    it("should have card background", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("bg-card")).toBe(true);
      expect(card?.classList.contains("text-card-foreground")).toBe(true);
    });

    it("should have HIG shadow", () => {
      const card = compiled.querySelector("div");
      expect(card?.className).toContain("shadow-[0_2px_6px_rgba(0,0,0,0.1)]");
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
      expect(card?.classList.contains("rounded-xl")).toBe(true);
    });
  });

  describe("Use Cases", () => {
    it("should work as a container", () => {
      const card = compiled.querySelector("div");
      expect(card?.classList.contains("bg-card")).toBe(true);
      expect(card?.classList.contains("border")).toBe(true);
    });

    it("should support content projection", () => {
      const card = compiled.querySelector("div");
      expect(card).toBeTruthy();
    });
  });
});
