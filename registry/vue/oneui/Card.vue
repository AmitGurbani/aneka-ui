<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="cn(
      'rounded-2xl border-2 border-border bg-card text-card-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
      props.class
    )"
  >
    <slot />
  </div>
</template>
