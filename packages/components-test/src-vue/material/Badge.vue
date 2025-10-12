<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { computed } from "vue";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-destructive/80",
        outline: "border border-primary text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

interface Props {
  variant?: BadgeVariants["variant"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  class: undefined,
});

const classes = computed(() =>
  cn(badgeVariants({ variant: props.variant }), props.class)
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
