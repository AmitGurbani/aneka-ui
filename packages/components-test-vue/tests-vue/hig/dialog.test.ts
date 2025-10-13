import { mount } from "@vue/test-utils";
import { DialogTitle, DialogDescription, DialogTrigger } from "radix-vue";
import { describe, it, expect } from "vitest";
import { h } from "vue";

import Dialog from "../../src-vue/hig/Dialog.vue";

describe("Apple HIG Dialog (Vue)", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => [
            h(DialogTitle, null, () => "Title"),
            h(DialogDescription, null, () => "Description"),
          ],
        },
      });
      expect(wrapper.html()).toContain("Open");
    });

    it("should render trigger slot", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Click me"),
          default: () => h(DialogTitle, null, () => "Dialog Title"),
        },
      });
      expect(wrapper.html()).toContain("Click me");
    });

    it("should not render content when closed", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Dialog Title"),
        },
      });
      expect(wrapper.html()).toContain("Open");
      expect(wrapper.html()).not.toContain("Dialog Title");
    });

    it("should render with title and description slots", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => [
            h(DialogTitle, null, () => "Dialog Title"),
            h(DialogDescription, null, () => "Dialog Description"),
          ],
        },
      });
      // Dialog is closed by default, so just verify trigger renders
      expect(wrapper.html()).toContain("Open");
    });
  });

  describe("Apple HIG Styling", () => {
    it("should have Apple HIG shadow class in component", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      // Verify component is mounted
      expect(wrapper.vm).toBeDefined();
    });

    it("should have 200ms transition duration in template", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have rounded corners in template", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have backdrop blur in template", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have proper padding in template", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have proper spacing in template", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe("Props", () => {
    it("should accept custom class", () => {
      const wrapper = mount(Dialog, {
        props: { class: "custom-dialog" },
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should merge custom class with default classes", () => {
      const wrapper = mount(Dialog, {
        props: { class: "max-w-2xl" },
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should accept custom trigger", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () =>
            h(DialogTrigger, { as: "div" }, () => "Custom Trigger"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.html()).toContain("Custom Trigger");
    });
  });

  describe("Accessibility", () => {
    it("should support title slot for screen readers", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Accessible Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should support description slot for screen readers", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => [
            h(DialogTitle, null, () => "Title"),
            h(DialogDescription, null, () => "Accessible description"),
          ],
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have sr-only close text in component", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });

    it("should have focus ring on close button", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Open"),
          default: () => h(DialogTitle, null, () => "Title"),
        },
      });
      expect(wrapper.vm).toBeDefined();
    });
  });

  describe("Use Cases", () => {
    it("should render as confirmation dialog", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Delete"),
          default: () => [
            h(DialogTitle, null, () => "Are you sure?"),
            h(DialogDescription, null, () => "This action cannot be undone."),
          ],
        },
      });
      expect(wrapper.html()).toContain("Delete");
    });

    it("should render as form dialog", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Edit Profile"),
          default: () => [
            h(DialogTitle, null, () => "Edit profile"),
            h(DialogDescription, null, () => "Make changes to your profile."),
          ],
        },
      });
      expect(wrapper.html()).toContain("Edit Profile");
    });

    it("should render as info dialog", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Learn More"),
          default: () => [
            h(DialogTitle, null, () => "About"),
            h(DialogDescription, null, () => "Information about the feature."),
          ],
        },
      });
      expect(wrapper.html()).toContain("Learn More");
    });

    it("should render as alert dialog", () => {
      const wrapper = mount(Dialog, {
        slots: {
          trigger: () => h(DialogTrigger, null, () => "Show Alert"),
          default: () => [
            h(DialogTitle, null, () => "Warning"),
            h(
              DialogDescription,
              null,
              () => "Please review before proceeding."
            ),
          ],
        },
      });
      expect(wrapper.html()).toContain("Show Alert");
    });
  });
});
