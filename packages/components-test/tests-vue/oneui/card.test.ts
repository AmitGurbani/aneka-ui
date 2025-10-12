import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Card from "../../src-vue/oneui/Card.vue";

describe("Samsung OneUI Card (Vue)", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const wrapper = mount(Card, {
        slots: { default: "Card content" },
      });
      expect(wrapper.text()).toBe("Card content");
    });

    it("should render as div element", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
      });
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("should render children correctly", () => {
      const wrapper = mount(Card, {
        slots: { default: "Test Card Content" },
      });
      expect(wrapper.text()).toBe("Test Card Content");
    });

    it("should render with complex children", () => {
      const wrapper = mount(Card, {
        slots: {
          default:
            '<div class="header">Title</div><div class="content">Body</div>',
        },
      });
      expect(wrapper.html()).toContain("Title");
      expect(wrapper.html()).toContain("Body");
    });
  });

  describe("Samsung OneUI Styling", () => {
    it("should have Samsung OneUI styling", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
      });
      expect(wrapper.classes()).toContain("rounded-2xl");
      expect(wrapper.classes()).toContain("border-2");
      expect(wrapper.classes()).toContain("bg-card");
      expect(wrapper.classes()).toContain("text-card-foreground");
    });

    it("should have Samsung OneUI shadow", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
      });
      expect(wrapper.html()).toContain("shadow-[0_4px_12px_rgba(0,0,0,0.1)]");
    });

    it("should have border styling", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
      });
      expect(wrapper.classes()).toContain("border-2");
      expect(wrapper.classes()).toContain("border-border");
    });

    it("should have rounded corners", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
      });
      expect(wrapper.classes()).toContain("rounded-2xl");
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      const wrapper = mount(Card, {
        props: { class: "custom-card" },
        slots: { default: "Content" },
      });
      expect(wrapper.classes()).toContain("custom-card");
    });

    it("should merge custom class with default classes", () => {
      const wrapper = mount(Card, {
        props: { class: "mt-4" },
        slots: { default: "Content" },
      });
      expect(wrapper.classes()).toContain("mt-4");
      expect(wrapper.classes()).toContain("rounded-2xl");
    });

    it("should accept HTML div attributes", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
        attrs: {
          role: "article",
          "aria-label": "Product card",
        },
      });
      expect(wrapper.attributes("role")).toBe("article");
      expect(wrapper.attributes("aria-label")).toBe("Product card");
    });

    it("should accept data attributes", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
        attrs: {
          "data-testid": "card",
          "data-card-id": "123",
        },
      });
      expect(wrapper.attributes("data-testid")).toBe("card");
      expect(wrapper.attributes("data-card-id")).toBe("123");
    });
  });

  describe("Accessibility", () => {
    it("should render with semantic HTML", () => {
      const wrapper = mount(Card, {
        slots: { default: "Accessible content" },
      });
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("should support role attribute", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
        attrs: { role: "article" },
      });
      expect(wrapper.attributes("role")).toBe("article");
    });

    it("should support aria-label", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
        attrs: { "aria-label": "Featured product" },
      });
      expect(wrapper.attributes("aria-label")).toBe("Featured product");
    });

    it("should support aria-describedby", () => {
      const wrapper = mount(Card, {
        slots: { default: "Content" },
        attrs: { "aria-describedby": "card-description" },
      });
      expect(wrapper.attributes("aria-describedby")).toBe("card-description");
    });
  });

  describe("Use Cases", () => {
    it("should render as product card", () => {
      const wrapper = mount(Card, {
        slots: {
          default: "<h3>Product Name</h3><p>$99.99</p>",
        },
      });
      expect(wrapper.html()).toContain("Product Name");
      expect(wrapper.html()).toContain("$99.99");
    });

    it("should render as info card", () => {
      const wrapper = mount(Card, {
        props: { class: "p-6" },
        slots: { default: "Information content" },
      });
      expect(wrapper.classes()).toContain("p-6");
    });

    it("should render as clickable card", () => {
      let clicked = false;
      const wrapper = mount(Card, {
        slots: { default: "Click me" },
        attrs: {
          onClick: () => {
            clicked = true;
          },
        },
      });

      wrapper.trigger("click");
      expect(clicked).toBe(true);
    });

    it("should render as nested card layout", () => {
      const wrapper = mount(Card, {
        slots: {
          default:
            '<div class="space-y-4"><div>Section 1</div><div>Section 2</div></div>',
        },
      });
      expect(wrapper.html()).toContain("Section 1");
      expect(wrapper.html()).toContain("Section 2");
    });
  });
});
