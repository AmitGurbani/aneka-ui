import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-6xl font-bold">Aneka UI</h1>
        <p className="text-muted-foreground mb-4 text-2xl">
          Design system patterns with YOUR brand colors
        </p>
        <p className="text-muted-foreground mb-12 text-lg">
          Framework-agnostic component library providing authentic Material
          Design, Apple HIG, and Samsung One UI patterns that adapt to your
          Tailwind colors.
        </p>

        <div className="mb-16 flex justify-center gap-4">
          <Link
            to="/material"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-8 py-3 transition-colors"
          >
            View Demo
          </Link>
          <a
            href="https://github.com/yourusername/aneka-ui"
            className="border-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center rounded-lg border-2 px-8 py-3 transition-colors"
          >
            GitHub
          </a>
        </div>

        <div className="grid gap-8 text-left md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-3 text-xl font-semibold">Material Design</h3>
            <p className="text-muted-foreground mb-4">
              Google's design system with 8pt grid, elevation shadows, and 200ms
              animations
            </p>
            <Link to="/material" className="text-primary hover:underline">
              View Components →
            </Link>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-3 text-xl font-semibold">Apple HIG</h3>
            <p className="text-muted-foreground mb-4">
              Apple's Human Interface Guidelines with subtle shadows and
              spring-like animations
            </p>
            <Link to="/hig" className="text-primary hover:underline">
              View Components →
            </Link>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-3 text-xl font-semibold">Samsung One UI</h3>
            <p className="text-muted-foreground mb-4">
              Samsung's One UI with generous spacing, bold text, and prominent
              shadows
            </p>
            <Link to="/oneui" className="text-primary hover:underline">
              View Components →
            </Link>
          </div>
        </div>

        <div className="bg-muted mt-16 rounded-lg p-8 text-left">
          <h2 className="mb-4 text-2xl font-bold">Quick Start</h2>
          <div className="space-y-4 font-mono text-sm">
            <div>
              <p className="text-muted-foreground mb-2">
                # Install CLI globally
              </p>
              <code className="bg-background block rounded p-3">
                npm install -g @aneka-ui/cli
              </code>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">
                # Initialize in your project
              </p>
              <code className="bg-background block rounded p-3">
                aneka-ui init
              </code>
            </div>
            <div>
              <p className="text-muted-foreground mb-2"># Add components</p>
              <code className="bg-background block rounded p-3">
                aneka-ui add button card badge
              </code>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">Features</h2>
          <div className="grid gap-6 text-left md:grid-cols-2">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">🎨 Your Brand Colors</h3>
              <p className="text-muted-foreground">
                Components adapt to your Tailwind colors. You provide the
                colors, we provide the patterns.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">📦 Copy-Paste Approach</h3>
              <p className="text-muted-foreground">
                Components live in your codebase. You own and modify them
                freely.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">⚡ Framework Native</h3>
              <p className="text-muted-foreground">
                True React, Vue, and Angular implementations. No wrappers, no
                compromises.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">♿ Accessible</h3>
              <p className="text-muted-foreground">
                Built with Radix UI primitives for keyboard navigation and
                screen readers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
