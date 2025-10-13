import type { Action } from "./types";

export async function runAction(
  action: Action,
  element: HTMLElement
): Promise<void> {
  switch (action.type) {
    case "click":
      element.click();
      break;

    case "focus":
      element.focus();
      break;

    case "blur":
      element.blur();
      break;

    case "type":
      if (action.value && element instanceof HTMLInputElement) {
        element.value = action.value;
        element.dispatchEvent(new Event("input"));
      }
      break;

    case "hover":
      element.dispatchEvent(new MouseEvent("mouseenter"));
      break;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export async function runActions(
  actions: Action[],
  element: HTMLElement
): Promise<void> {
  for (const action of actions) {
    await runAction(action, element);
  }
}
