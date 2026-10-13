<script setup lang="ts">
defineProps<{ title: string; sections: { h: string; p: string }[] }>();
</script>
<template>
  <main class="bg-grey pt-24 pb-32">
    <RevealTitle as="h1" immediate class="t-h1 px-3 pb-16">{{ title }}</RevealTitle>
    <section v-for="(s, i) in sections" :key="s.h" class="grid-6 border-t border-ink/20 py-10">
      <h2 class="t-h3 col-span-6 md:col-span-2">{{ s.h }}</h2>
      <span class="t-label-sm col-span-6 md:col-span-1">[{{ String(i + 1).padStart(2, "0") }}]</span>
      <p class="col-span-6 leading-6 md:col-span-3">{{ s.p }}</p>
    </section>
  </main>
</template>
