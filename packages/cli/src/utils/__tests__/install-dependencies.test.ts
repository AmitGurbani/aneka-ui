import { execa } from "execa";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  filterMissingPackages,
  getInstalledPackages,
} from "../install-dependencies.js";

// Mock dependencies
vi.mock("execa");
vi.mock("../detect-package-manager.js", () => ({
  detectPackageManager: vi.fn().mockResolvedValue("pnpm"),
}));

describe("getInstalledPackages", () => {
  const mockCwd = "/mock/path";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return installed packages for pnpm", async () => {
    const mockOutput = JSON.stringify({
      dependencies: {
        react: { version: "18.2.0" },
        "react-dom": { version: "18.2.0" },
        typescript: { version: "5.3.3" },
      },
    });

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const result = await getInstalledPackages(mockCwd);

    expect(result).toBeInstanceOf(Set);
    expect(result.has("react")).toBe(true);
    expect(result.has("react-dom")).toBe(true);
    expect(result.has("typescript")).toBe(true);
    expect(result.size).toBe(3);
  });

  it("should return empty set when no dependencies installed", async () => {
    const mockOutput = JSON.stringify({ dependencies: {} });

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const result = await getInstalledPackages(mockCwd);

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(0);
  });

  it("should return empty set when command fails", async () => {
    vi.mocked(execa).mockRejectedValue(new Error("Command failed"));

    const result = await getInstalledPackages(mockCwd);

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(0);
  });

  it("should handle missing dependencies field", async () => {
    const mockOutput = JSON.stringify({});

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const result = await getInstalledPackages(mockCwd);

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(0);
  });
});

describe("filterMissingPackages", () => {
  const mockCwd = "/mock/path";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should filter out already installed packages", async () => {
    const mockOutput = JSON.stringify({
      dependencies: {
        react: { version: "18.2.0" },
        typescript: { version: "5.3.3" },
      },
    });

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const packages = ["react", "vue", "typescript", "tailwindcss"];
    const result = await filterMissingPackages(packages, mockCwd);

    expect(result).toEqual(["vue", "tailwindcss"]);
  });

  it("should return all packages when none are installed", async () => {
    const mockOutput = JSON.stringify({ dependencies: {} });

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const packages = ["react", "vue", "typescript"];
    const result = await filterMissingPackages(packages, mockCwd);

    expect(result).toEqual(["react", "vue", "typescript"]);
  });

  it("should return empty array when all packages are installed", async () => {
    const mockOutput = JSON.stringify({
      dependencies: {
        react: { version: "18.2.0" },
        vue: { version: "3.3.4" },
      },
    });

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const packages = ["react", "vue"];
    const result = await filterMissingPackages(packages, mockCwd);

    expect(result).toEqual([]);
  });

  it("should handle packages with version specifiers", async () => {
    const mockOutput = JSON.stringify({
      dependencies: {
        react: { version: "18.2.0" },
      },
    });

    vi.mocked(execa).mockResolvedValue({
      stdout: mockOutput,
      stderr: "",
      exitCode: 0,
      command: "pnpm list --json --depth=0",
      escapedCommand: "pnpm list --json --depth=0",
      cwd: mockCwd,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    } as any);

    const packages = ["react@^18.0.0", "vue@^3.3.0"];
    const result = await filterMissingPackages(packages, mockCwd);

    // react is installed (version specifier should be stripped)
    // vue is not installed
    expect(result).toEqual(["vue@^3.3.0"]);
  });

  it("should return all packages when getting installed packages fails", async () => {
    vi.mocked(execa).mockRejectedValue(new Error("Command failed"));

    const packages = ["react", "vue", "typescript"];
    const result = await filterMissingPackages(packages, mockCwd);

    // When getInstalledPackages fails, it returns an empty Set
    // So all packages should be considered missing
    expect(result).toEqual(["react", "vue", "typescript"]);
  });
});
