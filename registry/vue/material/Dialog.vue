<script setup lang="ts">
import { X } from "lucide-vue-next";
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
} from "radix-vue";

import { cn } from "@/lib/utils";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <DialogRoot>
    <slot name="trigger">
      <DialogTrigger />
    </slot>
    <DialogPortal>
      <DialogOverlay
        class="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm"
      />
      <DialogContent
        :class="
          cn(
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[560px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-[0_3px_3px_-2px_rgba(0,0,0,0.2),0_3px_4px_0_rgba(0,0,0,0.14),0_1px_8px_0_rgba(0,0,0,0.12)] duration-200',
            props.class
          )
        "
      >
        <slot />
        <DialogClose
          class="ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
