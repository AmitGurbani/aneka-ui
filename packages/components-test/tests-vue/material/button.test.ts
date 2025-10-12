import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Button from "../../src-vue/material/Button.vue";

describe("Material Design Button (Vue)", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const wrapper = mount(Button, {
        slots: {
          default: "Click me",
        },
      });
      expect(wrapper.text()).toBe("Click me");
      expect(wrapper.element.tagName).toBe("BUTTON");
    });

    it("should render as button element", () => {
      const wrapper = mount(Button, {
        slots: { default: "Button" },
      });
      expect(wrapper.element.tagName).toBe("BUTTON");
    });

    it("should render children correctly", () => {
      const wrapper = mount(Button, {
        slots: { default: "Test Content" },
      });
      expect(wrapper.text()).toBe("Test Content");
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "default" },
        slots: { default: "Default" },
      });
      expect(wrapper.classes()).toContain("bg-primary");
      expect(wrapper.classes()).toContain("text-primary-foreground");
    });

    it("should render secondary variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "secondary" },
        slots: { default: "Secondary" },
      });
      expect(wrapper.classes()).toContain("bg-secondary");
      expect(wrapper.classes()).toContain("text-secondary-foreground");
    });

    it("should render destructive variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "destructive" },
        slots: { default: "Delete" },
      });
      expect(wrapper.classes()).toContain("bg-destructive");
      expect(wrapper.classes()).toContain("text-destructive-foreground");
    });

    it("should render outline variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "outline" },
        slots: { default: "Outline" },
      });
      expect(wrapper.classes()).toContain("border-2");
      expect(wrapper.classes()).toContain("border-primary");
      expect(wrapper.classes()).toContain("text-primary");
    });

    it("should render ghost variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "ghost" },
        slots: { default: "Ghost" },
      });
      expect(wrapper.classes()).toContain("text-primary");
      expect(wrapper.classes()).toContain("hover:bg-primary/10");
    });

    it("should render link variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "link" },
        slots: { default: "Link" },
      });
      expect(wrapper.classes()).toContain("text-primary");
      expect(wrapper.classes()).toContain("underline-offset-4");
    });
  });

  describe("Sizes", () => {
    it("should render default size", () => {
      const wrapper = mount(Button, {
        props: { size: "default" },
        slots: { default: "Default Size" },
      });
      expect(wrapper.classes()).toContain("h-10");
      expect(wrapper.classes()).toContain("px-4");
    });

    it("should render small size", () => {
      const wrapper = mount(Button, {
        props: { size: "sm" },
        slots: { default: "Small" },
      });
      expect(wrapper.classes()).toContain("h-8");
      expect(wrapper.classes()).toContain("px-3");
      expect(wrapper.classes()).toContain("text-xs");
    });

    it("should render large size", () => {
      const wrapper = mount(Button, {
        props: { size: "lg" },
        slots: { default: "Large" },
      });
      expect(wrapper.classes()).toContain("h-12");
      expect(wrapper.classes()).toContain("px-6");
      expect(wrapper.classes()).toContain("text-base");
    });

    it("should render icon size", () => {
      const wrapper = mount(Button, {
        props: { size: "icon" },
        slots: { default: "🔍" },
      });
      expect(wrapper.classes()).toContain("h-10");
      expect(wrapper.classes()).toContain("w-10");
    });
  });

  describe("Material Design Styling", () => {
    it("should have uppercase text styling", () => {
      const wrapper = mount(Button, {
        slots: { default: "Material Button" },
      });
      expect(wrapper.classes()).toContain("uppercase");
      expect(wrapper.classes()).toContain("tracking-wide");
    });

    it("should have 4px border radius", () => {
      const wrapper = mount(Button, {
        slots: { default: "Material Button" },
      });
      expect(wrapper.classes()).toContain("rounded-[4px]");
    });

    it("should have Material Design transitions with standard easing", () => {
      const wrapper = mount(Button, {
        slots: { default: "Material Button" },
      });
      expect(wrapper.classes()).toContain("transition-all");
      expect(wrapper.classes()).toContain("duration-200");
      expect(wrapper.html()).toContain("cubic-bezier(0.4,0,0.2,1)");
    });

    it("should have elevation shadows", () => {
      const wrapper = mount(Button, {
        props: { variant: "default" },
        slots: { default: "Material Button" },
      });
      expect(wrapper.html()).toContain("shadow-[0_2px_4px_rgba(0,0,0,0.1)]");
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      const wrapper = mount(Button, {
        props: { class: "custom-button" },
        slots: { default: "Custom" },
      });
      expect(wrapper.classes()).toContain("custom-button");
    });

    it("should merge custom class with default classes", () => {
      const wrapper = mount(Button, {
        props: { class: "ml-4" },
        slots: { default: "Merged" },
      });
      expect(wrapper.classes()).toContain("ml-4");
      expect(wrapper.classes()).toContain("inline-flex");
    });

    it("should accept disabled attribute", () => {
      const wrapper = mount(Button, {
        attrs: { disabled: true },
        slots: { default: "Disabled" },
      });
      expect((wrapper.element as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe("Interactions", () => {
    it("should handle click events", async () => {
      let clicked = false;
      const wrapper = mount(Button, {
        slots: { default: "Click me" },
        attrs: {
          onClick: () => {
            clicked = true;
          },
        },
      });

      await wrapper.trigger("click");
      expect(clicked).toBe(true);
    });

    it("should not trigger click when disabled", async () => {
      let clicked = false;
      const wrapper = mount(Button, {
        slots: { default: "Disabled" },
        attrs: {
          disabled: true,
          onClick: () => {
            clicked = true;
          },
        },
      });

      await wrapper.trigger("click");
      expect(clicked).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("should have button role implicitly", () => {
      const wrapper = mount(Button, {
        slots: { default: "Accessible" },
      });
      expect(wrapper.element.tagName).toBe("BUTTON");
    });

    it("should support aria-label", () => {
      const wrapper = mount(Button, {
        slots: { default: "Delete" },
        attrs: { "aria-label": "Delete item" },
      });
      expect(wrapper.attributes("aria-label")).toBe("Delete item");
    });

    it("should have focus ring for keyboard navigation", () => {
      const wrapper = mount(Button, {
        slots: { default: "Focus" },
      });
      expect(wrapper.classes()).toContain("focus-visible:outline-none");
      expect(wrapper.classes()).toContain("focus-visible:ring-2");
    });

    it("should have disabled styling when disabled", () => {
      const wrapper = mount(Button, {
        slots: { default: "Disabled" },
        attrs: { disabled: true },
      });
      expect(wrapper.classes()).toContain("disabled:pointer-events-none");
      expect(wrapper.classes()).toContain("disabled:opacity-50");
    });
  });

  describe("Use Cases", () => {
    it("should render as primary CTA button", () => {
      const wrapper = mount(Button, {
        props: { variant: "default", size: "lg" },
        slots: { default: "Get Started" },
      });
      expect(wrapper.classes()).toContain("bg-primary");
      expect(wrapper.classes()).toContain("h-12");
    });

    it("should render as icon-only button", () => {
      const wrapper = mount(Button, {
        props: { variant: "ghost", size: "icon" },
        slots: { default: "×" },
        attrs: { "aria-label": "Close" },
      });
      expect(wrapper.classes()).toContain("h-10");
      expect(wrapper.classes()).toContain("w-10");
      expect(wrapper.attributes("aria-label")).toBe("Close");
    });

    it("should render as text link button", () => {
      const wrapper = mount(Button, {
        props: { variant: "link" },
        slots: { default: "Learn more" },
      });
      expect(wrapper.classes()).toContain("underline-offset-4");
    });
  });
});
