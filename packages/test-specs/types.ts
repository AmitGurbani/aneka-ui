export interface TestSpec {
  component: string;
  designSystem: string;
  description?: string;
  tests: Record<string, TestCase[]>;
}

export interface TestCase {
  name: string;
  props?: Record<string, unknown>;
  children?: string;
  actions?: Action[];
  assertions: Assertion[];
  react?: boolean;
  vue?: boolean;
  skipReason?: string;
}

export interface Action {
  type: "click" | "focus" | "blur" | "type" | "hover";
  value?: string;
}

export interface Assertion {
  type:
    | "exists"
    | "tagName"
    | "hasText"
    | "hasClass"
    | "notHasClass"
    | "containsClass"
    | "containsHTML"
    | "hasAttribute"
    | "hasRole"
    | "handlerCalled"
    | "handlerNotCalled"
    | "hasFocus"
    | "isDisabled"
    | "refCalled";
  value?: string;
  name?: string;
  handler?: string;
  times?: number;
}
