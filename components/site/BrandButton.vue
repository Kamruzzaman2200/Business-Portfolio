<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string;
    variant?: "accent" | "ink" | "outline";
  }>(),
  { variant: "accent" }
);
</script>

<template>
  <NuxtLink
    :to="to"
    class="relative inline-flex items-center justify-center px-5 py-2.5 font-mono text-xs uppercase font-bold select-none transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:transition-transform before:duration-500 before:ease-out hover:tracking-wider hover:before:scale-x-[1.1] hover:before:-skew-x-[20deg] shadow-md"
    :class="{
      'text-ink bg-accent before:bg-accent': variant === 'accent',
      'text-accent bg-ink before:bg-ink hover:text-ink hover:bg-accent hover:before:bg-accent': variant === 'ink',
      'border border-ink text-ink bg-paper before:bg-transparent hover:text-paper hover:bg-ink hover:before:bg-ink': variant === 'outline',
    }"
  >
    <span class="relative z-10"><slot /></span>
  </NuxtLink>
</template>
