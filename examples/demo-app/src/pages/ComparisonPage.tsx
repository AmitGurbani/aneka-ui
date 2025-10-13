import { Badge as HIGBadge } from "@/components/hig/badge";
import { Button as HIGButton } from "@/components/hig/button";
import {
  Card as HIGCard,
  CardHeader as HIGCardHeader,
  CardTitle as HIGCardTitle,
  CardDescription as HIGCardDescription,
  CardContent as HIGCardContent,
} from "@/components/hig/card";
import { Badge as MaterialBadge } from "@/components/material/badge";
import { Button as MaterialButton } from "@/components/material/button";
import {
  Card as MaterialCard,
  CardHeader as MaterialCardHeader,
  CardTitle as MaterialCardTitle,
  CardDescription as MaterialCardDescription,
  CardContent as MaterialCardContent,
} from "@/components/material/card";
import { Badge as OneUIBadge } from "@/components/oneui/badge";
import { Button as OneUIButton } from "@/components/oneui/button";
import {
  Card as OneUICard,
  CardHeader as OneUICardHeader,
  CardTitle as OneUICardTitle,
  CardDescription as OneUICardDescription,
  CardContent as OneUICardContent,
} from "@/components/oneui/card";

export default function ComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold">Design System Comparison</h1>
          <p className="text-muted-foreground text-xl">
            See how the same components look across different design systems
            with your brand colors
          </p>
        </div>

        {/* Overview */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-3 text-lg font-semibold">Material Design</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Uppercase text</li>
              <li>• 4-8px radius</li>
              <li>• Elevation shadows</li>
              <li>• 200ms animations</li>
            </ul>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-3 text-lg font-semibold">Apple HIG</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Sentence case</li>
              <li>• 6-12px radius</li>
              <li>• Subtle shadows</li>
              <li>• 150ms spring animations</li>
            </ul>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-3 text-lg font-semibold">Samsung One UI</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Bold text</li>
              <li>• 16px radius</li>
              <li>• Prominent shadows</li>
              <li>• 250ms smooth animations</li>
            </ul>
          </div>
        </div>

        {/* Button Comparison */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Button Variants</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Material Design
              </h3>
              <MaterialCard>
                <MaterialCardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <MaterialButton variant="filled" className="w-full">
                      PRIMARY
                    </MaterialButton>
                    <MaterialButton variant="filled-tonal" className="w-full">
                      SECONDARY
                    </MaterialButton>
                    <MaterialButton variant="destructive" className="w-full">
                      DESTRUCTIVE
                    </MaterialButton>
                    <MaterialButton variant="outlined" className="w-full">
                      OUTLINE
                    </MaterialButton>
                  </div>
                </MaterialCardContent>
              </MaterialCard>
            </div>

            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Apple HIG
              </h3>
              <HIGCard>
                <HIGCardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <HIGButton variant="default" className="w-full">
                      Primary
                    </HIGButton>
                    <HIGButton variant="secondary" className="w-full">
                      Secondary
                    </HIGButton>
                    <HIGButton variant="destructive" className="w-full">
                      Destructive
                    </HIGButton>
                    <HIGButton variant="outline" className="w-full">
                      Outline
                    </HIGButton>
                  </div>
                </HIGCardContent>
              </HIGCard>
            </div>

            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Samsung One UI
              </h3>
              <OneUICard>
                <OneUICardContent className="pt-8">
                  <div className="flex flex-col gap-3">
                    <OneUIButton variant="default" className="w-full">
                      Primary
                    </OneUIButton>
                    <OneUIButton variant="secondary" className="w-full">
                      Secondary
                    </OneUIButton>
                    <OneUIButton variant="destructive" className="w-full">
                      Destructive
                    </OneUIButton>
                    <OneUIButton variant="outline" className="w-full">
                      Outline
                    </OneUIButton>
                  </div>
                </OneUICardContent>
              </OneUICard>
            </div>
          </div>
        </section>

        {/* Badge Comparison */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Badge Styles</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Material Design
              </h3>
              <MaterialCard>
                <MaterialCardContent className="pt-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    <MaterialBadge variant="default">ACTIVE</MaterialBadge>
                    <MaterialBadge variant="secondary">DRAFT</MaterialBadge>
                    <MaterialBadge variant="destructive">ERROR</MaterialBadge>
                    <MaterialBadge variant="outline">V2.0</MaterialBadge>
                  </div>
                </MaterialCardContent>
              </MaterialCard>
            </div>

            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Apple HIG
              </h3>
              <HIGCard>
                <HIGCardContent className="pt-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    <HIGBadge variant="default">Active</HIGBadge>
                    <HIGBadge variant="secondary">Draft</HIGBadge>
                    <HIGBadge variant="destructive">Error</HIGBadge>
                    <HIGBadge variant="outline">v2.0</HIGBadge>
                  </div>
                </HIGCardContent>
              </HIGCard>
            </div>

            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Samsung One UI
              </h3>
              <OneUICard>
                <OneUICardContent className="pt-8">
                  <div className="flex flex-wrap justify-center gap-2">
                    <OneUIBadge variant="default">Active</OneUIBadge>
                    <OneUIBadge variant="secondary">Draft</OneUIBadge>
                    <OneUIBadge variant="destructive">Error</OneUIBadge>
                    <OneUIBadge variant="outline">v2.0</OneUIBadge>
                  </div>
                </OneUICardContent>
              </OneUICard>
            </div>
          </div>
        </section>

        {/* Card Comparison */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Card Components</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Material Design
              </h3>
              <MaterialCard>
                <MaterialCardHeader>
                  <MaterialCardTitle>Card Title</MaterialCardTitle>
                  <MaterialCardDescription>
                    8px radius, 1px border, elevation shadow
                  </MaterialCardDescription>
                </MaterialCardHeader>
                <MaterialCardContent>
                  <p className="text-muted-foreground text-sm">
                    Material Design cards use subtle shadows to create depth and
                    hierarchy.
                  </p>
                </MaterialCardContent>
              </MaterialCard>
            </div>

            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Apple HIG
              </h3>
              <HIGCard>
                <HIGCardHeader>
                  <HIGCardTitle>Card Title</HIGCardTitle>
                  <HIGCardDescription>
                    12px radius, 1px border, subtle shadow
                  </HIGCardDescription>
                </HIGCardHeader>
                <HIGCardContent>
                  <p className="text-muted-foreground text-sm">
                    Apple HIG cards feature softer corners and minimal shadows
                    for a clean look.
                  </p>
                </HIGCardContent>
              </HIGCard>
            </div>

            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                Samsung One UI
              </h3>
              <OneUICard>
                <OneUICardHeader>
                  <OneUICardTitle>Card Title</OneUICardTitle>
                  <OneUICardDescription>
                    16px radius, 2px border, prominent shadow
                  </OneUICardDescription>
                </OneUICardHeader>
                <OneUICardContent>
                  <p className="text-muted-foreground text-sm">
                    One UI cards use bold styling with generous spacing and
                    strong shadows.
                  </p>
                </OneUICardContent>
              </OneUICard>
            </div>
          </div>
        </section>

        {/* Key Differences Table */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Key Differences</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold">Property</th>
                  <th className="p-4 text-left font-semibold">
                    Material Design
                  </th>
                  <th className="p-4 text-left font-semibold">Apple HIG</th>
                  <th className="p-4 text-left font-semibold">
                    Samsung One UI
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-4 font-medium">Text Case</td>
                  <td className="text-muted-foreground p-4">
                    UPPERCASE buttons
                  </td>
                  <td className="text-muted-foreground p-4">Sentence case</td>
                  <td className="text-muted-foreground p-4">Normal case</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Border Radius</td>
                  <td className="text-muted-foreground p-4">4-8px</td>
                  <td className="text-muted-foreground p-4">6-12px</td>
                  <td className="text-muted-foreground p-4">16px</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Shadows</td>
                  <td className="text-muted-foreground p-4">
                    Elevation shadows
                  </td>
                  <td className="text-muted-foreground p-4">Subtle, soft</td>
                  <td className="text-muted-foreground p-4">Prominent, bold</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Animation Duration</td>
                  <td className="text-muted-foreground p-4">200ms</td>
                  <td className="text-muted-foreground p-4">150ms</td>
                  <td className="text-muted-foreground p-4">250ms</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Easing</td>
                  <td className="text-muted-foreground p-4">
                    Standard cubic-bezier
                  </td>
                  <td className="text-muted-foreground p-4">Spring-like</td>
                  <td className="text-muted-foreground p-4">Smooth</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Padding</td>
                  <td className="text-muted-foreground p-4">
                    Standard (1.5rem)
                  </td>
                  <td className="text-muted-foreground p-4">
                    Generous (1.5rem)
                  </td>
                  <td className="text-muted-foreground p-4">
                    Extra generous (2rem)
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Border Width</td>
                  <td className="text-muted-foreground p-4">1px</td>
                  <td className="text-muted-foreground p-4">1px</td>
                  <td className="text-muted-foreground p-4">2px</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Font Weight</td>
                  <td className="text-muted-foreground p-4">500 (Medium)</td>
                  <td className="text-muted-foreground p-4">600 (Semibold)</td>
                  <td className="text-muted-foreground p-4">600-700 (Bold)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Design Philosophy</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-lg font-semibold">Material Design</h3>
              <p className="text-muted-foreground text-sm">
                Google's Material Design uses elevation and shadows to create a
                sense of depth. Components feel like physical paper floating at
                different heights, with precise measurements and systematic
                design.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-lg font-semibold">Apple HIG</h3>
              <p className="text-muted-foreground text-sm">
                Apple's HIG emphasizes clarity, deference, and depth. Components
                are minimal and elegant, with subtle animations that feel
                natural and responsive. The design gets out of the way to let
                content shine.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-lg font-semibold">Samsung One UI</h3>
              <p className="text-muted-foreground text-sm">
                Samsung's One UI prioritizes one-handed use and readability with
                generous spacing, bold typography, and prominent visual
                elements. The design is confident and makes interactions easy
                and comfortable.
              </p>
            </div>
          </div>
        </section>

        {/* Same Colors, Different Patterns */}
        <section>
          <div className="bg-muted rounded-lg p-8">
            <h2 className="mb-4 text-2xl font-bold">
              Your Brand, Different Patterns
            </h2>
            <p className="text-muted-foreground mb-4">
              All three design systems use the same color palette from your
              Tailwind config. Aneka UI provides the design patterns - you
              provide the colors.
            </p>
            <p className="text-muted-foreground text-sm">
              This allows you to maintain your brand identity while leveraging
              proven design patterns from industry leaders. Choose the system
              that best fits your product's personality and target audience.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
