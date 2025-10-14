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
            'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 overflow-hidden rounded-[4px] px-3 py-1.5 text-xs font-normal tracking-normal shadow-[0_2px_2px_-1px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]',
            props.class
          )
        "
      >
        <slot />
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
</template>
