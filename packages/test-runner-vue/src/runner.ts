import { mount } from "@vue/test-utils";
import { describe, it, vi } from "vitest";

import { runActions } from "./actions";
import { runAssertions } from "./assertions";
import type { TestSpec, TestCase } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateVueTests(spec: TestSpec, Component: any): void {
  describe(`${spec.description || `${spec.designSystem} ${spec.component}`} [CONSOLIDATED]`, () => {
    Object.entries(spec.tests).forEach(([category, testCases]) => {
      // Skip non-array properties (safety check for spec validation)
      if (!Array.isArray(testCases)) {
        return;
      }

      describe(category, () => {
        testCases.forEach((testCase: TestCase) => {
          // Check if this test should be skipped for Vue
          if (testCase.skipFrameworks?.includes("vue")) {
            it.skip(testCase.name, () => {
              // Skipped: ${testCase.skipReason || "Framework-specific limitation"}
            });
            return;
          }

          it(testCase.name, async () => {
            // Create mock handlers for props
            const mockHandlers: Record<string, unknown> = {};
            const props = { ...testCase.props };

            // Replace handler references with actual mock functions
            Object.entries(props).forEach(([key, value]) => {
              if (typeof value === "string" && value === "mockHandler") {
                const handler = vi.fn();
                mockHandlers[value] = handler;
                props[key] = handler;
              }
            });

            // Mount component
            const wrapper = mount(Component, {
              props,
              slots: {
                default: testCase.children || "",
              },
            });

            // Run actions if any
            if (testCase.actions && testCase.actions.length > 0) {
              await runActions(testCase.actions, wrapper);
            }

            // Run assertions
            runAssertions(testCase.assertions, wrapper, mockHandlers);
          });
        });
      });
    });
  });
}
