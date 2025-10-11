# Dialog

A modal dialog that interrupts the user with important content.

## Usage

::: code-group

```tsx [React]
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description that provides context.
          </DialogDescription>
        </DialogHeader>
        <div>Dialog content goes here</div>
      </DialogContent>
    </Dialog>
  );
}
```

```vue [Vue]
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog.vue";
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription> This is a dialog description. </DialogDescription>
      </DialogHeader>
      <div>Dialog content goes here</div>
    </DialogContent>
  </Dialog>
</template>
```

```ts [Angular]
import { DialogComponent } from '@/components/ui/dialog.component';

@Component({
  imports: [DialogComponent],
  template: `
    <aneka-dialog>
      <h2>Dialog Title</h2>
      <p>Dialog content</p>
    </aneka-dialog>
  `
})
```

:::

## Installation

```bash
aneka-ui add dialog
```

## Components

The Dialog component is composed of several sub-components:

- **Dialog** - Root component that manages open state
- **DialogTrigger** - Button or element that opens the dialog
- **DialogContent** - The actual dialog container
- **DialogHeader** - Header section with title and description
- **DialogTitle** - Main dialog heading
- **DialogDescription** - Supporting text
- **DialogFooter** - Footer with actions
- **DialogClose** - Element that closes the dialog

## Examples

### Basic Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Dialog with Actions

```tsx
import { DialogFooter } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete your account? This action cannot be
        undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Form Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <form className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" className="w-full" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" className="w-full" />
      </div>
    </form>
    <DialogFooter>
      <Button type="submit">Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Controlled Dialog

```tsx
function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <Button onClick={() => setOpen(false)}>Close Programmatically</Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Confirmation Dialog

```tsx
function ConfirmDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            This will permanently delete the item. Continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Design System Differences

### Material Design

- **Border Radius**: 8px (`rounded-lg`)
- **Shadow**: Elevation shadow (0 8px 12px)
- **Animation**: 200ms scale and fade
- **Padding**: 1.5rem
- **Motion**: Standard cubic-bezier easing

### Apple HIG

- **Border Radius**: 12px (`rounded-xl`)
- **Shadow**: Subtle soft shadow
- **Animation**: 150ms scale and fade
- **Padding**: 1.5rem
- **Motion**: Spring-like easing
- **Feel**: Minimal and clean

### Samsung One UI

- **Border Radius**: 16px (`rounded-2xl`)
- **Shadow**: Prominent shadow (0 12px 24px)
- **Animation**: 250ms scale and fade
- **Padding**: 2rem (more generous)
- **Border**: 2px
- **Feel**: Bold and confident

## API Reference

### Dialog

Root component.

| Prop           | Type                      | Default | Description                       |
| -------------- | ------------------------- | ------- | --------------------------------- |
| `open`         | `boolean`                 | -       | Controlled open state             |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes  |
| `defaultOpen`  | `boolean`                 | `false` | Default open state (uncontrolled) |
| `modal`        | `boolean`                 | `true`  | Whether dialog is modal           |

### DialogTrigger

Element that opens the dialog.

| Prop      | Type      | Description             |
| --------- | --------- | ----------------------- |
| `asChild` | `boolean` | Render as child element |

### DialogContent

The dialog panel.

| Prop                   | Type                             | Description            |
| ---------------------- | -------------------------------- | ---------------------- |
| `className`            | `string`                         | Additional CSS classes |
| `onEscapeKeyDown`      | `(event: KeyboardEvent) => void` | Escape key handler     |
| `onPointerDownOutside` | `(event: PointerEvent) => void`  | Click outside handler  |

### DialogHeader

Header container.

| Prop        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `className` | `string` | Additional CSS classes |

### DialogTitle

Dialog heading (required for accessibility).

| Prop        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `className` | `string` | Additional CSS classes |

### DialogDescription

Supporting text (recommended for accessibility).

| Prop        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `className` | `string` | Additional CSS classes |

### DialogFooter

Footer container.

| Prop        | Type     | Description            |
| ----------- | -------- | ---------------------- |
| `className` | `string` | Additional CSS classes |

## Accessibility

The Dialog component follows WAI-ARIA Dialog pattern:

- ✅ **Focus Management**: Focus trapped inside dialog
- ✅ **Escape Key**: Closes dialog
- ✅ **Overlay Click**: Closes dialog (can be disabled)
- ✅ **Screen Readers**: Proper ARIA labels
- ✅ **Title Required**: DialogTitle is required
- ✅ **Description**: DialogDescription recommended
- ✅ **Focus Return**: Focus returns to trigger on close
- ✅ **Scroll Lock**: Body scroll disabled when open

### ARIA Attributes

The component automatically applies:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` (references DialogTitle)
- `aria-describedby` (references DialogDescription)

## Styling Tips

### Custom Width

```tsx
<DialogContent className="max-w-2xl">{/* Wide dialog */}</DialogContent>
```

### Scrollable Content

```tsx
<DialogContent className="max-h-[90vh] overflow-y-auto">
  {/* Long content */}
</DialogContent>
```

### Without Close Button

```tsx
<DialogContent className="[&>button]:hidden">{/* No X button */}</DialogContent>
```

## Best Practices

1. **Always include DialogTitle** - Required for accessibility
2. **Use DialogDescription** - Provides context for screen readers
3. **Keep dialogs focused** - One primary action per dialog
4. **Avoid nested dialogs** - Use a single layer of modals
5. **Provide clear actions** - Obvious primary and secondary buttons
6. **Handle loading states** - Show spinners during async operations

## Dependencies

- `@radix-ui/react-dialog`
- `lucide-react` (for close icon)
- `clsx`
- `tailwind-merge`
