import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Button from "../../src-vue/hig/Button.vue";

describe("Apple HIG Button (Vue)", () => {
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

    it("should forward ref to button element", () => {
      const wrapper = mount(Button, {
        slots: { default: "Click me" },
      });
      expect(wrapper.element).toBeInstanceOf(HTMLButtonElement);
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
      expect(wrapper.classes()).toContain("h-11");
      expect(wrapper.classes()).toContain("px-6");
    });

    it("should render small size", () => {
      const wrapper = mount(Button, {
        props: { size: "sm" },
        slots: { default: "Small" },
      });
      expect(wrapper.classes()).toContain("h-8");
      expect(wrapper.classes()).toContain("px-4");
      expect(wrapper.classes()).toContain("text-xs");
    });

    it("should render large size", () => {
      const wrapper = mount(Button, {
        props: { size: "lg" },
        slots: { default: "Large" },
      });
      expect(wrapper.classes()).toContain("h-13");
      expect(wrapper.classes()).toContain("px-8");
      expect(wrapper.classes()).toContain("text-base");
    });

    it("should render icon size", () => {
      const wrapper = mount(Button, {
        props: { size: "icon" },
        slots: { default: "🔍" },
      });
      expect(wrapper.classes()).toContain("h-11");
      expect(wrapper.classes()).toContain("w-11");
    });
  });

  describe("Apple HIG Styling", () => {
    it("should have sentence case text styling (not uppercase)", () => {
      const wrapper = mount(Button, {
        slots: { default: "Apple Button" },
      });
      expect(wrapper.classes()).toContain("tracking-tight");
      expect(wrapper.classes()).not.toContain("uppercase");
    });

    it("should have 6px border radius", () => {
      const wrapper = mount(Button, {
        slots: { default: "Apple Button" },
      });
      expect(wrapper.classes()).toContain("rounded-md");
    });

    it("should have 150ms spring easing transitions", () => {
      const wrapper = mount(Button, {
        slots: { default: "Apple Button" },
      });
      expect(wrapper.classes()).toContain("transition-all");
      expect(wrapper.classes()).toContain("duration-150");
      expect(wrapper.html()).toContain("cubic-bezier(0.36,0,0.66,-0.56)");
    });

    it("should have scale-down hover effect on filled variants", () => {
      const wrapper = mount(Button, {
        props: { variant: "default" },
        slots: { default: "Apple Button" },
      });
      expect(wrapper.html()).toContain("active:scale-[0.98]");
    });

    it("should have subtle shadow on filled variants", () => {
      const wrapper = mount(Button, {
        props: { variant: "default" },
        slots: { default: "Apple Button" },
      });
      expect(wrapper.html()).toContain("shadow-[0_2px_6px_rgba(0,0,0,0.1)]");
    });

    it("should have no shadow on ghost variant", () => {
      const wrapper = mount(Button, {
        props: { variant: "ghost" },
        slots: { default: "Ghost" },
      });
      expect(wrapper.html()).not.toContain("shadow-");
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
      expect(wrapper.classes()).toContain("h-13");
    });

    it("should render as icon-only button", () => {
      const wrapper = mount(Button, {
        props: { variant: "ghost", size: "icon" },
        slots: { default: "×" },
        attrs: { "aria-label": "Close" },
      });
      expect(wrapper.classes()).toContain("h-11");
      expect(wrapper.classes()).toContain("w-11");
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
