/// <reference types="@testing-library/jest-dom" />
/// <reference types="vitest/globals" />

import type * as vitest from "vitest";

declare module "vitest" {
  // Re-export vitest types
  export const expect: typeof vitest.expect;
  export const describe: typeof vitest.describe;
  export const it: typeof vitest.it;
  export const vi: typeof vitest.vi;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T = unknown>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

interface TestingLibraryMatchers<R = void, _T = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveClass(...classNames: string[]): R;
  toHaveAttribute(attr: string, value?: string | RegExp): R;
  toHaveFocus(): R;
  toBeDisabled(): R;
}
