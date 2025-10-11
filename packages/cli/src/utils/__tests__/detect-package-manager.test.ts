import { describe, expect, it } from "vitest";

import { type PackageManager, getInstallCommand } from "../detect-package-manager.js";

describe("getInstallCommand", () => {
  it("should return correct command for pnpm", () => {
    const result = getInstallCommand("pnpm" as PackageManager, ["react", "typescript"]);
    expect(result).toBe("pnpm add react typescript");
  });

  it("should return correct command for yarn", () => {
    const result = getInstallCommand("yarn" as PackageManager, ["react", "typescript"]);
    expect(result).toBe("yarn add react typescript");
  });

  it("should return correct command for npm", () => {
    const result = getInstallCommand("npm" as PackageManager, ["react", "typescript"]);
    expect(result).toBe("npm install react typescript");
  });

  it("should return correct command for bun", () => {
    const result = getInstallCommand("bun" as PackageManager, ["react", "typescript"]);
    expect(result).toBe("bun add react typescript");
  });

  it("should handle single package", () => {
    const result = getInstallCommand("pnpm" as PackageManager, ["react"]);
    expect(result).toBe("pnpm add react");
  });

  it("should handle empty package array", () => {
    const result = getInstallCommand("pnpm" as PackageManager, []);
    expect(result).toBe("pnpm add ");
  });

  it("should handle multiple packages", () => {
    const result = getInstallCommand("npm" as PackageManager, [
      "react",
      "vue",
      "@types/node",
    ]);
    expect(result).toBe("npm install react vue @types/node");
  });
});
