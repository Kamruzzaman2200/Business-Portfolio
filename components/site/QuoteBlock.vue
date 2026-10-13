<script setup lang="ts">
defineProps<{ text: string; by: string }>();
</script>
<template>
  <figure class="space-y-4">
    <RevealTitle as="blockquote" class="t-h2 !text-[clamp(28px,3vw,44px)]">{{ text }}</RevealTitle>
    <figcaption class="t-label-sm">{{ by }}</figcaption>
  </figure>
</template>
