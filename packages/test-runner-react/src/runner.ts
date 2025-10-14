import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import { runActions } from "./actions";
import { runAssertions } from "./assertions";
import type { TestSpec, TestCase } from "./types";

export function generateReactTests(
  spec: TestSpec,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>
): void {
  describe(`${spec.description || `${spec.designSystem} ${spec.component}`} [CONSOLIDATED]`, () => {
    Object.entries(spec.tests).forEach(([category, testCases]) => {
      // Skip non-array properties (safety check for spec validation)
      if (!Array.isArray(testCases)) {
        return;
      }

      describe(category, () => {
        testCases.forEach((testCase: TestCase) => {
          // Check if this test should be skipped for React
          if (testCase.skipFrameworks?.includes("react")) {
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
              } else if (typeof value === "string" && value === "mockRef") {
                const refHandler = vi.fn();
                mockHandlers[value] = refHandler;
                props[key] = refHandler;
              }
            });

            // Render component
            // Handle asChild case - if children looks like JSX string, parse it
            let children: React.ReactNode = testCase.children;
            if (testCase.children && testCase.children.startsWith("<")) {
              // For asChild tests, we need to render actual JSX
              // Parse simple cases like '<a href="/test">Link Button</a>'
              const match = testCase.children.match(
                /<(\w+)([^>]*)>(.*?)<\/\1>/
              );
              if (match) {
                const [, tag, attrsStr, content] = match;
                const attrs: Record<string, unknown> = {};
                const attrMatches = attrsStr.matchAll(/(\w+)="([^"]*)"/g);
                for (const attrMatch of attrMatches) {
                  attrs[attrMatch[1]] = attrMatch[2];
                }
                // eslint-disable-next-line import/no-named-as-default-member
                children = React.createElement(tag, attrs, content);
              }
            }

            const { container } = render(
              // eslint-disable-next-line import/no-named-as-default-member
              React.createElement(Component, props, children)
            );

            // Get the element - for asChild, look for any role, not just button
            let element: HTMLElement;
            if (props.asChild) {
              element = container.firstChild as HTMLElement;
            } else {
              element =
                (screen.queryByRole("button") as HTMLElement) ||
                (container.firstChild as HTMLElement);
            }

            // Run actions if any
            if (testCase.actions && testCase.actions.length > 0) {
              await runActions(testCase.actions, element);
            }

            // Run assertions
            runAssertions(testCase.assertions, element, mockHandlers);
          });
        });
      });
    });
  });
}
