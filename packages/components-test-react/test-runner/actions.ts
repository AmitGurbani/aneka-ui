import type { Action } from "@aneka-ui/test-specs/types";
import userEvent from "@testing-library/user-event";

export async function runAction(
  action: Action,
  element: HTMLElement
): Promise<void> {
  const user = userEvent.setup();

  switch (action.type) {
    case "click":
      await user.click(element);
      break;

    case "focus":
      element.focus();
      break;

    case "blur":
      element.blur();
      break;

    case "type":
      if (action.value) {
        await user.type(element, action.value);
      }
      break;

    case "hover":
      await user.hover(element);
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
