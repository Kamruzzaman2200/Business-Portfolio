<script setup lang="ts">
import { brand } from "~/content/site";
</script>
<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 flex justify-between">
    <span class="-ml-[0.06em] font-display text-[clamp(110px,18vw,260px)] leading-[0.8] font-black text-accent [font-stretch:125%]">{{ brand.edgeLetters[0] }}</span>
    <span class="-mr-[0.06em] font-display text-[clamp(110px,18vw,260px)] leading-[0.8] font-black text-accent [font-stretch:125%]">{{ brand.edgeLetters[1] }}</span>
  </div>
</template>
