import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "../../src/material/badge";

describe("Material Design Badge", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Badge>New</Badge>);
      const badge = screen.getByText("New");
      expect(badge).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText("Badge");
      expect(badge.tagName).toBe("DIV");
    });

    it("should render children correctly", () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("should render with numeric children", () => {
      render(<Badge>99</Badge>);
      expect(screen.getByText("99")).toBeInTheDocument();
    });

    it("should render with complex children", () => {
      render(
        <Badge>
          <span>Premium</span>
        </Badge>
      );
      expect(screen.getByText("Premium")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass("bg-primary");
      expect(badge).toHaveClass("text-primary-foreground");
    });

    it("should render secondary variant", () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText("Secondary");
      expect(badge).toHaveClass("bg-secondary");
      expect(badge).toHaveClass("text-secondary-foreground");
    });

    it("should render destructive variant", () => {
      render(<Badge variant="destructive">Error</Badge>);
      const badge = screen.getByText("Error");
      expect(badge).toHaveClass("bg-destructive");
      expect(badge).toHaveClass("text-destructive-foreground");
    });

    it("should render outline variant", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText("Outline");
      expect(badge).toHaveClass("border");
      expect(badge).toHaveClass("border-primary");
      expect(badge).toHaveClass("text-foreground");
    });
  });

  describe("Material Design Styling", () => {
    it("should have uppercase text styling", () => {
      render(<Badge>Material</Badge>);
      const badge = screen.getByText("Material");
      expect(badge).toHaveClass("uppercase");
      expect(badge).toHaveClass("tracking-wide");
    });

    it("should have pill shape with rounded-full", () => {
      render(<Badge>Pill</Badge>);
      const badge = screen.getByText("Pill");
      expect(badge).toHaveClass("rounded-full");
    });

    it("should have extra small text size", () => {
      render(<Badge>Small</Badge>);
      const badge = screen.getByText("Small");
      expect(badge).toHaveClass("text-xs");
    });

    it("should have semibold font weight", () => {
      render(<Badge>Bold</Badge>);
      const badge = screen.getByText("Bold");
      expect(badge).toHaveClass("font-semibold");
    });

    it("should have proper padding", () => {
      render(<Badge>Padded</Badge>);
      const badge = screen.getByText("Padded");
      expect(badge).toHaveClass("px-2.5");
      expect(badge).toHaveClass("py-0.5");
    });

    it("should have Material Design transitions", () => {
      render(<Badge>Transition</Badge>);
      const badge = screen.getByText("Transition");
      expect(badge).toHaveClass("transition-colors");
    });

    it("should have subtle shadow on filled variants", () => {
      render(<Badge variant="default">Shadow</Badge>);
      const badge = screen.getByText("Shadow");
      expect(badge.className).toContain("shadow-[0_1px_2px_rgba(0,0,0,0.05)]");
    });
  });

  describe("Props", () => {
    it("should accept custom className", () => {
      render(<Badge className="custom-badge">Custom</Badge>);
      const badge = screen.getByText("Custom");
      expect(badge).toHaveClass("custom-badge");
    });

    it("should merge custom className with default classes", () => {
      render(<Badge className="ml-4">Merged</Badge>);
      const badge = screen.getByText("Merged");
      expect(badge).toHaveClass("ml-4");
      expect(badge).toHaveClass("inline-flex");
      expect(badge).toHaveClass("rounded-full");
    });

    it("should accept HTML div attributes", () => {
      render(
        <Badge id="test-badge" role="status" aria-label="Status badge">
          Status
        </Badge>
      );
      const badge = screen.getByText("Status");
      expect(badge).toHaveAttribute("id", "test-badge");
      expect(badge).toHaveAttribute("role", "status");
      expect(badge).toHaveAttribute("aria-label", "Status badge");
    });

    it("should support data attributes", () => {
      render(<Badge data-testid="custom-badge">Test</Badge>);
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });

    it("should support onClick handler", () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Clickable</Badge>);
      const badge = screen.getByText("Clickable");
      badge.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have inline-flex display for proper alignment", () => {
      render(<Badge>Inline</Badge>);
      const badge = screen.getByText("Inline");
      expect(badge).toHaveClass("inline-flex");
      expect(badge).toHaveClass("items-center");
    });

    it("should support aria-label for screen readers", () => {
      render(<Badge aria-label="3 notifications">3</Badge>);
      const badge = screen.getByLabelText("3 notifications");
      expect(badge).toBeInTheDocument();
    });

    it("should support role attribute", () => {
      render(<Badge role="status">Live</Badge>);
      const badge = screen.getByRole("status");
      expect(badge).toBeInTheDocument();
    });

    it("should have focus ring for keyboard navigation", () => {
      render(<Badge>Focus</Badge>);
      const badge = screen.getByText("Focus");
      expect(badge).toHaveClass("focus:outline-none");
      expect(badge).toHaveClass("focus:ring-2");
      expect(badge).toHaveClass("focus:ring-ring");
      expect(badge).toHaveClass("focus:ring-offset-2");
    });
  });

  describe("Use Cases", () => {
    it("should render as notification count", () => {
      render(<Badge variant="destructive">5</Badge>);
      const badge = screen.getByText("5");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("bg-destructive");
    });

    it("should render as status indicator", () => {
      render(<Badge variant="secondary">Active</Badge>);
      const badge = screen.getByText("Active");
      expect(badge).toBeInTheDocument();
    });

    it("should render as tag or label", () => {
      render(<Badge variant="outline">TypeScript</Badge>);
      const badge = screen.getByText("TypeScript");
      expect(badge).toBeInTheDocument();
    });

    it("should render multiple badges together", () => {
      render(
        <div>
          <Badge>New</Badge>
          <Badge variant="secondary">Featured</Badge>
          <Badge variant="outline">Sale</Badge>
        </div>
      );
      expect(screen.getByText("New")).toBeInTheDocument();
      expect(screen.getByText("Featured")).toBeInTheDocument();
      expect(screen.getByText("Sale")).toBeInTheDocument();
    });
  });
});
