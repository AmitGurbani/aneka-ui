import { describe, expect, it } from "vitest";

import {
  detectPackageManager,
  getInstallCommand,
  type PackageManager,
} from "../detect-package-manager.js";

describe("detectPackageManager", () => {
  it("should detect pnpm from monorepo root", async () => {
    // Navigate to monorepo root (2 levels up from packages/cli)
    const monorepoRoot = process.cwd().replace(/\/packages\/cli$/, "");
    const result = await detectPackageManager(monorepoRoot);
    expect(result).toBe("pnpm");
  });

  it("should return npm as default for non-existent directory", async () => {
    const result = await detectPackageManager("/non/existent/path");
    expect(result).toBe("npm");
  });

  it("should default to npm when no lock file exists", async () => {
    // Test with a directory that exists but has no lock files
    const result = await detectPackageManager("/tmp");
    expect(result).toBe("npm");
  });
});

describe("getInstallCommand", () => {
  it("should return correct command for pnpm", () => {
    const result = getInstallCommand("pnpm" as PackageManager, [
      "react",
      "typescript",
    ]);
    expect(result).toBe("pnpm add react typescript");
  });

  it("should return correct command for yarn", () => {
    const result = getInstallCommand("yarn" as PackageManager, [
      "react",
      "typescript",
    ]);
    expect(result).toBe("yarn add react typescript");
  });

  it("should return correct command for npm", () => {
    const result = getInstallCommand("npm" as PackageManager, [
      "react",
      "typescript",
    ]);
    expect(result).toBe("npm install react typescript");
  });

  it("should return correct command for bun", () => {
    const result = getInstallCommand("bun" as PackageManager, [
      "react",
      "typescript",
    ]);
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
