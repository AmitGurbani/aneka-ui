# Testing Requirements

> **Specification Section:** Testing Strategy & Requirements
> **Last Updated:** October 2025

This document defines the complete testing strategy, coverage requirements, and testing tools for the Aneka UI project.

---

## 🎯 Testing Philosophy

**Goals:**

1. **Confidence:** Tests give us confidence that components work correctly
2. **Documentation:** Tests serve as living documentation
3. **Refactoring Safety:** Tests enable safe refactoring
4. **Regression Prevention:** Tests catch regressions early

**Principles:**

- **Test behavior, not implementation** - Focus on what users see and interact with
- **Write tests that resemble usage** - Test components as users would use them
- **Maintain high coverage** - Aim for 80%+ code coverage
- **Keep tests fast** - Fast tests encourage running them often

---

## 🧪 Testing Stack

### Unit Testing

| Tool                            | Version | Purpose                      |
| ------------------------------- | ------- | ---------------------------- |
| **Vitest**                      | Latest  | Fast unit testing framework  |
| **@testing-library/react**      | Latest  | React component testing      |
| **@testing-library/vue**        | Latest  | Vue component testing        |
| **@testing-library/angular**    | Latest  | Angular component testing    |
| **@testing-library/user-event** | Latest  | Simulating user interactions |
| **@testing-library/jest-dom**   | Latest  | Custom matchers              |
| **@vitest/coverage-v8**         | Latest  | Code coverage                |

### Visual Regression Testing

| Tool                 | Version | Purpose            |
| -------------------- | ------- | ------------------ |
| **Playwright**       | Latest  | Browser automation |
| **@playwright/test** | Latest  | Testing framework  |

### E2E Testing

| Tool           | Version | Purpose            |
| -------------- | ------- | ------------------ |
| **Playwright** | Latest  | End-to-end testing |

---

## 📊 Coverage Requirements

### Minimum Coverage Targets

| Metric         | Minimum | Target |
| -------------- | ------- | ------ |
| **Lines**      | 80%     | 90%    |
| **Functions**  | 80%     | 90%    |
| **Branches**   | 75%     | 85%    |
| **Statements** | 80%     | 90%    |

