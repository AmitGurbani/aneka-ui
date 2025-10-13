import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Button from "../../src-vue/material/Button.vue";

describe("Material Design 3 Button (Vue)", () => {
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
    it("should render filled variant (default)", () => {
      const wrapper = mount(Button, {
        props: { variant: "filled" },
        slots: { default: "Filled" },
      });
      expect(wrapper.classes()).toContain("bg-primary");
      expect(wrapper.classes()).toContain("text-primary-foreground");
    });

    it("should render filled-tonal variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "filled-tonal" },
        slots: { default: "Filled Tonal" },
      });
      expect(wrapper.classes()).toContain("bg-secondary");
      expect(wrapper.classes()).toContain("text-secondary-foreground");
    });

    it("should render elevated variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "elevated" },
        slots: { default: "Elevated" },
      });
      expect(wrapper.classes()).toContain("bg-background");
      expect(wrapper.classes()).toContain("text-primary");
    });

    it("should render outlined variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "outlined" },
        slots: { default: "Outlined" },
      });
      expect(wrapper.classes()).toContain("border");
      expect(wrapper.classes()).toContain("border-outline");
    });

    it("should render text variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "text" },
        slots: { default: "Text" },
      });
      expect(wrapper.classes()).toContain("text-primary");
    });

    it("should render destructive variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "destructive" },
        slots: { default: "Delete" },
      });
      expect(wrapper.classes()).toContain("bg-destructive");
      expect(wrapper.classes()).toContain("text-destructive-foreground");
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

  describe("Material Design 3 Styling", () => {
    it("should have sentence case text with normal tracking", () => {
      const wrapper = mount(Button, {
        slots: { default: "Material Button" },
      });
      expect(wrapper.classes()).toContain("tracking-normal");
      expect(wrapper.classes()).not.toContain("uppercase");
    });

    it("should have rounded corners (8px for default)", () => {
      const wrapper = mount(Button, {
        slots: { default: "Material Button" },
      });
      expect(wrapper.classes()).toContain("rounded-lg");
    });

    it("should have rounded-xl for large size", () => {
      const wrapper = mount(Button, {
        props: { size: "lg" },
        slots: { default: "Large Button" },
      });
      expect(wrapper.classes()).toContain("rounded-xl");
    });

    it("should have rounded-md for small size", () => {
      const wrapper = mount(Button, {
        props: { size: "sm" },
        slots: { default: "Small Button" },
      });
      expect(wrapper.classes()).toContain("rounded-md");
    });

    it("should have Material Design transitions with standard easing", () => {
      const wrapper = mount(Button, {
        slots: { default: "Material Button" },
      });
      expect(wrapper.classes()).toContain("transition-all");
      expect(wrapper.classes()).toContain("duration-200");
      expect(wrapper.html()).toContain("cubic-bezier(0.4,0,0.2,1)");
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
        props: { variant: "filled", size: "lg" },
        slots: { default: "Get Started" },
      });
      expect(wrapper.classes()).toContain("bg-primary");
      expect(wrapper.classes()).toContain("h-12");
    });

    it("should render as icon-only button", () => {
      const wrapper = mount(Button, {
        props: { variant: "text", size: "icon" },
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
