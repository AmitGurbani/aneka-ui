<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Material Design Button Variants
 * - Uppercase text with medium letter spacing
 * - 4px border radius
 * - Elevation shadows
 * - 200ms transitions with standard easing
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium uppercase tracking-wide rounded-[4px] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-primary/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-secondary/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-destructive/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props extends ButtonVariants {
  class?: string;
  asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
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