### Coverage Configuration

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80,
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/node_modules/**",
        "**/dist/**",
        "**/*.config.{ts,js}",
        "**/types/**",
      ],
    },
  },
});
```

---

## 🧩 Unit Testing

### What to Test

**For Each Component:**

1. **Rendering** - Component renders without errors
2. **Props** - All props work correctly
3. **Variants** - All variants apply correct classes
4. **Sizes** - All sizes apply correct classes
5. **Events** - Event handlers are called correctly
6. **Accessibility** - ARIA attributes present
7. **Refs** - Ref forwarding works (React/Angular)
8. **States** - Disabled, loading, error states work
9. **Dark Mode** - Dark mode classes applied

### React Component Testing

**Example: Button Component Tests**

```typescript
// button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveTextContent('Link Button')
    })
  })

  describe('Variants', () => {
    it('applies default variant classes', () => {
      const { container } = render(<Button>Default</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    it('applies secondary variant classes', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')
    })

    it('applies destructive variant classes', () => {
      const { container } = render(<Button variant="destructive">Delete</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground')
    })

    it('applies outline variant classes', () => {
      const { container } = render(<Button variant="outline">Outline</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('border-2', 'border-primary')
    })

    it('applies ghost variant classes', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('text-primary', 'hover:bg-primary/10')
    })

    it('applies link variant classes', () => {
      const { container } = render(<Button variant="link">Link</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('text-primary', 'underline-offset-4')
    })
  })

  describe('Sizes', () => {
    it('applies default size classes', () => {
      const { container } = render(<Button>Default</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('h-10', 'px-4', 'py-2')
    })

    it('applies small size classes', () => {
      const { container } = render(<Button size="sm">Small</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('h-8', 'px-3', 'py-1.5')
    })

    it('applies large size classes', () => {
      const { container } = render(<Button size="lg">Large</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('h-12', 'px-6', 'py-3')
    })

    it('applies icon size classes', () => {
      const { container } = render(<Button size="icon">X</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('h-10', 'w-10')
    })
  })

  describe('Custom className', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Button className="custom-class">Button</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('custom-class', 'bg-primary')
    })
  })

  describe('Events', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole('button')
      await userEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)

      const button = screen.getByRole('button')
      await userEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Disabled state', () => {
    it('applies disabled styles', () => {
      const { container } = render(<Button disabled>Disabled</Button>)
      const button = container.firstChild
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
      expect(button).toBeDisabled()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Button</Button>)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current).toHaveTextContent('Button')
    })
  })

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('is keyboard accessible', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Button</Button>)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()

      await userEvent.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Type attribute', () => {
    it('defaults to button type', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('accepts custom type', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })
})
```

### Vue Component Testing

```typescript
// Button.test.ts
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me",
      },
    });
    expect(wrapper.text()).toBe("Click me");
  });

  it("applies variant classes", () => {
    const wrapper = mount(Button, {
      props: { variant: "secondary" },
      slots: { default: "Button" },
    });
    expect(wrapper.classes()).toContain("bg-secondary");
  });

  it("emits click event", async () => {
    const wrapper = mount(Button, {
      slots: { default: "Button" },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
```

### Angular Component Testing

```typescript
// button.component.spec.ts
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply variant classes", () => {
    component.variant = "secondary";
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.className).toContain("bg-secondary");
  });

  it("should emit click event", () => {
    spyOn(component.click, "emit");
    const button = fixture.nativeElement.querySelector("button");
    button.click();
    expect(component.click.emit).toHaveBeenCalled();
  });
});
```

---

## 🎨 Visual Regression Testing

### Purpose

Catch visual regressions automatically by comparing screenshots.

### Setup

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  use: {
    baseURL: "http://localhost:6006", // Storybook
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "pnpm storybook",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
  },
});
```

### Visual Tests

```typescript
// tests/visual/button.test.ts
import { test, expect } from "@playwright/test";

test.describe("Button - Material Design", () => {
  test("default variant", async ({ page }) => {
    await page.goto("/iframe.html?id=react-material-button--default");
    const button = page.locator("button");
    await expect(button).toHaveScreenshot("button-material-default.png");
  });

  test("hover state", async ({ page }) => {
    await page.goto("/iframe.html?id=react-material-button--default");
    const button = page.locator("button");
    await button.hover();
    await expect(button).toHaveScreenshot("button-material-hover.png");
  });

  test("focus state", async ({ page }) => {
    await page.goto("/iframe.html?id=react-material-button--default");
    const button = page.locator("button");
    await button.focus();
    await expect(button).toHaveScreenshot("button-material-focus.png");
  });

  test("disabled state", async ({ page }) => {
    await page.goto("/iframe.html?id=react-material-button--disabled");
    const button = page.locator("button");
    await expect(button).toHaveScreenshot("button-material-disabled.png");
  });
});

test.describe("Button - All Variants", () => {
  const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ];

  for (const variant of variants) {
    test(`${variant} variant`, async ({ page }) => {
      await page.goto(`/iframe.html?id=react-material-button--${variant}`);
      const button = page.locator("button");
      await expect(button).toHaveScreenshot(`button-material-${variant}.png`);
    });
  }
});

test.describe("Button - Dark Mode", () => {
  test("default variant in dark mode", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=react-material-button--default&globals=theme:dark"
    );
    const button = page.locator("button");
    await expect(button).toHaveScreenshot("button-material-default-dark.png");
  });
});
```

---

## 🚀 CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Run unit tests
        run: pnpm test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps

      - name: Run visual tests
        run: pnpm test:visual

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Related Specifications

- [Components](./components.md) - Component specifications to test
- [CI/CD Requirements](./ci-cd-requirements.md) - CI/CD workflows
- [Critical Requirements](./critical-requirements.md) - Quality standards

---

**Comprehensive testing ensures quality, reliability, and confidence in Aneka UI components.**
