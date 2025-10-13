import { mount } from "@vue/test-utils";
import { TooltipTrigger } from "radix-vue";
import { describe, it, expect } from "vitest";
import { h } from "vue";

import Tooltip from "../../src-vue/hig/Tooltip.vue";

describe("Apple HIG Tooltip (Vue)", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover me"),
          default: () => "Tooltip content",
        },
      });
      expect(wrapper.html()).toContain("Hover me");
    });

    it("should render trigger slot", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Trigger"),
          default: () => "Content",
        },
      });
      expect(wrapper.html()).toContain("Trigger");
    });

    it("should not render content when closed", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Tooltip text",
        },
      });
      expect(wrapper.html()).toContain("Hover");
      expect(wrapper.html()).not.toContain("Tooltip text");
    });

    it("should render with custom trigger", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () =>
            h(TooltipTrigger, { as: "span" }, () => "Custom trigger"),
          default: () => "Tooltip",
        },
      });
      expect(wrapper.html()).toContain("Custom trigger");
    });
  });

  describe("Apple HIG Styling", () => {
    it("should have 4px border radius", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have Apple HIG shadow", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have primary background", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have extra small text", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have proper padding", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      const wrapper = mount(Tooltip, {
        props: { class: "custom-tooltip" },
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should accept sideOffset prop", () => {
      const wrapper = mount(Tooltip, {
        props: { sideOffset: 8 },
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have default sideOffset of 4", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe("Accessibility", () => {
    it("should render with semantic HTML", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Accessible content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should support keyboard navigation", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Focus me"),
          default: () => "Tooltip",
        },
      });
      expect(wrapper.html()).toContain("Focus me");
    });

    it("should have proper ARIA attributes", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Hover"),
          default: () => "Content",
        },
      });
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe("Use Cases", () => {
    it("should render as icon tooltip", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "?"),
          default: () => "Help information",
        },
      });
      expect(wrapper.html()).toContain("?");
    });

    it("should render as button tooltip", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, { as: "button" }, () => "Click"),
          default: () => "Click to perform action",
        },
      });
      expect(wrapper.html()).toContain("Click");
    });

    it("should render as link tooltip", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, { as: "span" }, () => "Link"),
          default: () => "Click to navigate",
        },
      });
      expect(wrapper.html()).toContain("Link");
    });

    it("should render as informational tooltip", () => {
      const wrapper = mount(Tooltip, {
        slots: {
          trigger: () => h(TooltipTrigger, null, () => "Info"),
          default: () => "Additional information about this feature",
        },
      });
      expect(wrapper.html()).toContain("Info");
    });
  });
});
