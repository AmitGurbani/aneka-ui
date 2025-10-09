# Badge

Badges display a label or status indicator.

## Usage

::: code-group
```tsx [React]
import { Badge } from '@/components/ui/badge'

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}
```

```vue [Vue]
<script setup lang="ts">
import Badge from '@/components/ui/Badge.vue'
</script>

<template>
  <Badge>Badge</Badge>
</template>
```

```ts [Angular]
import { BadgeComponent } from '@/components/ui/badge.component';

@Component({
  imports: [BadgeComponent],
  template: '<aneka-badge>Badge</aneka-badge>'
})
```
:::

## Installation

```bash
aneka-ui add badge
```

## Variants

Badges come in different variants for different contexts:

### Default
The primary badge style.

```tsx
<Badge variant="default">Default</Badge>
```

### Secondary
For secondary or less prominent labels.

```tsx
<Badge variant="secondary">Secondary</Badge>
```

### Destructive
For error or warning states.

```tsx
<Badge variant="destructive">Destructive</Badge>
```

### Outline
For badges that need less visual weight.

```tsx
<Badge variant="outline">Outline</Badge>
```

## Examples

### Status Indicators

```tsx
<div className="flex gap-2">
  <Badge variant="default">Active</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Error</Badge>
</div>
```

### With Icons

```tsx
import { CheckCircle } from 'lucide-react'

<Badge>
  <CheckCircle className="mr-1 h-3 w-3" />
  Verified
</Badge>
```

### Notification Badge

```tsx
<div className="relative inline-block">
  <Button>Messages</Button>
  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
    3
  </Badge>
</div>
```

### Tags/Labels

```tsx
<div className="flex flex-wrap gap-2">
  <Badge variant="outline">React</Badge>
  <Badge variant="outline">TypeScript</Badge>
  <Badge variant="outline">Tailwind</Badge>
  <Badge variant="outline">Vite</Badge>
</div>
```

### User Role Badges

```tsx
<div className="flex items-center gap-2">
  <span>John Doe</span>
  <Badge variant="secondary">Admin</Badge>
  <Badge variant="default">Pro</Badge>
</div>
```

### Priority Indicators

```tsx
<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Badge variant="destructive">High</Badge>
    <span>Critical bug</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge>Medium</Badge>
    <span>Feature request</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="secondary">Low</Badge>
    <span>Documentation</span>
  </div>
</div>
```

## Design System Differences

### Material Design
- **Text Transform**: UPPERCASE
- **Border Radius**: Full rounded (`rounded-full`)
- **Font Size**: Extra small (12px)
- **Font Weight**: 600 (Semibold)
- **Letter Spacing**: Wide (`tracking-wide`)
- **Shadow**: Subtle elevation

### Apple HIG
- **Text Transform**: Normal case
- **Border Radius**: 6px (`rounded-md`)
- **Font Size**: Extra small (12px)
- **Font Weight**: 600 (Semibold)
- **Letter Spacing**: Tight (`tracking-tight`)
- **Border**: 1px border
- **Shadow**: Subtle

### Samsung One UI
- **Text Transform**: Normal case
- **Border Radius**: Full rounded (`rounded-full`)
- **Font Size**: Small (14px, larger than others)
- **Font Weight**: 700 (Bold)
- **Border**: 2px border (thicker)
- **Shadow**: More prominent

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Badge style variant |
| `className` | `string` | - | Additional CSS classes |

Plus all standard HTML div attributes.

## Accessibility

- Use semantic HTML elements
- Badges are purely visual by default
- Add `aria-label` for screen readers if badge conveys important info
- For notification badges, use `aria-live="polite"` for count updates
- Consider color contrast for text readability

### Example with ARIA

```tsx
<Badge aria-label="Status: Active" variant="default">
  Active
</Badge>

<Badge aria-label="3 unread notifications">
  3
</Badge>
```

## Styling Tips

### Custom Colors

```tsx
<Badge className="bg-purple-500 text-white hover:bg-purple-600">
  Custom Color
</Badge>
```

### Larger Size

```tsx
<Badge className="px-4 py-1.5 text-sm">
  Large Badge
</Badge>
```

### Badge Dot

```tsx
<Badge className="h-2 w-2 p-0 rounded-full" />
```

### Animated Badge

```tsx
<Badge className="animate-pulse">
  Live
</Badge>
```

## Common Patterns

### Count Badge

```tsx
function CountBadge({ count }: { count: number }) {
  if (count === 0) return null
  
  return (
    <Badge variant="destructive">
      {count > 99 ? '99+' : count}
    </Badge>
  )
}
```

### Status Badge

```tsx
function StatusBadge({ status }: { status: string }) {
  const variant = {
    active: 'default',
    pending: 'secondary',
    error: 'destructive',
  }[status] || 'outline'
  
  return <Badge variant={variant}>{status}</Badge>
}
```

## Dependencies

- `class-variance-authority`
- `clsx`
- `tailwind-merge`
