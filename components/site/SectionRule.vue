<script setup lang="ts">
defineProps<{ label: string; index: number }>();
</script>
<template>
  <div class="t-label-sm mb-6 flex justify-between border-t border-ink pt-2">
    <span>{{ label }}</span><span>[{{ String(index).padStart(2, "0") }}]</span>
  </div>
</template>
