<script setup lang="ts">
import { home } from "~/content/site";
defineProps<{ index: number }>();
</script>
<template>
  <section class="bg-grey py-32">
    <Eyebrow :index="index" class="mb-6 justify-center">{{ home.needs.eyebrow }}</Eyebrow>
    <RevealTitle class="t-h2 mx-auto mb-24 max-w-[16ch] text-center">{{ home.needs.title }}</RevealTitle>
    <div class="grid-6">
      <InfoCard v-for="c in home.needs.cards" :key="c.title" :link="c.link" class="col-span-6 min-h-[320px] md:col-span-2">
        <h3 class="t-h3">{{ c.title }}</h3><p>{{ c.body }}</p>
      </InfoCard>
    </div>
  </section>
</template>
