<script setup lang="ts">
defineProps<{ to: string }>();
</script>
<template>
  <NuxtLink :to="to" class="t-label-sm group inline-flex items-center gap-2">
    <Slash class="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
    <span class="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-brand group-hover:bg-[length:100%_1px]"><slot /></span>
  </NuxtLink>
</template>
