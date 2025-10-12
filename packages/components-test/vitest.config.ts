import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), vue()],
  // No aliases needed - components are synced to src/
  test: {
    globals: true,
    environment: "happy-dom",
    pool: "forks",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "tests/**/*.{test,spec}.{ts,tsx}",
      "tests-vue/**/*.{test,spec}.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}", "src-vue/**/*.vue"],
      exclude: [
        "**/*.d.ts",
        "**/*.config.*",
        "**/node_modules/**",
        "**/dist/**",
      ],
    },
  },
});
