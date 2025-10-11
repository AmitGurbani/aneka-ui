# Component Tests

Component testing for Aneka UI React components using Vitest and React Testing Library.

## Why Copy Components?

Components are copied from the registry instead of imported directly for several reasons:

1. **Dependency Isolation** - Avoids complex dependency resolution issues
2. **Test Speed** - Faster test execution without unnecessary module resolution
3. **Real-World Testing** - Tests components exactly as users would use them (after copy-paste)
4. **Path Resolution** - Simplifies import path handling

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

The `pretest` script automatically syncs components before running tests, so you don't need to manually sync unless you want to verify the sync output.

## Project Structure

```
packages/components-test/
├── scripts/
│   └── sync-components.js   # Syncs components from registry
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

## Adding New Components

1. Add the component filename to `scripts/sync-components.js` in the `COMPONENTS_TO_SYNC` object
2. Run `pnpm sync` to copy the component
3. Create a test file in the appropriate `tests/{style}/` directory
4. Run tests to verify

## Tips

- Use `describe` blocks to organize tests by feature
- Test user interactions, not implementation details
- Focus on accessibility (ARIA attributes, keyboard navigation)
- Use `screen.getByRole()` instead of `getByTestId()` when possible
- Mock external dependencies if needed
