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
        'border-border bg-card text-card-foreground rounded-xl border shadow-[0_2px_6px_rgba(0,0,0,0.1)]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
