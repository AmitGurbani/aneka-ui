<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { computed } from "vue";

import { cn } from "../lib/utils";

/**
 * Apple HIG Button Variants
 * - Sentence case text with tight letter spacing
 * - 6px border radius
 * - Subtle shadows
 * - 150ms transitions with spring-like easing
 * - Scale down on press
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold tracking-tight rounded-md transition-all duration-150 ease-[cubic-bezier(0.36,0,0.66,-0.56)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-secondary/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-destructive/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-primary/10 active:bg-primary/15",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-8 px-4 py-2 text-xs",
        lg: "h-13 px-8 py-4 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: string;
  asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  class: undefined,
  asChild: false,
});

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
);
</script>

<template>
  <component :is="asChild ? 'slot' : 'button'" :class="classes">
    <slot />
  </component>
</template>
