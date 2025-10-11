import { useState } from "react";

import { Badge } from "@/components/oneui/badge";
import { Button } from "@/components/oneui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/oneui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/oneui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/oneui/tooltip";

export default function OneUIPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold">Samsung One UI</h1>
          <p className="text-muted-foreground text-xl">
            Samsung's One UI with generous spacing, bold text, and prominent
            shadows
          </p>
        </div>

        {/* Design Characteristics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Design Characteristics</CardTitle>
            <CardDescription>
              Key properties of Samsung One UI components
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Typography</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Bold text (600-700 weight)</li>
                <li>• Normal tracking (not tight/wide)</li>
                <li>• Larger text sizes for emphasis</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Spacing & Geometry</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Very generous padding</li>
                <li>• 16px border radius (notably rounded)</li>
                <li>• 2px borders for emphasis</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Shadows & Depth</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Prominent, visible shadows</li>
                <li>• Strong depth indicators</li>
                <li>• Enhanced shadow on interaction</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Motion</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• 250ms transition duration</li>
                <li>• Smooth, deliberate easing</li>
                <li>• Bold, confident animations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Button Component */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Button</h2>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Notice the bold text and prominent shadows
                </CardDescription>
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
                <CardTitle>Generous Sizing</CardTitle>
                <CardDescription>
                  One UI buttons have extra padding for easier tapping
                </CardDescription>
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
                <CardTitle>Interactive States</CardTitle>
                <CardDescription>
                  Click to see the enhanced shadow effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setCount(count + 1)}>
                    Clicked {count} times
                  </Button>
                  <Button disabled>Disabled State</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card Component */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Card</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bold Design</CardTitle>
                <CardDescription>
                  16px radius with 2px borders and prominent shadows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Samsung One UI cards feature notably rounded corners (16px),
                  thicker borders (2px), and more generous padding for a bold,
                  confident appearance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Actions</CardTitle>
                <CardDescription>Generous spacing throughout</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  All elements maintain One UI's signature generous spacing for
                  better readability and easier interaction.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Continue</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Badge Component */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Badge</h2>

          <Card>
            <CardHeader>
              <CardTitle>Badge Styles</CardTitle>
              <CardDescription>
                Bold text with pill shape and 2px borders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-wrap gap-4">
                <Badge variant="default">Active</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="destructive">Critical</Badge>
                <Badge variant="outline">v2.0.1</Badge>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="mb-3 text-sm">Badges in context:</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Status:</span>
                    <Badge>Connected</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Alert:</span>
                    <Badge variant="destructive">Important</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Build:</span>
                    <Badge variant="secondary">Beta</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dialog Component */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Dialog</h2>

          <Card>
            <CardHeader>
              <CardTitle>Modal Dialog</CardTitle>
              <CardDescription>
                Prominent shadow with 250ms animation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Samsung One UI Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog follows One UI principles with 16px border
                      radius, prominent shadows, and generous 2rem padding.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-muted-foreground text-sm">
                      Notice the bold, confident design with ample spacing that
                      makes content easy to read and interact with.
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
          <h2 className="mb-6 text-3xl font-bold">Tooltip</h2>

          <Card>
            <CardHeader>
              <CardTitle>Rich Tooltips</CardTitle>
              <CardDescription>
                Hover for larger tooltips with prominent styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>One UI tooltip with 16px radius</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">More info</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>250ms smooth animation</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline">New</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Just released this week</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </section>

        {/* Code Example */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Usage Example</h2>

          <Card>
            <CardHeader>
              <CardTitle>Import and Use</CardTitle>
              <CardDescription>Components in your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted overflow-x-auto rounded-lg p-4 font-mono text-sm">
                <pre>{`import { Button } from '@/components/oneui/button'

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
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
  );
}
