<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "radix-vue";

import { cn } from "../lib/utils";

interface Props {
  class?: string;
  sideOffset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  sideOffset: 4,
});
</script>

<template>
  <TooltipProvider>
    <TooltipRoot>
      <slot name="trigger">
        <TooltipTrigger />
      </slot>
      <TooltipContent
        :side-offset="props.sideOffset"
        :class="
          cn(
            'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 overflow-hidden rounded-2xl px-4 py-2 text-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
            props.class
          )
        "
      >
        <slot />
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
</template>
