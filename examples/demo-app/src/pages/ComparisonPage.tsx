import { Button as MaterialButton } from '@/components/material/button'
import { Card as MaterialCard, CardHeader as MaterialCardHeader, CardTitle as MaterialCardTitle, CardDescription as MaterialCardDescription, CardContent as MaterialCardContent } from '@/components/material/card'
import { Badge as MaterialBadge } from '@/components/material/badge'

import { Button as HIGButton } from '@/components/hig/button'
import { Card as HIGCard, CardHeader as HIGCardHeader, CardTitle as HIGCardTitle, CardDescription as HIGCardDescription, CardContent as HIGCardContent } from '@/components/hig/card'
import { Badge as HIGBadge } from '@/components/hig/badge'

import { Button as OneUIButton } from '@/components/oneui/button'
import { Card as OneUICard, CardHeader as OneUICardHeader, CardTitle as OneUICardTitle, CardDescription as OneUICardDescription, CardContent as OneUICardContent } from '@/components/oneui/card'
import { Badge as OneUIBadge } from '@/components/oneui/badge'

export default function ComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Design System Comparison</h1>
          <p className="text-xl text-muted-foreground">
            See how the same components look across different design systems with your brand colors
          </p>
        </div>

        {/* Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Material Design</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Uppercase text</li>
              <li>• 4-8px radius</li>
              <li>• Elevation shadows</li>
              <li>• 200ms animations</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Apple HIG</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Sentence case</li>
              <li>• 6-12px radius</li>
              <li>• Subtle shadows</li>
              <li>• 150ms spring animations</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Samsung One UI</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Bold text</li>
              <li>• 16px radius</li>
              <li>• Prominent shadows</li>
              <li>• 250ms smooth animations</li>
            </ul>
          </div>
        </div>

        {/* Button Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Button Variants</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Material Design</h3>
              <MaterialCard>
                <MaterialCardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <MaterialButton variant="default" className="w-full">PRIMARY</MaterialButton>
                    <MaterialButton variant="secondary" className="w-full">SECONDARY</MaterialButton>
                    <MaterialButton variant="destructive" className="w-full">DESTRUCTIVE</MaterialButton>
                    <MaterialButton variant="outline" className="w-full">OUTLINE</MaterialButton>
                  </div>
                </MaterialCardContent>
              </MaterialCard>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Apple HIG</h3>
              <HIGCard>
                <HIGCardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <HIGButton variant="default" className="w-full">Primary</HIGButton>
                    <HIGButton variant="secondary" className="w-full">Secondary</HIGButton>
                    <HIGButton variant="destructive" className="w-full">Destructive</HIGButton>
                    <HIGButton variant="outline" className="w-full">Outline</HIGButton>
                  </div>
                </HIGCardContent>
              </HIGCard>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Samsung One UI</h3>
              <OneUICard>
                <OneUICardContent className="pt-8">
                  <div className="flex flex-col gap-3">
                    <OneUIButton variant="default" className="w-full">Primary</OneUIButton>
                    <OneUIButton variant="secondary" className="w-full">Secondary</OneUIButton>
                    <OneUIButton variant="destructive" className="w-full">Destructive</OneUIButton>
                    <OneUIButton variant="outline" className="w-full">Outline</OneUIButton>
                  </div>
                </OneUICardContent>
              </OneUICard>
            </div>
          </div>
        </section>

        {/* Badge Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Badge Styles</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Material Design</h3>
              <MaterialCard>
                <MaterialCardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <MaterialBadge variant="default">ACTIVE</MaterialBadge>
                    <MaterialBadge variant="secondary">DRAFT</MaterialBadge>
                    <MaterialBadge variant="destructive">ERROR</MaterialBadge>
                    <MaterialBadge variant="outline">V2.0</MaterialBadge>
                  </div>
                </MaterialCardContent>
              </MaterialCard>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Apple HIG</h3>
              <HIGCard>
                <HIGCardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <HIGBadge variant="default">Active</HIGBadge>
                    <HIGBadge variant="secondary">Draft</HIGBadge>
                    <HIGBadge variant="destructive">Error</HIGBadge>
                    <HIGBadge variant="outline">v2.0</HIGBadge>
                  </div>
                </HIGCardContent>
              </HIGCard>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Samsung One UI</h3>
              <OneUICard>
                <OneUICardContent className="pt-8">
                  <div className="flex flex-wrap gap-2 justify-center">
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
          <h2 className="text-3xl font-bold mb-6">Card Components</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Material Design</h3>
              <MaterialCard>
                <MaterialCardHeader>
                  <MaterialCardTitle>Card Title</MaterialCardTitle>
                  <MaterialCardDescription>8px radius, 1px border, elevation shadow</MaterialCardDescription>
                </MaterialCardHeader>
                <MaterialCardContent>
                  <p className="text-sm text-muted-foreground">
                    Material Design cards use subtle shadows to create depth and hierarchy.
                  </p>
                </MaterialCardContent>
              </MaterialCard>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Apple HIG</h3>
              <HIGCard>
                <HIGCardHeader>
                  <HIGCardTitle>Card Title</HIGCardTitle>
                  <HIGCardDescription>12px radius, 1px border, subtle shadow</HIGCardDescription>
                </HIGCardHeader>
                <HIGCardContent>
                  <p className="text-sm text-muted-foreground">
                    Apple HIG cards feature softer corners and minimal shadows for a clean look.
                  </p>
                </HIGCardContent>
              </HIGCard>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Samsung One UI</h3>
              <OneUICard>
                <OneUICardHeader>
                  <OneUICardTitle>Card Title</OneUICardTitle>
                  <OneUICardDescription>16px radius, 2px border, prominent shadow</OneUICardDescription>
                </OneUICardHeader>
                <OneUICardContent>
                  <p className="text-sm text-muted-foreground">
                    One UI cards use bold styling with generous spacing and strong shadows.
                  </p>
                </OneUICardContent>
              </OneUICard>
            </div>
          </div>
        </section>

        {/* Key Differences Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key Differences</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Property</th>
                  <th className="text-left p-4 font-semibold">Material Design</th>
                  <th className="text-left p-4 font-semibold">Apple HIG</th>
                  <th className="text-left p-4 font-semibold">Samsung One UI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-4 font-medium">Text Case</td>
                  <td className="p-4 text-muted-foreground">UPPERCASE buttons</td>
                  <td className="p-4 text-muted-foreground">Sentence case</td>
                  <td className="p-4 text-muted-foreground">Normal case</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Border Radius</td>
                  <td className="p-4 text-muted-foreground">4-8px</td>
                  <td className="p-4 text-muted-foreground">6-12px</td>
                  <td className="p-4 text-muted-foreground">16px</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Shadows</td>
                  <td className="p-4 text-muted-foreground">Elevation shadows</td>
                  <td className="p-4 text-muted-foreground">Subtle, soft</td>
                  <td className="p-4 text-muted-foreground">Prominent, bold</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Animation Duration</td>
                  <td className="p-4 text-muted-foreground">200ms</td>
                  <td className="p-4 text-muted-foreground">150ms</td>
                  <td className="p-4 text-muted-foreground">250ms</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Easing</td>
                  <td className="p-4 text-muted-foreground">Standard cubic-bezier</td>
                  <td className="p-4 text-muted-foreground">Spring-like</td>
                  <td className="p-4 text-muted-foreground">Smooth</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Padding</td>
                  <td className="p-4 text-muted-foreground">Standard (1.5rem)</td>
                  <td className="p-4 text-muted-foreground">Generous (1.5rem)</td>
                  <td className="p-4 text-muted-foreground">Extra generous (2rem)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Border Width</td>
                  <td className="p-4 text-muted-foreground">1px</td>
                  <td className="p-4 text-muted-foreground">1px</td>
                  <td className="p-4 text-muted-foreground">2px</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Font Weight</td>
                  <td className="p-4 text-muted-foreground">500 (Medium)</td>
                  <td className="p-4 text-muted-foreground">600 (Semibold)</td>
                  <td className="p-4 text-muted-foreground">600-700 (Bold)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Design Philosophy</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Material Design</h3>
              <p className="text-sm text-muted-foreground">
                Google's Material Design uses elevation and shadows to create a sense of depth.
                Components feel like physical paper floating at different heights, with precise
                measurements and systematic design.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Apple HIG</h3>
              <p className="text-sm text-muted-foreground">
                Apple's HIG emphasizes clarity, deference, and depth. Components are minimal and
                elegant, with subtle animations that feel natural and responsive. The design gets
                out of the way to let content shine.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Samsung One UI</h3>
              <p className="text-sm text-muted-foreground">
                Samsung's One UI prioritizes one-handed use and readability with generous spacing,
                bold typography, and prominent visual elements. The design is confident and makes
                interactions easy and comfortable.
              </p>
            </div>
          </div>
        </section>

        {/* Same Colors, Different Patterns */}
        <section>
          <div className="p-8 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Your Brand, Different Patterns</h2>
            <p className="text-muted-foreground mb-4">
              All three design systems use the same color palette from your Tailwind config.
              Aneka UI provides the design patterns - you provide the colors.
            </p>
            <p className="text-sm text-muted-foreground">
              This allows you to maintain your brand identity while leveraging proven design
              patterns from industry leaders. Choose the system that best fits your product's
              personality and target audience.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
