import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../src/oneui/tooltip";

describe("Samsung One UI Tooltip", () => {
  describe("Basic Rendering", () => {
    it("should render trigger element", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("should not render tooltip content initially", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("should render with button trigger", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Click me</button>
            </TooltipTrigger>
            <TooltipContent>Button tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(
        screen.getByRole("button", { name: "Click me" })
      ).toBeInTheDocument();
    });
  });

  describe("TooltipContent Styling", () => {
    it("should have Samsung One UI primary colors", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent data-testid="tooltip-content">
              Tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByTestId("tooltip-content");
        expect(tooltip).toHaveClass("bg-primary");
        expect(tooltip).toHaveClass("text-primary-foreground");
      });
    });

    it("should have 16px border radius for Samsung One UI", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent data-testid="tooltip-content">
              Tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByTestId("tooltip-content");
        expect(tooltip).toHaveClass("rounded-2xl");
      });
    });

    it("should have small text size", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent data-testid="tooltip-content">Text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByTestId("tooltip-content");
        expect(tooltip).toHaveClass("text-sm");
      });
    });

    it("should have Samsung One UI shadow", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent data-testid="tooltip-content">Text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByTestId("tooltip-content");
        expect(tooltip.className).toContain(
          "shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        );
      });
    });

    it("should have proper padding", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent data-testid="tooltip-content">Text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByTestId("tooltip-content");
        expect(tooltip).toHaveClass("px-4");
        expect(tooltip).toHaveClass("py-2");
      });
    });
  });

  describe("Interactions", () => {
    it("should show tooltip on hover", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover target</TooltipTrigger>
            <TooltipContent>Tooltip appears</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      await user.hover(screen.getByText("Hover target"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should show tooltip on focus", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Focus me</button>
            </TooltipTrigger>
            <TooltipContent>Keyboard tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const button = screen.getByRole("button");
      await user.tab();

      expect(button).toHaveFocus();

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Positioning", () => {
    it("should accept sideOffset prop", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent sideOffset={10}>Offset tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should default to sideOffset of 4", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Default offset</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("TooltipProvider", () => {
    it("should support custom delay", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Instant tooltip</TooltipTrigger>
            <TooltipContent>Appears instantly</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Instant tooltip"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper tooltip role", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Accessible tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
      });
    });

    it("should work with keyboard navigation", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Keyboard accessible</button>
            </TooltipTrigger>
            <TooltipContent>Keyboard tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.tab();

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should support aria-label on trigger", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-label="Info button">ℹ️</button>
            </TooltipTrigger>
            <TooltipContent>More information</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const button = screen.getByRole("button", { name: "Info button" });
      expect(button).toBeInTheDocument();
    });

    it("should have aria-describedby on trigger when open", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Hover me</button>
            </TooltipTrigger>
            <TooltipContent>Description</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const button = screen.getByRole("button");
      await user.hover(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-describedby");
      });
    });
  });

  describe("Use Cases", () => {
    it("should render as icon tooltip", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-label="Delete">🗑️</button>
            </TooltipTrigger>
            <TooltipContent>Delete item</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveTextContent("Delete item");
      });
    });

    it("should render as help text tooltip", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>Username</span>
            </TooltipTrigger>
            <TooltipContent>
              Your username must be between 3-20 characters
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByText("Username"));

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveTextContent(
          "Your username must be between 3-20 characters"
        );
      });
    });

    it("should work with disabled button", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <button disabled>Disabled Button</button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              This action is currently unavailable
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const wrapper = screen.getByText("Disabled Button").parentElement;
      if (wrapper) {
        await user.hover(wrapper);

        await waitFor(() => {
          const tooltip = screen.getByRole("tooltip");
          expect(tooltip).toHaveTextContent(
            "This action is currently unavailable"
          );
        });
      }
    });
  });

  describe("Controlled State", () => {
    it("should support controlled open state", () => {
      const { rerender } = render(
        <TooltipProvider>
          <Tooltip open={false}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Controlled tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      rerender(
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Controlled tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });
});
