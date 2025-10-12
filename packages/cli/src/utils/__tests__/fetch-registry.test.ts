import fetch from "node-fetch";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  componentExists,
  fetchComponent,
  fetchComponents,
  fetchRegistryIndex,
} from "../fetch-registry.js";
import { logger } from "../logger.js";

// Mock dependencies
vi.mock("node-fetch");
vi.mock("../logger.js", () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("fetchRegistryIndex", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and parse registry index successfully", async () => {
    const mockIndex = [
      {
        name: "button",
        type: "component" as const,
        description: "Button component",
        frameworks: ["react" as const, "vue" as const],
        styles: ["material" as const, "hig" as const],
      },
      {
        name: "card",
        type: "component" as const,
        description: "Card component",
        frameworks: ["react" as const],
        styles: ["material" as const],
      },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockIndex,
    } as any);

    const result = await fetchRegistryIndex();

    expect(result).toEqual(mockIndex);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/index.json"));
  });

  it("should throw error when fetch fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    } as any);

    await expect(fetchRegistryIndex()).rejects.toThrow(
      "Failed to fetch registry: Not Found"
    );
    expect(logger.error).toHaveBeenCalledWith("Failed to fetch registry index");
  });

  it("should handle network errors", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    await expect(fetchRegistryIndex()).rejects.toThrow("Network error");
    expect(logger.error).toHaveBeenCalledWith("Failed to fetch registry index");
  });

  it("should handle invalid JSON response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    } as any);

    await expect(fetchRegistryIndex()).rejects.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });
});

describe("fetchComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch component successfully", async () => {
    const mockComponent = {
      name: "button",
      type: "component" as const,
      framework: "react" as const,
      style: "material" as const,
      files: [
        {
          path: "components/button.tsx",
          type: "component" as const,
          content: "export const Button = () => {}",
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockComponent,
    } as any);

    const result = await fetchComponent("button", "react", "material");

    expect(result).toEqual(mockComponent);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/react/material/button.json")
    );
  });

  it("should throw specific error for 404", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as any);

    await expect(
      fetchComponent("nonexistent", "react", "material")
    ).rejects.toThrow(
      'Component "nonexistent" not found for react (material style)'
    );
    expect(logger.error).toHaveBeenCalledWith(
      'Failed to fetch component "nonexistent"'
    );
  });

  it("should handle non-404 errors", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as any);

    await expect(fetchComponent("button", "react", "material")).rejects.toThrow(
      "Failed to fetch component: Internal Server Error"
    );
  });

  it("should fetch Vue component", async () => {
    const mockComponent = {
      name: "button",
      type: "component" as const,
      framework: "vue" as const,
      style: "hig" as const,
      files: [
        {
          path: "components/Button.vue",
          type: "component" as const,
          content: "<template><button></button></template>",
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockComponent,
    } as any);

    const result = await fetchComponent("button", "vue", "hig");

    expect(result.framework).toBe("vue");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/vue/hig/button.json")
    );
  });

  it("should fetch Angular component", async () => {
    const mockComponent = {
      name: "button",
      type: "component" as const,
      framework: "angular" as const,
      style: "oneui" as const,
      files: [
        {
          path: "components/button.component.ts",
          type: "component" as const,
          content: "@Component({}) export class ButtonComponent {}",
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockComponent,
    } as any);

    const result = await fetchComponent("button", "angular", "oneui");

    expect(result.framework).toBe("angular");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/angular/oneui/button.json")
    );
  });
});

describe("fetchComponents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch multiple components successfully", async () => {
    const mockButton = {
      name: "button",
      type: "component" as const,
      framework: "react" as const,
      style: "material" as const,
      files: [
        {
          path: "components/button.tsx",
          type: "component" as const,
          content: "export const Button = () => {}",
        },
      ],
    };

    const mockCard = {
      name: "card",
      type: "component" as const,
      framework: "react" as const,
      style: "material" as const,
      files: [
        {
          path: "components/card.tsx",
          type: "component" as const,
          content: "export const Card = () => {}",
        },
      ],
    };

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockButton,
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCard,
      } as any);

    const result = await fetchComponents(
      ["button", "card"],
      "react",
      "material"
    );

    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe("button");
    expect(result[1]?.name).toBe("card");
  });

  it("should handle partial failures and return successful components", async () => {
    const mockButton = {
      name: "button",
      type: "component" as const,
      framework: "react" as const,
      style: "material" as const,
      files: [
        {
          path: "components/button.tsx",
          type: "component" as const,
          content: "export const Button = () => {}",
        },
      ],
    };

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockButton,
      } as any)
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as any);

    const result = await fetchComponents(
      ["button", "nonexistent"],
      "react",
      "material"
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("button");
    expect(logger.warn).toHaveBeenCalledWith(
      "Some components could not be fetched:"
    );
    expect(logger.error).toHaveBeenCalled();
  });

  it("should return empty array when all fetches fail", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as any);

    const result = await fetchComponents(
      ["nonexistent1", "nonexistent2"],
      "react",
      "material"
    );

    expect(result).toHaveLength(0);
    expect(logger.warn).toHaveBeenCalled();
  });
});

describe("componentExists", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when component exists", async () => {
    const mockComponent = {
      name: "button",
      type: "component" as const,
      framework: "react" as const,
      style: "material" as const,
      files: [
        {
          path: "components/button.tsx",
          type: "component" as const,
          content: "export const Button = () => {}",
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockComponent,
    } as any);

    const result = await componentExists("button", "react", "material");

    expect(result).toBe(true);
  });

  it("should return false when component does not exist", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as any);

    const result = await componentExists("nonexistent", "react", "material");

    expect(result).toBe(false);
  });

  it("should return false on network error", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    const result = await componentExists("button", "react", "material");

    expect(result).toBe(false);
  });

  it("should check existence for Vue components", async () => {
    const mockComponent = {
      name: "button",
      type: "component" as const,
      framework: "vue" as const,
      style: "hig" as const,
      files: [
        {
          path: "components/Button.vue",
          type: "component" as const,
          content: "<template><button></button></template>",
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockComponent,
    } as any);

    const result = await componentExists("button", "vue", "hig");

    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/vue/hig/button.json")
    );
  });
});
