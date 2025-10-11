# Button

Buttons allow users to take actions with a single tap.

## Usage

::: code-group

```tsx [React]
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return <Button>Click me</Button>;
}
```

```vue [Vue]
<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <Button>Click me</Button>
</template>
```

```ts [Angular]
import { ButtonComponent } from '@/components/ui/button.component';

@Component({
  imports: [ButtonComponent],
  template: '<aneka-button>Click me</aneka-button>'
})
```

:::

## Installation

```bash
aneka-ui add button
```

## Variants

Buttons come in different variants for different contexts:

### Default

The primary button for main actions.

```tsx
<Button variant="default">Default</Button>
```

### Secondary

For secondary or less prominent actions.

```tsx
<Button variant="secondary">Secondary</Button>
```

### Destructive

For dangerous actions like deleting data.

```tsx
<Button variant="destructive">Delete</Button>
```

### Outline

For actions that need less visual weight.

```tsx
<Button variant="outline">Outline</Button>
```

### Ghost

For the least prominent actions.

```tsx
<Button variant="ghost">Ghost</Button>
```

### Link

Styled as a link.

```tsx
<Button variant="link">Link</Button>
```

## Sizes

Buttons come in three sizes:

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

## Design System Differences

### Material Design

- Uppercase text (`BUTTON TEXT`)
- 4px border radius
- Elevation shadows that increase on hover
- 200ms transitions
- Font weight: 500

### Apple HIG

- Sentence case text (`Button Text`)
- 6px border radius
- Subtle shadows
- 150ms spring-like animations
- Scale down on press (0.98)
- Font weight: 600

### Samsung One UI

- Normal case text (`Button Text`)
- 16px border radius (notably rounded)
- Prominent shadows
- 250ms smooth transitions
- Generous padding
- Font weight: 600

## API Reference

### Props

| Prop       | Type                                                                          | Default     | Description                          |
| ---------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------ |
| `variant`  | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Button style variant                 |
| `size`     | `'sm' \| 'default' \| 'lg' \| 'icon'`                                         | `'default'` | Button size                          |
| `asChild`  | `boolean`                                                                     | `false`     | (React only) Render as child element |
| `disabled` | `boolean`                                                                     | `false`     | Disable button interaction           |

Plus all standard HTML button attributes.

## Examples

### With Icon

```tsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ButtonWithIcon() {
  return (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Item
    </Button>
  );
}
```

### Loading State

```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
```

### As Link (React)

```tsx
import { Button } from "@/components/ui/button";

export function ButtonAsLink() {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  );
}
```

## Accessibility

- Buttons have proper `role="button"` semantics
- Keyboard accessible (Enter and Space to activate)
- Focus visible styles for keyboard navigation
- Disabled state properly communicated to screen readers
- Use `aria-label` for icon-only buttons

## Dependencies

- `@radix-ui/react-slot` (React only)
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
