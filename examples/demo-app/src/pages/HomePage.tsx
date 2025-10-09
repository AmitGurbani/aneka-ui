import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">
          Aneka UI
        </h1>
        <p className="text-2xl text-muted-foreground mb-4">
          Design system patterns with YOUR brand colors
        </p>
        <p className="text-lg text-muted-foreground mb-12">
          Framework-agnostic component library providing authentic Material Design,
          Apple HIG, and Samsung One UI patterns that adapt to your Tailwind colors.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link
            to="/material"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Demo
          </Link>
          <a
            href="https://github.com/yourusername/aneka-ui"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            GitHub
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Material Design</h3>
            <p className="text-muted-foreground mb-4">
              Google's design system with 8pt grid, elevation shadows, and 200ms animations
            </p>
            <Link to="/material" className="text-primary hover:underline">
              View Components →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Apple HIG</h3>
            <p className="text-muted-foreground mb-4">
              Apple's Human Interface Guidelines with subtle shadows and spring-like animations
            </p>
            <Link to="/hig" className="text-primary hover:underline">
              View Components →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Samsung One UI</h3>
            <p className="text-muted-foreground mb-4">
              Samsung's One UI with generous spacing, bold text, and prominent shadows
            </p>
            <Link to="/oneui" className="text-primary hover:underline">
              View Components →
            </Link>
          </div>
        </div>

        <div className="mt-16 p-8 bg-muted rounded-lg text-left">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="space-y-4 font-mono text-sm">
            <div>
              <p className="text-muted-foreground mb-2"># Install CLI globally</p>
              <code className="block bg-background p-3 rounded">
                npm install -g @aneka-ui/cli
              </code>
            </div>
            <div>
              <p className="text-muted-foreground mb-2"># Initialize in your project</p>
              <code className="block bg-background p-3 rounded">
                aneka-ui init
              </code>
            </div>
            <div>
              <p className="text-muted-foreground mb-2"># Add components</p>
              <code className="block bg-background p-3 rounded">
                aneka-ui add button card badge
              </code>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">🎨 Your Brand Colors</h3>
              <p className="text-muted-foreground">
                Components adapt to your Tailwind colors. You provide the colors, we provide the patterns.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">📦 Copy-Paste Approach</h3>
              <p className="text-muted-foreground">
                Components live in your codebase. You own and modify them freely.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">⚡ Framework Native</h3>
              <p className="text-muted-foreground">
                True React, Vue, and Angular implementations. No wrappers, no compromises.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">♿ Accessible</h3>
              <p className="text-muted-foreground">
                Built with Radix UI primitives for keyboard navigation and screen readers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
