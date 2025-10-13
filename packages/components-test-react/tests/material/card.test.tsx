import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/material/card";

describe("Material Design Card", () => {
  describe("Card Component", () => {
    it("should render with default props", () => {
      render(<Card>Card content</Card>);
      const card = screen.getByText("Card content");
      expect(card).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card.tagName).toBe("DIV");
    });

    it("should forward ref to div element", () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Card</Card>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it("should accept custom className", () => {
      render(<Card className="custom-card">Content</Card>);
      const card = screen.getByText("Content");
      expect(card).toHaveClass("custom-card");
    });

    it("should have Material Design styling", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-lg");
      expect(card).toHaveClass("border");
      expect(card).toHaveClass("bg-card");
      expect(card).toHaveClass("text-card-foreground");
    });

    it("should have Material Design shadow", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card.className).toContain("shadow-[0_2px_4px_rgba(0,0,0,0.1)]");
    });

    it("should accept HTML div attributes", () => {
      render(
        <Card data-testid="card" role="article" aria-label="Product card">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("role", "article");
      expect(card).toHaveAttribute("aria-label", "Product card");
    });
  });

  describe("CardHeader Component", () => {
    it("should render header content", () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      const header = screen.getByTestId("header");
      expect(header.tagName).toBe("DIV");
    });

    it("should forward ref to div element", () => {
      const ref = vi.fn();
      render(<CardHeader ref={ref}>Header</CardHeader>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it("should have proper spacing", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("flex");
      expect(header).toHaveClass("flex-col");
      expect(header).toHaveClass("space-y-1.5");
      expect(header).toHaveClass("p-6");
    });

    it("should accept custom className", () => {
      render(<CardHeader className="custom-header">Header</CardHeader>);
      const header = screen.getByText("Header");
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("CardTitle Component", () => {
    it("should render title text", () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText("Card Title")).toBeInTheDocument();
    });

    it("should render as h3 element", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId("title");
      expect(title.tagName).toBe("H3");
    });

    it("should forward ref to heading element", () => {
      const ref = vi.fn();
      render(<CardTitle ref={ref}>Title</CardTitle>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLHeadingElement));
    });

    it("should have proper typography", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId("title");
      expect(title).toHaveClass("text-2xl");
      expect(title).toHaveClass("font-semibold");
      expect(title).toHaveClass("leading-none");
      expect(title).toHaveClass("tracking-tight");
    });

    it("should accept custom className", () => {
      render(<CardTitle className="custom-title">Title</CardTitle>);
      const title = screen.getByText("Title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("CardDescription Component", () => {
    it("should render description text", () => {
      render(<CardDescription>Card description</CardDescription>);
      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("should render as p element", () => {
      render(
        <CardDescription data-testid="description">Description</CardDescription>
      );
      const description = screen.getByTestId("description");
      expect(description.tagName).toBe("P");
    });

    it("should forward ref to paragraph element", () => {
      const ref = vi.fn();
      render(<CardDescription ref={ref}>Description</CardDescription>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLParagraphElement));
    });

    it("should have proper styling", () => {
      render(
        <CardDescription data-testid="description">Description</CardDescription>
      );
      const description = screen.getByTestId("description");
      expect(description).toHaveClass("text-sm");
      expect(description).toHaveClass("text-muted-foreground");
    });

    it("should accept custom className", () => {
      render(
        <CardDescription className="custom-desc">Description</CardDescription>
      );
      const description = screen.getByText("Description");
      expect(description).toHaveClass("custom-desc");
    });
  });

  describe("CardContent Component", () => {
    it("should render content", () => {
      render(<CardContent>Main content</CardContent>);
      expect(screen.getByText("Main content")).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      const content = screen.getByTestId("content");
      expect(content.tagName).toBe("DIV");
    });

    it("should forward ref to div element", () => {
      const ref = vi.fn();
      render(<CardContent ref={ref}>Content</CardContent>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it("should have proper padding", () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("p-6");
      expect(content).toHaveClass("pt-0");
    });

    it("should accept custom className", () => {
      render(<CardContent className="custom-content">Content</CardContent>);
      const content = screen.getByText("Content");
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("CardFooter Component", () => {
    it("should render footer content", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      expect(footer.tagName).toBe("DIV");
    });

    it("should forward ref to div element", () => {
      const ref = vi.fn();
      render(<CardFooter ref={ref}>Footer</CardFooter>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it("should have proper layout", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex");
      expect(footer).toHaveClass("items-center");
      expect(footer).toHaveClass("p-6");
      expect(footer).toHaveClass("pt-0");
    });

    it("should accept custom className", () => {
      render(<CardFooter className="custom-footer">Footer</CardFooter>);
      const footer = screen.getByText("Footer");
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("Compound Component Usage", () => {
    it("should render complete card with all sections", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Product Title</CardTitle>
            <CardDescription>Product description</CardDescription>
          </CardHeader>
          <CardContent>Main content here</CardContent>
          <CardFooter>Footer actions</CardFooter>
        </Card>
      );

      expect(screen.getByText("Product Title")).toBeInTheDocument();
      expect(screen.getByText("Product description")).toBeInTheDocument();
      expect(screen.getByText("Main content here")).toBeInTheDocument();
      expect(screen.getByText("Footer actions")).toBeInTheDocument();
    });

    it("should render card with only required sections", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Simple Card</CardTitle>
          </CardHeader>
          <CardContent>Content only</CardContent>
        </Card>
      );

      expect(screen.getByText("Simple Card")).toBeInTheDocument();
      expect(screen.getByText("Content only")).toBeInTheDocument();
    });

    it("should render card with custom content", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Custom Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByText("Custom Card")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });

    it("should render card with footer buttons", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Action Card</CardTitle>
          </CardHeader>
          <CardContent>Some content</CardContent>
          <CardFooter>
            <button>Cancel</button>
            <button>Submit</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Action Card")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should support ARIA attributes on card", () => {
      render(
        <Card aria-label="Product card" role="article">
          <CardContent>Content</CardContent>
        </Card>
      );

      const card = screen.getByRole("article");
      expect(card).toHaveAttribute("aria-label", "Product card");
    });

    it("should have proper heading hierarchy", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
          </CardHeader>
        </Card>
      );

      const title = screen.getByText("Main Title");
      expect(title.tagName).toBe("H3");
    });

    it("should support custom ARIA labels on sections", () => {
      render(
        <Card>
          <CardHeader aria-label="Card header section">
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent aria-label="Card main content">Content</CardContent>
          <CardFooter aria-label="Card actions">Footer</CardFooter>
        </Card>
      );

      expect(screen.getByLabelText("Card header section")).toBeInTheDocument();
      expect(screen.getByLabelText("Card main content")).toBeInTheDocument();
      expect(screen.getByLabelText("Card actions")).toBeInTheDocument();
    });
  });

  describe("Use Cases", () => {
    it("should render as product card", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Product Name</CardTitle>
            <CardDescription>$99.99</CardDescription>
          </CardHeader>
          <CardContent>Product details and features</CardContent>
          <CardFooter>
            <button>Add to Cart</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Product Name")).toBeInTheDocument();
      expect(screen.getByText("$99.99")).toBeInTheDocument();
    });

    it("should render as info card without footer", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Important notice</CardDescription>
          </CardHeader>
          <CardContent>Detailed information here</CardContent>
        </Card>
      );

      expect(screen.getByText("Information")).toBeInTheDocument();
      expect(screen.getByText("Detailed information here")).toBeInTheDocument();
    });

    it("should render as minimal card with just content", () => {
      render(
        <Card>
          <CardContent>Simple content card</CardContent>
        </Card>
      );

      expect(screen.getByText("Simple content card")).toBeInTheDocument();
    });
  });
});
