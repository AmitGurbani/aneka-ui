import type { VueWrapper } from "@vue/test-utils";

import type { Action } from "./types";

export async function runAction(
  action: Action,
  wrapper: VueWrapper
): Promise<void> {
  switch (action.type) {
    case "click":
      await wrapper.trigger("click");
      break;

    case "focus":
      (wrapper.element as HTMLElement).focus();
      await wrapper.trigger("focus");
      break;

    case "blur":
      await wrapper.trigger("blur");
      break;

    case "type":
      if (action.value) {
        await wrapper.setValue(action.value);
      }
      break;

    case "hover":
      await wrapper.trigger("mouseenter");
      break;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export async function runActions(
  actions: Action[],
  wrapper: VueWrapper
): Promise<void> {
  for (const action of actions) {
    await runAction(action, wrapper);
  }
}
