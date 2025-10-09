import { useState } from 'react'
import { Button } from '@/components/material/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/material/card'
import { Badge } from '@/components/material/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/material/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/material/tooltip'

export default function MaterialPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Material Design</h1>
          <p className="text-xl text-muted-foreground">
            Google's Material Design system with 8pt grid, elevation shadows, and 200ms animations
          </p>
        </div>

        {/* Design Characteristics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Design Characteristics</CardTitle>
            <CardDescription>Key properties of Material Design components</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Typography</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Uppercase text for buttons</li>
                <li>• Medium letter spacing (tracking-wide)</li>
                <li>• Font weight: 500</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Spacing & Geometry</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 8pt grid system</li>
                <li>• 4px border radius for buttons</li>
                <li>• 8px border radius for cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Shadows & Elevation</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Subtle elevation shadows</li>
                <li>• Increased shadow on hover</li>
                <li>• Depth indicates hierarchy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Motion</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 200ms transition duration</li>
                <li>• Standard easing curve</li>
                <li>• Scale and fade animations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Button Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Button</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>Different button styles for various contexts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Button sizing options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>States</CardTitle>
              <CardDescription>Interactive and disabled states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setCount(count + 1)}>
                  Clicked {count} times
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Card</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card demonstrates the Material Design elevation shadow and 8px border radius.
                  Notice the subtle shadow that gives depth to the card.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Card with action buttons in footer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Cards can include footer sections with action buttons that follow Material Design principles.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Badge Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Badge</h2>

          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Status indicators with uppercase text</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm mb-3">Badges in context:</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Status:</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Priority:</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Version:</span>
                    <Badge variant="outline">v2.0.1</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dialog Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Dialog</h2>

          <Card>
            <CardHeader>
              <CardTitle>Modal Dialog</CardTitle>
              <CardDescription>Accessible dialog with backdrop and animations</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Material Design Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog features Material Design's characteristic elevation shadow,
                      8px border radius, and 200ms scale animation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      The dialog content can include any components. Notice the smooth
                      fade and scale animation when opening and closing.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        {/* Tooltip Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Tooltip</h2>

          <Card>
            <CardHeader>
              <CardTitle>Contextual Tooltips</CardTitle>
              <CardDescription>Hover to reveal additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Material Design tooltip with 4px radius</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">More info</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>200ms fade animation</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline">v2.0.1</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Released on Jan 15, 2025</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </section>

        {/* Code Example */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Usage Example</h2>

          <Card>
            <CardHeader>
              <CardTitle>Import and Use</CardTitle>
              <CardDescription>Copy-paste approach for full control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Button } from '@/components/material/button'

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  )
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
