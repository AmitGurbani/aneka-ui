import fs from "fs/promises";
import path from "path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  hasTailwindConfig,
  validateNodeVersion,
  validatePackageVersions,
} from "../validate-versions.js";

describe("validateNodeVersion", () => {
  it("should return true for Node.js version >= 18.0.0", () => {
    // Current Node version should be >= 18
    const result = validateNodeVersion();
    expect(result).toBe(true);
  });

  it("should validate current Node.js version correctly", () => {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

    const result = validateNodeVersion();

    if (majorVersion >= 18) {
      expect(result).toBe(true);
    } else {
      expect(result).toBe(false);
    }
  });
});

describe("validatePackageVersions", () => {
  const mockCwd = "/mock/path";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate package.json with all valid versions", async () => {
    const mockPackageJson = {
      dependencies: {
        react: "^19.2.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it("should warn about missing TypeScript", async () => {
    const mockPackageJson = {
      dependencies: {
        react: "^19.2.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {},
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(false);
    expect(result.warnings).toContain("TypeScript is not installed");
  });

  it("should warn about missing Tailwind CSS", async () => {
    const mockPackageJson = {
      dependencies: {
        react: "^19.2.0",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(false);
    expect(result.warnings).toContain("Tailwind CSS is not installed");
  });

  it("should warn about outdated TypeScript version", async () => {
    const mockPackageJson = {
      dependencies: {
        react: "^19.2.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^4.9.0",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(false);
    expect(
      result.warnings.some((w) => w.includes("TypeScript 5.0.0+"))
    ).toBeTruthy();
  });

  it("should warn about outdated React version", async () => {
    const mockPackageJson = {
      dependencies: {
        react: "^17.0.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(false);
    expect(
      result.warnings.some((w) => w.includes("React 18.0.0+"))
    ).toBeTruthy();
  });

  it("should validate Vue framework version", async () => {
    const mockPackageJson = {
      dependencies: {
        vue: "^3.3.4",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "vue");

    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it("should warn about outdated Vue version", async () => {
    const mockPackageJson = {
      dependencies: {
        vue: "^3.2.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "vue");

    expect(result.valid).toBe(false);
    expect(result.warnings.some((w) => w.includes("Vue 3.3.0+"))).toBeTruthy();
  });

  it("should validate Angular framework version", async () => {
    const mockPackageJson = {
      dependencies: {
        "@angular/core": "^17.1.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "angular");

    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it("should warn about outdated Angular version", async () => {
    const mockPackageJson = {
      dependencies: {
        "@angular/core": "^16.0.0",
        tailwindcss: "^4.1.14",
      },
      devDependencies: {
        typescript: "^5.3.3",
      },
    };

    vi.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockPackageJson));

    const result = await validatePackageVersions(mockCwd, "angular");

    expect(result.valid).toBe(false);
    expect(
      result.warnings.some((w) => w.includes("Angular 17.0.0+"))
    ).toBeTruthy();
  });

  it("should handle missing package.json file", async () => {
    vi.spyOn(fs, "readFile").mockRejectedValue(
      new Error("ENOENT: no such file")
    );

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(false);
    expect(result.warnings).toContain("Could not read package.json");
  });

  it("should handle invalid JSON in package.json", async () => {
    vi.spyOn(fs, "readFile").mockResolvedValue("invalid json");

    const result = await validatePackageVersions(mockCwd, "react");

    expect(result.valid).toBe(false);
    expect(result.warnings).toContain("Could not read package.json");
  });
});

describe("hasTailwindConfig", () => {
  const mockCwd = "/mock/path";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when tailwind.config.js exists", async () => {
    vi.spyOn(fs, "access").mockResolvedValue(undefined);

    const result = await hasTailwindConfig(mockCwd);

    expect(result).toBe(true);
    expect(fs.access).toHaveBeenCalledWith(
      path.join(mockCwd, "tailwind.config.js")
    );
  });

  it("should return true when tailwind.config.ts exists", async () => {
    vi.spyOn(fs, "access")
      .mockRejectedValueOnce(new Error("Not found"))
      .mockRejectedValueOnce(new Error("Not found"))
      .mockRejectedValueOnce(new Error("Not found"))
      .mockResolvedValueOnce(undefined);

    const result = await hasTailwindConfig(mockCwd);

    expect(result).toBe(true);
    expect(fs.access).toHaveBeenCalledWith(
      path.join(mockCwd, "tailwind.config.ts")
    );
  });

  it("should return false when no config file exists", async () => {
    vi.spyOn(fs, "access").mockRejectedValue(new Error("Not found"));

    const result = await hasTailwindConfig(mockCwd);

    expect(result).toBe(false);
  });

  it("should check all possible config file extensions", async () => {
    vi.spyOn(fs, "access").mockRejectedValue(new Error("Not found"));

    await hasTailwindConfig(mockCwd);

    expect(fs.access).toHaveBeenCalledTimes(4);
    expect(fs.access).toHaveBeenCalledWith(
      path.join(mockCwd, "tailwind.config.js")
    );
    expect(fs.access).toHaveBeenCalledWith(
      path.join(mockCwd, "tailwind.config.cjs")
    );
    expect(fs.access).toHaveBeenCalledWith(
      path.join(mockCwd, "tailwind.config.mjs")
    );
    expect(fs.access).toHaveBeenCalledWith(
      path.join(mockCwd, "tailwind.config.ts")
    );
  });
});
