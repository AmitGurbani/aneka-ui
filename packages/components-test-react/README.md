# React Component Tests

React component testing for Aneka UI using Vitest and React Testing Library.

## Overview

This package contains comprehensive tests for React components across all three design systems:

- **Material Design** - Google's Material Design 3 patterns
- **Apple HIG** - Apple Human Interface Guidelines
- **Samsung One UI** - Samsung's One UI design language

## Technology Stack

- **Test Runner**: Vitest 3.2.4
- **Testing Library**: React Testing Library 16.1.0
- **Environment**: jsdom 27.0.0
- **Framework**: React 19.2.0

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
packages/components-test-react/
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

Tests follow React Testing Library best practices:

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "../../src/material/button";

describe("Material Design Button", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should handle clicks", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Coverage

Run `pnpm test:coverage` to generate coverage reports. Coverage reports are saved to the `coverage/` directory.

## Best Practices

- Use `describe` blocks to organize tests by feature
- Test user interactions, not implementation details
- Focus on accessibility (ARIA attributes, keyboard navigation)
- Use `screen.getByRole()` instead of `getByTestId()` when possible
- Mock external dependencies if needed

## Adding New Components

1. Add the component filename to `scripts/sync-components.js` in the root
2. Run `pnpm sync` to copy the component
3. Create a test file in the appropriate `tests/{style}/` directory
4. Run tests to verify

## Related Packages

- [`@aneka-ui/components-test-vue`](../components-test-vue) - Vue component tests
- [`@aneka-ui/components-test-angular`](../components-test-angular) - Angular component tests
