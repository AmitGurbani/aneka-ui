<script setup lang="ts">
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from 'radix-vue';
import { X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

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
        class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        :class="cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-background p-8 shadow-[0_12px_24px_rgba(0,0,0,0.14)] duration-250 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl',
          props.class
        )"
      >
        <slot />
        <DialogClose
          class="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X class="h-5 w-5" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
