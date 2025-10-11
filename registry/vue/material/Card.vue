<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn(
        'border-border bg-card text-card-foreground rounded-lg border shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
