import { describe, expect, it, vi } from "vitest";

import { validateNodeVersion } from "../validate-versions.js";

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
