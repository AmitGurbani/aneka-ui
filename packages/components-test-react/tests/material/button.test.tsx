import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../src/material/button";

describe("Material Design 3 Button", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it("should render as button element by default", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("should render children correctly", () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("should forward ref to button element", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });
  });

  describe("Variants", () => {
    it("should render filled variant (default)", () => {
      render(<Button variant="filled">Filled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary");
      expect(button).toHaveClass("text-primary-foreground");
    });

    it("should render filled-tonal variant", () => {
      render(<Button variant="filled-tonal">Filled Tonal</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary");
      expect(button).toHaveClass("text-secondary-foreground");
    });

    it("should render elevated variant", () => {
      render(<Button variant="elevated">Elevated</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-background");
      expect(button).toHaveClass("text-primary");
    });

    it("should render outlined variant", () => {
      render(<Button variant="outlined">Outlined</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-outline");
    });

    it("should render text variant", () => {
      render(<Button variant="text">Text</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-primary");
    });

    it("should render destructive variant", () => {
      render(<Button variant="destructive">Destructive</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive");
      expect(button).toHaveClass("text-destructive-foreground");
    });

    it("should render link variant", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-primary");
      expect(button).toHaveClass("underline-offset-4");
    });
  });

  describe("Sizes", () => {
    it("should render default size", () => {
      render(<Button size="default">Default Size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
      expect(button).toHaveClass("px-4");
    });

    it("should render small size", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-8");
      expect(button).toHaveClass("px-3");
      expect(button).toHaveClass("text-xs");
    });

    it("should render large size", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-12");
      expect(button).toHaveClass("px-6");
      expect(button).toHaveClass("text-base");
    });

    it("should render icon size", () => {
      render(<Button size="icon">Icon</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
      expect(button).toHaveClass("w-10");
    });
  });

  describe("Material Design 3 Styling", () => {
    it("should have sentence case text with normal tracking", () => {
      render(<Button>Material Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("tracking-normal");
      expect(button).not.toHaveClass("uppercase");
    });

    it("should have rounded corners (8px for default)", () => {
      render(<Button>Material Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-lg");
    });

    it("should have rounded-xl for large size", () => {
      render(<Button size="lg">Large Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-xl");
    });

    it("should have rounded-md for small size", () => {
      render(<Button size="sm">Small Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-md");
    });

    it("should have Material Design transitions", () => {
      render(<Button>Material Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("transition-all");
      expect(button).toHaveClass("duration-200");
    });
  });

  describe("Interactions", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not trigger click when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should handle focus events", async () => {
      const handleFocus = vi.fn();
      render(<Button onFocus={handleFocus}>Focus me</Button>);

      const button = screen.getByRole("button");
      button.focus();

      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(button).toHaveFocus();
    });
  });

  describe("Props", () => {
    it("should accept custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("should accept HTML button attributes", () => {
      render(
        <Button type="submit" name="test-button" value="test">
          Submit
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("name", "test-button");
      expect(button).toHaveAttribute("value", "test");
    });

    it("should apply disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:pointer-events-none");
      expect(button).toHaveClass("disabled:opacity-50");
    });

    it("should support data attributes", () => {
      render(<Button data-testid="custom-button">Test</Button>);
      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper button role", () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(<Button aria-label="Close dialog">X</Button>);
      expect(
        screen.getByRole("button", { name: /close dialog/i })
      ).toBeInTheDocument();
    });

    it("should support aria-disabled", () => {
      render(<Button aria-disabled="true">Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should have focus-visible outline", () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus-visible:outline-none");
      expect(button).toHaveClass("focus-visible:ring-2");
      expect(button).toHaveClass("focus-visible:ring-primary");
    });
  });

  describe("asChild prop", () => {
    it("should render as child component when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });
  });
});
