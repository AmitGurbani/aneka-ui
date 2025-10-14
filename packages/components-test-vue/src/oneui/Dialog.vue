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

import { cn } from "../lib/utils";

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
            'bg-background duration-250 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border-2 p-8 shadow-[0_12px_24px_rgba(0,0,0,0.14)]',
            props.class
          )
        "
      >
        <slot />
        <DialogClose
          class="ring-offset-background focus:ring-ring absolute right-6 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X class="h-5 w-5" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
