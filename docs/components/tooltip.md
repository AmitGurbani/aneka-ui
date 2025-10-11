# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Usage

::: code-group

```tsx [React]
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

```vue [Vue]
<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip.vue";
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

```ts [Angular]
import { TooltipComponent } from '@/components/ui/tooltip.component';

@Component({
  imports: [TooltipComponent],
  template: '<aneka-tooltip text="Tooltip content">Hover me</aneka-tooltip>'
})
```

:::

## Installation

```bash
aneka-ui add tooltip
```

## Components

The Tooltip component requires several sub-components:

- **TooltipProvider** - Wraps your app or component tree
- **Tooltip** - Root component that manages state
- **TooltipTrigger** - Element that triggers the tooltip
- **TooltipContent** - The tooltip popup

## Examples

### Basic Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Icon with Tooltip

```tsx
import { HelpCircle } from "lucide-react";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <HelpCircle className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Click for help</p>
  </TooltipContent>
</Tooltip>;
```

### Tooltip on Disabled Element

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <span className="inline-block">
      <Button disabled>Disabled</Button>
    </span>
  </TooltipTrigger>
  <TooltipContent>
    <p>This feature is not available</p>
  </TooltipContent>
</Tooltip>
```

### Multiple Tooltips

```tsx
<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Save</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Save your work (Ctrl+S)</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Load</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Load from file (Ctrl+O)</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>
```

### Rich Content Tooltip

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Profile</Button>
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <div className="space-y-2">
      <p className="font-semibold">John Doe</p>
      <p className="text-xs">john@example.com</p>
      <p className="text-muted-foreground text-xs">Member since Jan 2024</p>
    </div>
  </TooltipContent>
</Tooltip>
```

### Positioned Tooltip

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip on top</p>
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button>Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Tooltip on bottom</p>
  </TooltipContent>
</Tooltip>
```

### Delayed Tooltip

```tsx
<TooltipProvider delayDuration={500}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Slow</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Appears after 500ms</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Design System Differences

### Material Design

- **Border Radius**: 4px (small)
- **Font Size**: Extra small (12px)
- **Shadow**: Subtle elevation
- **Animation**: 200ms fade and scale
- **Padding**: Standard

### Apple HIG

- **Border Radius**: 6px
- **Font Size**: Extra small (12px)
- **Shadow**: Subtle soft shadow
- **Animation**: 150ms fade and scale
- **Padding**: Standard
- **Feel**: Clean and minimal

### Samsung One UI

- **Border Radius**: 16px (large, notably rounded)
- **Font Size**: Small (14px, larger than others)
- **Shadow**: Prominent shadow
- **Animation**: 250ms fade and scale
- **Padding**: More generous
- **Feel**: Bold styling

## API Reference

### TooltipProvider

Wraps your app or section.

| Prop                      | Type      | Default | Description                      |
| ------------------------- | --------- | ------- | -------------------------------- |
| `delayDuration`           | `number`  | `700`   | Time in ms before tooltip shows  |
| `skipDelayDuration`       | `number`  | `300`   | Time before showing next tooltip |
| `disableHoverableContent` | `boolean` | `false` | Disable hovering over content    |

### Tooltip

Root tooltip component.

| Prop            | Type                      | Default | Description                |
| --------------- | ------------------------- | ------- | -------------------------- |
| `open`          | `boolean`                 | -       | Controlled open state      |
| `onOpenChange`  | `(open: boolean) => void` | -       | Open state change callback |
| `defaultOpen`   | `boolean`                 | `false` | Default open state         |
| `delayDuration` | `number`                  | -       | Override provider delay    |

### TooltipTrigger

Element that triggers tooltip.

| Prop      | Type      | Description             |
| --------- | --------- | ----------------------- |
| `asChild` | `boolean` | Render as child element |

### TooltipContent

The tooltip popup.

| Prop          | Type                                     | Default    | Description            |
| ------------- | ---------------------------------------- | ---------- | ---------------------- |
| `side`        | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    | Preferred side         |
| `sideOffset`  | `number`                                 | `4`        | Distance from trigger  |
| `align`       | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment              |
| `alignOffset` | `number`                                 | `0`        | Alignment offset       |
| `className`   | `string`                                 | -          | Additional CSS classes |

## Accessibility

The Tooltip component follows WAI-ARIA Tooltip pattern:

- ✅ **Keyboard Accessible**: Shows on focus, hides on blur/Escape
- ✅ **Mouse Accessible**: Shows on hover
- ✅ **Screen Readers**: Uses `aria-describedby` to link content
- ✅ **Focus Management**: Doesn't trap focus (informational only)
- ✅ **Dismissible**: Escape key closes tooltip

### Best Practices

1. **Keep content brief** - Tooltips are for short hints
2. **Don't repeat visible text** - Add new information
3. **Avoid interactive content** - Use Dialog for complex UI
4. **Don't rely solely on tooltips** - Ensure info is discoverable
5. **Use for supplementary info** - Not for critical information

### ARIA Attributes

The component automatically applies:

- `role="tooltip"`
- `aria-describedby` on trigger
- Proper focus management

## Common Patterns

### Keyboard Shortcut

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Save</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>
      Save <kbd className="ml-2">⌘S</kbd>
    </p>
  </TooltipContent>
</Tooltip>
```

### Info Icon

```tsx
import { Info } from "lucide-react";

<div className="flex items-center gap-2">
  <span>Name</span>
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="text-muted-foreground h-4 w-4 cursor-help" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Your display name shown to others</p>
    </TooltipContent>
  </Tooltip>
</div>;
```

### Truncated Text

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <p className="max-w-[200px] truncate">
      Very long text that gets truncated...
    </p>
  </TooltipTrigger>
  <TooltipContent>
    <p>Very long text that gets truncated and is shown fully in tooltip</p>
  </TooltipContent>
</Tooltip>
```

## Styling Tips

### Arrow

```tsx
<TooltipContent>
  <p>Content</p>
  <TooltipArrow />
</TooltipContent>
```

### Max Width

```tsx
<TooltipContent className="max-w-sm">
  <p>Long content that wraps to multiple lines...</p>
</TooltipContent>
```

### Custom Colors

```tsx
<TooltipContent className="border-purple-700 bg-purple-600 text-white">
  <p>Custom colored tooltip</p>
</TooltipContent>
```

## Dependencies

- `@radix-ui/react-tooltip`
- `clsx`
- `tailwind-merge`

## When Not to Use

- ❌ For critical information (use visible text instead)
- ❌ For interactive content (use Dialog or Popover)
- ❌ On mobile-only interfaces (no hover state)
- ❌ For long-form content (use Dialog or dedicated page)
