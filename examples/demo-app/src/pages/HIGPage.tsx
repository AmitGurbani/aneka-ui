import { useState } from 'react'
import { Button } from '@/components/hig/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/hig/card'
import { Badge } from '@/components/hig/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/hig/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/hig/tooltip'

export default function HIGPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Apple HIG</h1>
          <p className="text-xl text-muted-foreground">
            Apple's Human Interface Guidelines with subtle shadows and spring-like animations
          </p>
        </div>

        {/* Design Characteristics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Design Characteristics</CardTitle>
            <CardDescription>Key properties of Apple HIG components</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Typography</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sentence case (not uppercase)</li>
                <li>• Tight letter spacing (tracking-tight)</li>
                <li>• Font weight: 600 (semibold)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Spacing & Geometry</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Generous padding and spacing</li>
                <li>• 6px border radius for buttons</li>
                <li>• 12px border radius for cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Shadows & Depth</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Subtle, soft shadows</li>
                <li>• Minimal depth indicators</li>
                <li>• Clean, minimal aesthetic</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Motion</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 150ms transition duration</li>
                <li>• Spring-like easing curve</li>
                <li>• Scale-on-press interaction (0.98)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Button Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Button</h2>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Notice the sentence case text (not uppercase)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Button</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Press Effect</CardTitle>
                <CardDescription>Try pressing buttons to see the subtle scale effect</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setCount(count + 1)}>
                    Clicked {count} times
                  </Button>
                  <Button variant="secondary">Press and hold</Button>
                  <Button disabled>Disabled State</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Card</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rounded Corners</CardTitle>
                <CardDescription>12px border radius for a softer look</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Apple HIG cards feature larger border radius (12px) compared to Material Design,
                  giving them a softer, more organic appearance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Actions</CardTitle>
                <CardDescription>Buttons maintain HIG styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Action buttons follow Apple's HIG principles with generous padding.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button size="sm">Continue</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Badge Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Badge</h2>

          <Card>
            <CardHeader>
              <CardTitle>Badge Styles</CardTitle>
              <CardDescription>Normal case text with 6px rounded corners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge variant="default">Active</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="destructive">Critical</Badge>
                <Badge variant="outline">v2.0.1</Badge>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm mb-3">Badges in context:</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Status:</span>
                    <Badge>Online</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Alert:</span>
                    <Badge variant="destructive">Urgent</Badge>
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
              <CardDescription>Smooth spring animation with 150ms duration</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apple HIG Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog follows Apple's Human Interface Guidelines with 12px border radius,
                      subtle shadows, and spring-like animations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Notice the smooth animation that feels natural and responsive,
                      characteristic of Apple's design philosophy.
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
              <CardTitle>Contextual Information</CardTitle>
              <CardDescription>Hover elements to see subtle tooltips</CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Apple HIG tooltip with 6px radius</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">More info</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>150ms spring animation</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline">Beta</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This feature is in beta testing</p>
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
              <CardDescription>Components copied to your codebase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Button } from '@/components/hig/button'

export function MyComponent() {
  return (
    <Button variant="default" size="default">
      Continue
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
