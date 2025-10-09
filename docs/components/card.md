# Card

Cards contain content and actions about a single subject.

## Usage

::: code-group
```tsx [React]
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  )
}
```

```vue [Vue]
<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card.vue'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content</p>
    </CardContent>
    <CardFooter>
      <p>Card footer</p>
    </CardFooter>
  </Card>
</template>
```

```ts [Angular]
import { CardComponent } from '@/components/ui/card.component';

@Component({
  imports: [CardComponent],
  template: `
    <aneka-card>
      <h2>Card Title</h2>
      <p>Card content</p>
    </aneka-card>
  `
})
```
:::

## Installation

```bash
aneka-ui add card
```

## Components

The Card component is composed of several sub-components:

- **Card** - Container element
- **CardHeader** - Card header with title and description
- **CardTitle** - Main heading
- **CardDescription** - Supporting text below title
- **CardContent** - Main content area
- **CardFooter** - Footer with actions or metadata

## Examples

### Basic Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Message content goes here</p>
  </CardContent>
</Card>
```

### Card with Footer Actions

```tsx
import { Button } from '@/components/ui/button'

<Card>
  <CardHeader>
    <CardTitle>Create Project</CardTitle>
    <CardDescription>Deploy your new project in one-click</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      {/* Form fields */}
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Card 1</CardTitle>
    </CardHeader>
    <CardContent>Content</CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Card 2</CardTitle>
    </CardHeader>
    <CardContent>Content</CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Card 3</CardTitle>
    </CardHeader>
    <CardContent>Content</CardContent>
  </Card>
</div>
```

### Interactive Card

```tsx
<Card className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
    <CardDescription>This card responds to hover</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Click to learn more</p>
  </CardContent>
</Card>
```

## Design System Differences

### Material Design
- 8px border radius (`rounded-lg`)
- 1px border
- Subtle elevation shadow
- Standard padding (1.5rem)

### Apple HIG
- 12px border radius (`rounded-xl`)
- 1px border
- Subtle, soft shadow
- Clean minimal design
- Tight leading on titles

### Samsung One UI
- 16px border radius (`rounded-2xl`)
- 2px border (thicker)
- Prominent shadow
- Generous padding (2rem)
- Bold visual presence

## API Reference

### Card

Container component for card content.

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

Plus all standard HTML div attributes.

### CardHeader

Header section of the card.

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

### CardTitle

Main heading of the card.

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

Renders as `<h3>` by default.

### CardDescription

Supporting text below the title.

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

### CardContent

Main content area of the card.

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

### CardFooter

Footer section, typically for actions.

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |

## Accessibility

- Use semantic HTML structure (header, section, footer)
- CardTitle renders as `<h3>` for proper heading hierarchy
- Ensure interactive cards have proper keyboard focus
- Add appropriate ARIA labels for screen readers
- Use `role="article"` for standalone cards if needed

## Styling Tips

### Custom Backgrounds

```tsx
<Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
  <CardHeader>
    <CardTitle>Gradient Card</CardTitle>
  </CardHeader>
  <CardContent>Beautiful gradient background</CardContent>
</Card>
```

### Image Cards

```tsx
<Card>
  <img src="/image.jpg" alt="Card image" className="w-full h-48 object-cover" />
  <CardHeader>
    <CardTitle>Image Card</CardTitle>
  </CardHeader>
  <CardContent>Card with image</CardContent>
</Card>
```

### Overflow Content

```tsx
<Card>
  <CardHeader>
    <CardTitle>Scrollable Content</CardTitle>
  </CardHeader>
  <CardContent className="max-h-64 overflow-y-auto">
    {/* Long content */}
  </CardContent>
</Card>
```

## Dependencies

- No external dependencies
- Uses standard HTML elements
