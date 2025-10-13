import { expect } from "vitest";

import type { Assertion } from "./types";

export function runAssertion(
  assertion: Assertion,
  element: HTMLElement,
  mockHandlers: Record<string, unknown> = {}
): void {
  switch (assertion.type) {
    case "exists":
      expect(element).toBeInTheDocument();
      break;

    case "tagName":
      expect(element.tagName).toBe(assertion.value?.toUpperCase());
      break;

    case "hasText":
      expect(element).toHaveTextContent(assertion.value || "");
      break;

    case "hasClass":
      expect(element).toHaveClass(assertion.value || "");
      break;

    case "notHasClass":
      expect(element).not.toHaveClass(assertion.value || "");
      break;

    case "hasAttribute":
      if (assertion.name) {
        if (assertion.value) {
          expect(element).toHaveAttribute(assertion.name, assertion.value);
        } else {
          expect(element).toHaveAttribute(assertion.name);
        }
      }
      break;

    case "hasRole":
      expect(element).toHaveAttribute("role", assertion.value);
      break;

    case "handlerCalled":
      if (assertion.handler && mockHandlers[assertion.handler]) {
        if (assertion.times !== undefined) {
          expect(mockHandlers[assertion.handler]).toHaveBeenCalledTimes(
            assertion.times
          );
        } else {
          expect(mockHandlers[assertion.handler]).toHaveBeenCalled();
        }
      }
      break;

    case "handlerNotCalled":
      if (assertion.handler && mockHandlers[assertion.handler]) {
        expect(mockHandlers[assertion.handler]).not.toHaveBeenCalled();
      }
      break;

    case "hasFocus":
      expect(element).toHaveFocus();
      break;

    case "isDisabled":
      expect(element).toBeDisabled();
      break;

    case "refCalled":
      if (assertion.handler && mockHandlers[assertion.handler]) {
        expect(mockHandlers[assertion.handler]).toHaveBeenCalledWith(
          expect.any(HTMLElement)
        );
      }
      break;

    default:
      throw new Error(`Unknown assertion type: ${assertion.type}`);
  }
}

export function runAssertions(
  assertions: Assertion[],
  element: HTMLElement,
  mockHandlers: Record<string, unknown> = {}
): void {
  assertions.forEach((assertion) =>
    runAssertion(assertion, element, mockHandlers)
  );
}
