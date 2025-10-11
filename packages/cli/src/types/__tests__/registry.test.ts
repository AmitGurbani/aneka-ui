import { describe, expect, it } from "vitest";

import { registryIndexSchema, registryItemSchema } from "../registry.js";

describe("registryItemSchema", () => {
  it("should validate a valid registry item", () => {
    const validItem = {
      name: "button",
      type: "component",
      framework: "react",
      style: "material",
      files: [
        {
          path: "components/button.tsx",
          content: "export const Button = () => {}",
          type: "component",
        },
      ],
      dependencies: ["react"],
      description: "A button component",
      version: "1.0.0",
    };

    const result = registryItemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
  });

  it("should validate item without optional fields", () => {
    const minimalItem = {
      name: "button",
      type: "component",
      framework: "react",
      style: "material",
      files: [
        {
          path: "components/button.tsx",
          type: "component",
        },
      ],
    };

    const result = registryItemSchema.safeParse(minimalItem);
    expect(result.success).toBe(true);
  });

  it("should reject invalid framework", () => {
    const invalidItem = {
      name: "button",
      type: "component",
      framework: "invalid",
      style: "material",
      files: [],
    };

    const result = registryItemSchema.safeParse(invalidItem);
    expect(result.success).toBe(false);
  });

  it("should reject invalid style", () => {
    const invalidItem = {
      name: "button",
      type: "component",
      framework: "react",
      style: "invalid",
      files: [],
    };

    const result = registryItemSchema.safeParse(invalidItem);
    expect(result.success).toBe(false);
  });

  it("should validate util type", () => {
    const utilItem = {
      name: "cn",
      type: "util",
      framework: "react",
      style: "material",
      files: [
        {
          path: "lib/utils.ts",
          type: "util",
        },
      ],
    };

    const result = registryItemSchema.safeParse(utilItem);
    expect(result.success).toBe(true);
  });

  it("should validate all frameworks", () => {
    const frameworks = ["react", "vue", "angular"];

    frameworks.forEach((framework) => {
      const item = {
        name: "button",
        type: "component",
        framework,
        style: "material",
        files: [],
      };

      const result = registryItemSchema.safeParse(item);
      expect(result.success).toBe(true);
    });
  });

  it("should validate all styles", () => {
    const styles = ["material", "hig", "oneui"];

    styles.forEach((style) => {
      const item = {
        name: "button",
        type: "component",
        framework: "react",
        style,
        files: [],
      };

      const result = registryItemSchema.safeParse(item);
      expect(result.success).toBe(true);
    });
  });

  it("should validate all file types", () => {
    const fileTypes = ["component", "util", "style"];

    fileTypes.forEach((type) => {
      const item = {
        name: "button",
        type: "component",
        framework: "react",
        style: "material",
        files: [{ path: "test.ts", type }],
      };

      const result = registryItemSchema.safeParse(item);
      expect(result.success).toBe(true);
    });
  });
});

describe("registryIndexSchema", () => {
  it("should validate a valid registry index", () => {
    const validIndex = [
      {
        name: "button",
        type: "component",
        description: "A button component",
        frameworks: ["react", "vue", "angular"],
        styles: ["material", "hig", "oneui"],
      },
      {
        name: "card",
        type: "component",
        description: "A card component",
        frameworks: ["react"],
        styles: ["material"],
      },
    ];

    const result = registryIndexSchema.safeParse(validIndex);
    expect(result.success).toBe(true);
  });

  it("should validate empty array", () => {
    const result = registryIndexSchema.safeParse([]);
    expect(result.success).toBe(true);
  });

  it("should validate util type in index", () => {
    const index = [
      {
        name: "cn",
        type: "util",
        description: "Utility function",
        frameworks: ["react"],
        styles: ["material"],
      },
    ];

    const result = registryIndexSchema.safeParse(index);
    expect(result.success).toBe(true);
  });

  it("should reject invalid type in index", () => {
    const invalidIndex = [
      {
        name: "button",
        type: "invalid",
        description: "A button",
        frameworks: ["react"],
        styles: ["material"],
      },
    ];

    const result = registryIndexSchema.safeParse(invalidIndex);
    expect(result.success).toBe(false);
  });

  it("should reject missing required fields", () => {
    const invalidIndex = [
      {
        name: "button",
        // missing type, description, frameworks, styles
      },
    ];

    const result = registryIndexSchema.safeParse(invalidIndex);
    expect(result.success).toBe(false);
  });
});
