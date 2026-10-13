<script setup lang="ts">
defineProps<{ index: number }>();
</script>
<template>
  <p class="t-label flex gap-3"><span>[{{ String(index).padStart(2, "0") }}]</span><span><slot /></span></p>
</template>
