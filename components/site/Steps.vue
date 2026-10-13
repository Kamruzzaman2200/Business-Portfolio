<script setup lang="ts">
defineProps<{ items: { title: string; body: string }[] }>();
</script>
<template>
  <ol>
    <li v-for="(s, i) in items" :key="s.title" class="grid grid-cols-6 gap-gap border-t border-current py-6">
      <span class="t-h3 col-span-1 !text-3xl">{{ i + 1 }}</span>
      <div class="col-span-5 space-y-3 md:col-span-3 md:col-start-4">
        <h3 class="t-h3">{{ s.title }}</h3>
        <p class="text-[15px] leading-[21px]">{{ s.body }}</p>
      </div>
    </li>
  </ol>
</template>
