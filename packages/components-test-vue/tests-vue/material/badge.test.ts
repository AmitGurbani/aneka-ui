import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Badge from "../../src-vue/material/Badge.vue";

describe("Material Design Badge (Vue)", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const wrapper = mount(Badge, {
        slots: { default: "New" },
      });
      expect(wrapper.text()).toBe("New");
    });

    it("should render as div element", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Badge" },
      });
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("should render children correctly", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Test Badge" },
      });
      expect(wrapper.text()).toBe("Test Badge");
    });

    it("should render with numeric children", () => {
      const wrapper = mount(Badge, {
        slots: { default: "99" },
      });
      expect(wrapper.text()).toBe("99");
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      const wrapper = mount(Badge, {
        props: { variant: "default" },
        slots: { default: "Default" },
      });
      expect(wrapper.classes()).toContain("bg-primary");
      expect(wrapper.classes()).toContain("text-primary-foreground");
    });

    it("should render secondary variant", () => {
      const wrapper = mount(Badge, {
        props: { variant: "secondary" },
        slots: { default: "Secondary" },
      });
      expect(wrapper.classes()).toContain("bg-secondary");
      expect(wrapper.classes()).toContain("text-secondary-foreground");
    });

    it("should render destructive variant", () => {
      const wrapper = mount(Badge, {
        props: { variant: "destructive" },
        slots: { default: "Error" },
      });
      expect(wrapper.classes()).toContain("bg-destructive");
      expect(wrapper.classes()).toContain("text-destructive-foreground");
    });

    it("should render outline variant", () => {
      const wrapper = mount(Badge, {
        props: { variant: "outline" },
        slots: { default: "Outline" },
      });
      expect(wrapper.classes()).toContain("border");
      expect(wrapper.classes()).toContain("border-primary");
      expect(wrapper.classes()).toContain("text-foreground");
    });
  });

  describe("Material Design Styling", () => {
    it("should have uppercase text styling", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Material" },
      });
      expect(wrapper.classes()).toContain("uppercase");
      expect(wrapper.classes()).toContain("tracking-wide");
    });

    it("should have pill shape with rounded-full", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Pill" },
      });
      expect(wrapper.classes()).toContain("rounded-full");
    });

    it("should have extra small text size", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Small" },
      });
      expect(wrapper.classes()).toContain("text-xs");
    });

    it("should have semibold font weight", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Bold" },
      });
      expect(wrapper.classes()).toContain("font-semibold");
    });

    it("should have proper padding", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Padded" },
      });
      expect(wrapper.classes()).toContain("px-2.5");
      expect(wrapper.classes()).toContain("py-0.5");
    });

    it("should have subtle shadow on filled variants", () => {
      const wrapper = mount(Badge, {
        props: { variant: "default" },
        slots: { default: "Shadow" },
      });
      expect(wrapper.html()).toContain("shadow-[0_1px_2px_rgba(0,0,0,0.05)]");
    });

    it("should have border-transparent on filled variants", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Bordered" },
      });
      expect(wrapper.classes()).toContain("border-transparent");
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      const wrapper = mount(Badge, {
        props: { class: "custom-badge" },
        slots: { default: "Custom" },
      });
      expect(wrapper.classes()).toContain("custom-badge");
    });

    it("should merge custom class with default classes", () => {
      const wrapper = mount(Badge, {
        props: { class: "ml-4" },
        slots: { default: "Merged" },
      });
      expect(wrapper.classes()).toContain("ml-4");
      expect(wrapper.classes()).toContain("inline-flex");
    });

    it("should accept HTML div attributes", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Status" },
        attrs: {
          id: "test-badge",
          role: "status",
          "aria-label": "Status badge",
        },
      });
      expect(wrapper.attributes("id")).toBe("test-badge");
      expect(wrapper.attributes("role")).toBe("status");
      expect(wrapper.attributes("aria-label")).toBe("Status badge");
    });
  });

  describe("Accessibility", () => {
    it("should render with semantic HTML", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Accessible" },
      });
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("should support aria-label for icon-only badges", () => {
      const wrapper = mount(Badge, {
        slots: { default: "!" },
        attrs: { "aria-label": "Alert" },
      });
      expect(wrapper.attributes("aria-label")).toBe("Alert");
    });

    it("should support role attribute", () => {
      const wrapper = mount(Badge, {
        slots: { default: "Status" },
        attrs: { role: "status" },
      });
      expect(wrapper.attributes("role")).toBe("status");
    });
  });

  describe("Use Cases", () => {
    it("should render as notification badge", () => {
      const wrapper = mount(Badge, {
        props: { variant: "destructive" },
        slots: { default: "5" },
      });
      expect(wrapper.classes()).toContain("bg-destructive");
      expect(wrapper.text()).toBe("5");
    });

    it("should render as status badge", () => {
      const wrapper = mount(Badge, {
        props: { variant: "secondary" },
        slots: { default: "Active" },
      });
      expect(wrapper.classes()).toContain("bg-secondary");
    });

    it("should render as category badge", () => {
      const wrapper = mount(Badge, {
        props: { variant: "outline" },
        slots: { default: "Technology" },
      });
      expect(wrapper.classes()).toContain("border");
    });

    it("should render as count badge", () => {
      const wrapper = mount(Badge, {
        props: { variant: "default" },
        slots: { default: "99+" },
      });
      expect(wrapper.text()).toBe("99+");
    });
  });
});
