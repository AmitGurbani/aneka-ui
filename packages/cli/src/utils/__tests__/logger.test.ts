import { beforeEach, describe, expect, it, vi } from "vitest";

import { logger } from "../logger.js";

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should log info messages", () => {
    logger.info("test message");
    expect(console.log).toHaveBeenCalled();
  });

  it("should log success messages", () => {
    logger.success("test success");
    expect(console.log).toHaveBeenCalled();
  });

  it("should log warning messages", () => {
    logger.warn("test warning");
    expect(console.log).toHaveBeenCalled();
  });

  it("should log error messages", () => {
    logger.error("test error");
    expect(console.log).toHaveBeenCalled();
  });

  it("should log line breaks", () => {
    logger.break();
    expect(console.log).toHaveBeenCalledWith();
  });

  it("should log plain messages", () => {
    logger.log("plain message");
    expect(console.log).toHaveBeenCalledWith("plain message");
  });

  it("should highlight text", () => {
    const result = logger.highlight("test");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should dim text", () => {
    const result = logger.dim("test");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should bold text", () => {
    const result = logger.bold("test");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
});
