import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/material/dialog";

describe("Material Design Dialog", () => {
  describe("Basic Rendering", () => {
    it("should not render dialog content when closed", () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Open")).toBeInTheDocument();
      expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
    });

    it("should render dialog content when open", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Dialog Title")).toBeInTheDocument();
      expect(screen.getByText("Dialog description")).toBeInTheDocument();
    });

    it("should render trigger button", () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByText("Open Dialog");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("DialogContent", () => {
    it("should render content with proper structure", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <p>Content here</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Test Dialog")).toBeInTheDocument();
      expect(screen.getByText("Content here")).toBeInTheDocument();
    });

    it("should have Material Design styling", () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const content = screen.getByTestId("dialog-content");
      expect(content).toHaveClass("rounded-lg");
      expect(content).toHaveClass("border");
      expect(content).toHaveClass("bg-background");
    });

    it("should have Material Design shadow", () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const content = screen.getByTestId("dialog-content");
      expect(content.className).toContain(
        "shadow-[0_3px_3px_-2px_rgba(0,0,0,0.2),0_3px_4px_0_rgba(0,0,0,0.14),0_1px_8px_0_rgba(0,0,0,0.12)]"
      );
    });

    it("should have 200ms animation duration", () => {
      render(
        <Dialog open>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const content = screen.getByTestId("dialog-content");
      expect(content).toHaveClass("duration-200");
    });

    it("should render close button", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it("should have X icon in close button", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      const svg = closeButton.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("DialogHeader", () => {
    it("should render header content", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Header Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Header Title")).toBeInTheDocument();
    });

    it("should have proper layout", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const header = screen.getByTestId("header");
      expect(header).toHaveClass("flex");
      expect(header).toHaveClass("flex-col");
      expect(header).toHaveClass("space-y-1.5");
    });

    it("should accept custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className="custom-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const header = screen.getByText("Title").parentElement;
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("DialogTitle", () => {
    it("should render title text", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>My Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("My Dialog Title")).toBeInTheDocument();
    });

    it("should have proper typography", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle data-testid="title">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const title = screen.getByTestId("title");
      expect(title).toHaveClass("text-2xl");
      expect(title).toHaveClass("font-normal");
      expect(title).toHaveClass("leading-8");
      expect(title).toHaveClass("tracking-normal");
    });

    it("should accept custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle className="custom-title">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const title = screen.getByText("Title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("DialogDescription", () => {
    it("should render description text", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>This is a description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should have proper styling", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription data-testid="description">
              Description
            </DialogDescription>
          </DialogContent>
        </Dialog>
      );

      const description = screen.getByTestId("description");
      expect(description).toHaveClass("text-sm");
      expect(description).toHaveClass("text-muted-foreground");
      expect(description).toHaveClass("tracking-normal");
    });

    it("should accept custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription className="custom-desc">
              Description
            </DialogDescription>
          </DialogContent>
        </Dialog>
      );

      const description = screen.getByText("Description");
      expect(description).toHaveClass("custom-desc");
    });
  });

  describe("DialogFooter", () => {
    it("should render footer content", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter>
              <button>Cancel</button>
              <button>Submit</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("should have proper layout", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="footer">
              <button>OK</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex");
    });

    it("should accept custom className", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter className="custom-footer">
              <button>OK</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      const footer = screen.getByText("OK").parentElement;
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("Interactions", () => {
    it("should open dialog when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Opened</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText("Dialog Opened")).not.toBeInTheDocument();

      await user.click(screen.getByText("Open Dialog"));

      expect(screen.getByText("Dialog Opened")).toBeInTheDocument();
    });

    it("should close dialog when close button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("Dialog Title")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /close/i }));

      // Wait for dialog to close (animation)
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
    });

    it("should support DialogClose component", async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogClose asChild>
              <button>Custom Close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("Title")).toBeInTheDocument();

      await user.click(screen.getByText("Custom Close"));

      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(screen.queryByText("Title")).not.toBeInTheDocument();
    });
  });

  describe("Compound Component Usage", () => {
    it("should render complete dialog with all sections", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <div>Main content here</div>
            <DialogFooter>
              <button>Cancel</button>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Confirm Action")).toBeInTheDocument();
      expect(
        screen.getByText("Are you sure you want to proceed?")
      ).toBeInTheDocument();
      expect(screen.getByText("Main content here")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });

    it("should render dialog with minimal content", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Simple Dialog</DialogTitle>
            <p>Content only</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Simple Dialog")).toBeInTheDocument();
      expect(screen.getByText("Content only")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper dialog role", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Accessible Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("should have accessible close button", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it("should render overlay for backdrop", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      // Overlay should be rendered as part of the dialog (with backdrop-blur)
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      // Check that dialog content has proper positioning (which indicates overlay is working)
      expect(dialog).toHaveClass("fixed");
    });

    it("should support controlled open state", () => {
      const { rerender } = render(
        <Dialog open={false}>
          <DialogContent>
            <DialogTitle>Controlled Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText("Controlled Dialog")).not.toBeInTheDocument();

      rerender(
        <Dialog open={true}>
          <DialogContent>
            <DialogTitle>Controlled Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Controlled Dialog")).toBeInTheDocument();
    });
  });

  describe("Use Cases", () => {
    it("should render as confirmation dialog", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Item</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button>Cancel</button>
              <button>Delete</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Delete Item")).toBeInTheDocument();
      expect(
        screen.getByText("This action cannot be undone.")
      ).toBeInTheDocument();
    });

    it("should render as form dialog", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form>
              <input placeholder="Name" />
              <input placeholder="Email" />
            </form>
            <DialogFooter>
              <button type="submit">Save</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    });

    it("should render as alert dialog", () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
              <DialogDescription>
                Your changes have been saved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button>OK</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Success")).toBeInTheDocument();
      expect(
        screen.getByText("Your changes have been saved.")
      ).toBeInTheDocument();
    });
  });
});
