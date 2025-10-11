import fs from "fs/promises";

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  fileExists,
  readFile,
  showDiff,
  writeFile,
} from "../handle-conflicts.js";
import { logger } from "../logger.js";

describe("fileExists", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when file exists", async () => {
    vi.spyOn(fs, "access").mockResolvedValue(undefined);

    const result = await fileExists("/some/file.txt");

    expect(result).toBe(true);
    expect(fs.access).toHaveBeenCalledWith("/some/file.txt");
  });

  it("should return false when file does not exist", async () => {
    vi.spyOn(fs, "access").mockRejectedValue(new Error("ENOENT"));

    const result = await fileExists("/some/nonexistent.txt");

    expect(result).toBe(false);
  });
});

describe("readFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should read file content successfully", async () => {
    const mockContent = "file content here";
    vi.spyOn(fs, "readFile").mockResolvedValue(mockContent);

    const result = await readFile("/some/file.txt");

    expect(result).toBe(mockContent);
    expect(fs.readFile).toHaveBeenCalledWith("/some/file.txt", "utf-8");
  });

  it("should return null when file cannot be read", async () => {
    vi.spyOn(fs, "readFile").mockRejectedValue(new Error("ENOENT"));

    const result = await readFile("/some/nonexistent.txt");

    expect(result).toBeNull();
  });

  it("should return null on permission error", async () => {
    vi.spyOn(fs, "readFile").mockRejectedValue(new Error("EACCES"));

    const result = await readFile("/some/restricted.txt");

    expect(result).toBeNull();
  });
});

describe("writeFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should write file content successfully", async () => {
    vi.spyOn(fs, "mkdir").mockResolvedValue(undefined);
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    const filePath = "/some/dir/file.txt";
    const content = "test content";

    await writeFile(filePath, content);

    expect(fs.mkdir).toHaveBeenCalledWith("/some/dir", { recursive: true });
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, content, "utf-8");
  });

  it("should create nested directories", async () => {
    vi.spyOn(fs, "mkdir").mockResolvedValue(undefined);
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    const filePath = "/some/nested/deep/dir/file.txt";
    const content = "test content";

    await writeFile(filePath, content);

    expect(fs.mkdir).toHaveBeenCalledWith("/some/nested/deep/dir", {
      recursive: true,
    });
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, content, "utf-8");
  });

  it("should write to root level file", async () => {
    vi.spyOn(fs, "mkdir").mockResolvedValue(undefined);
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    const filePath = "/file.txt";
    const content = "test content";

    await writeFile(filePath, content);

    expect(fs.mkdir).toHaveBeenCalledWith("/", { recursive: true });
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, content, "utf-8");
  });
});

describe("showDiff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(logger, "log").mockImplementation(() => {});
    vi.spyOn(logger, "break").mockImplementation(() => {});
  });

  it("should display diff for added lines", () => {
    const oldContent = "line 1\nline 2";
    const newContent = "line 1\nline 2\nline 3";

    showDiff(oldContent, newContent, "/test/file.txt");

    expect(logger.log).toHaveBeenCalled();
    expect(logger.break).toHaveBeenCalled();
  });

  it("should display diff for removed lines", () => {
    const oldContent = "line 1\nline 2\nline 3";
    const newContent = "line 1\nline 2";

    showDiff(oldContent, newContent, "/test/file.txt");

    expect(logger.log).toHaveBeenCalled();
    expect(logger.break).toHaveBeenCalled();
  });

  it("should display diff for modified lines", () => {
    const oldContent = "line 1\nline 2\nline 3";
    const newContent = "line 1\nmodified line\nline 3";

    showDiff(oldContent, newContent, "/test/file.txt");

    expect(logger.log).toHaveBeenCalled();
    expect(logger.break).toHaveBeenCalled();
  });

  it("should display filename in diff header", () => {
    const oldContent = "test";
    const newContent = "test modified";

    showDiff(oldContent, newContent, "/path/to/my-file.tsx");

    // Check that filename is displayed
    const logCalls = vi.mocked(logger.log).mock.calls;
    const hasFilename = logCalls.some((call) =>
      call[0]?.toString().includes("my-file.tsx")
    );
    expect(hasFilename).toBe(true);
  });

  it("should call logger.break for formatting", () => {
    const oldContent = "test";
    const newContent = "modified";

    showDiff(oldContent, newContent, "/test/file.txt");

    // showDiff calls logger.break before and after the diff
    expect(logger.break).toHaveBeenCalled();
    expect(logger.break).toHaveBeenCalledTimes(3); // Called 3 times based on actual implementation
  });
});
