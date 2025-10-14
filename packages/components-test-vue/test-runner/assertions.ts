import type { Assertion } from "@aneka-ui/test-specs/types";
import type { VueWrapper } from "@vue/test-utils";
import { expect } from "vitest";

export function runAssertion(
  assertion: Assertion,
  wrapper: VueWrapper,
  mockHandlers: Record<string, unknown> = {}
): void {
  const element = wrapper.element as HTMLElement;

  switch (assertion.type) {
    case "exists":
      expect(wrapper.exists()).toBe(true);
      break;

    case "tagName":
      expect(element.tagName).toBe(assertion.value?.toUpperCase());
      break;

    case "hasText":
      expect(wrapper.text()).toContain(assertion.value || "");
      break;

    case "hasClass":
      expect(wrapper.classes()).toContain(assertion.value || "");
      break;

    case "notHasClass":
      expect(wrapper.classes()).not.toContain(assertion.value || "");
      break;

    case "containsClass":
      expect(element.className).toContain(assertion.value || "");
      break;

    case "containsHTML":
      expect(wrapper.html()).toContain(assertion.value || "");
      break;

    case "hasAttribute":
      if (assertion.name) {
        if (assertion.value) {
          expect(wrapper.attributes(assertion.name)).toBe(assertion.value);
        } else {
          expect(wrapper.attributes(assertion.name)).toBeDefined();
        }
      }
      break;

    case "hasRole":
      expect(wrapper.attributes("role")).toBe(assertion.value);
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
      expect(document.activeElement).toBe(element);
      break;

    case "isDisabled":
      expect(wrapper.attributes("disabled")).toBeDefined();
      break;

    default:
      throw new Error(`Unknown assertion type: ${assertion.type}`);
  }
}

export function runAssertions(
  assertions: Assertion[],
  wrapper: VueWrapper,
  mockHandlers: Record<string, unknown> = {}
): void {
  assertions.forEach((assertion) =>
    runAssertion(assertion, wrapper, mockHandlers)
  );
}
