<script setup lang="ts">
defineProps<{ link?: { label: string; href: string } }>();
</script>
<template>
  <div class="flex flex-col justify-between gap-10 bg-accent p-4 text-ink">
    <div class="space-y-4 text-base leading-6"><slot /></div>
    <SlashLink v-if="link" :to="link.href">{{ link.label }}</SlashLink>
  </div>
</template>
