import type { Assertion } from "./types";

export function runAssertion(
  assertion: Assertion,
  element: HTMLElement,
  mockHandlers: Record<string, unknown> = {}
): void {
  switch (assertion.type) {
    case "exists":
      expect(element).toBeTruthy();
      break;

    case "tagName":
      expect(element.tagName).toBe(assertion.value?.toUpperCase());
      break;

    case "hasText":
      expect(element.textContent).toContain(assertion.value || "");
      break;

    case "hasClass":
      expect(element.classList.contains(assertion.value || "")).toBe(true);
      break;

    case "notHasClass":
      expect(element.classList.contains(assertion.value || "")).toBe(false);
      break;

    case "hasAttribute":
      if (assertion.name) {
        if (assertion.value) {
          expect(element.getAttribute(assertion.name)).toBe(assertion.value);
        } else {
          expect(element.hasAttribute(assertion.name)).toBe(true);
        }
      }
      break;

    case "hasRole":
      expect(element.getAttribute("role")).toBe(assertion.value);
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
