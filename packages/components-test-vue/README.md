# Vue Component Tests

Vue component testing for Aneka UI using Vitest and Vue Test Utils.

## Overview

This package contains comprehensive tests for Vue components across all three design systems:

- **Material Design** - Google's Material Design 3 patterns
- **Apple HIG** - Apple Human Interface Guidelines
- **Samsung One UI** - Samsung's One UI design language

## Technology Stack

- **Test Runner**: Vitest 3.2.4
- **Testing Library**: Vue Test Utils 2.4.6
- **Environment**: happy-dom 20.0.0
- **Framework**: Vue 3.4.0

## Quick Start

```bash
# Sync components from registry
pnpm sync

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch

# Open Vitest UI
pnpm test:ui
```

## Automatic Sync

The `pretest` script automatically syncs components before running tests, ensuring you're always testing the latest component versions.

## Project Structure

```
packages/components-test-vue/
├── src/
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── material/            # Material Design components
│   ├── hig/                 # Apple HIG components
│   └── oneui/               # Samsung One UI components
├── tests/
│   ├── material/            # Material Design tests
│   ├── hig/                 # Apple HIG tests
│   └── oneui/               # Samsung One UI tests
└── vitest.config.ts         # Vitest configuration
```

## Components Tested

Each design system includes tests for:

- Button
- Badge
- Card
- Dialog
- Tooltip

## Test Categories

Tests are organized into the following categories:

1. **Rendering** - Basic rendering and DOM structure
2. **Variants** - Different component variants (primary, secondary, etc.)
3. **Sizes** - Size variations (sm, md, lg, etc.)
4. **Design System Styling** - Design-specific styling patterns
5. **Interactions** - User interactions (clicks, focus, etc.)
6. **Props** - Component props and attributes
7. **Accessibility** - ARIA attributes, keyboard navigation
8. **Use Cases** - Real-world usage scenarios

## Writing Tests

Tests follow Vue Test Utils best practices:

```typescript
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import Button from "../../src/material/Button.vue";

describe("Material Design Button (Vue)", () => {
  it("should render correctly", () => {
    const wrapper = mount(Button, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.element.tagName).toBe("BUTTON");
  });

  it("should handle clicks", async () => {
    let clicked = false;
    const wrapper = mount(Button, {
      slots: { default: "Click me" },
      attrs: {
        onClick: () => {
          clicked = true;
        },
      },
    });

    await wrapper.trigger("click");
    expect(clicked).toBe(true);
  });
});
```

## Coverage

Run `pnpm test:coverage` to generate coverage reports. Coverage reports are saved to the `coverage/` directory.

## Best Practices

- Use `mount()` for full component rendering
- Use `slots` to pass content to components
- Use `attrs` for HTML attributes and event handlers
- Test user interactions with `trigger()`
- Check component classes with `classes()` or `html()`
- Focus on accessibility testing

## Adding New Components

1. Add the component filename to `scripts/sync-components.js` in the root
2. Run `pnpm sync` to copy the component
3. Create a test file in the appropriate `tests/{style}/` directory
4. Run tests to verify

## Related Packages

- [`@aneka-ui/components-test-react`](../components-test-react) - React component tests
- [`@aneka-ui/components-test-angular`](../components-test-angular) - Angular component tests
