<script setup lang="ts">
import { cn } from "../lib/utils";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn(
        'border-border bg-card text-card-foreground rounded-lg border shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
