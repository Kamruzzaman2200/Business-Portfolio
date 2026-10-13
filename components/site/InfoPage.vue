<script setup lang="ts">
/** Template for Talent & Partner pages */
defineProps<{
  title: string; hero: string; eyebrow: string; stats: { value: string; label: string }[]; body: string; bullets: string[];
  listTitle?: string; list?: { title: string; meta: string }[]; quote?: { text: string; by: string }; gallery: string[];
}>();
</script>
<template>
  <main class="bg-grey pt-24">
    <div class="px-3">
      <RevealTitle as="h1" immediate class="t-h1 max-w-[14ch]">{{ title }}</RevealTitle>
      <ClipReveal immediate :delay="0.4" class="mt-8 aspect-[16/9]"><Media :src="hero" eager /></ClipReveal>
    </div>
    <section class="grid-6 py-32">
      <Eyebrow :index="1" class="col-span-6 mb-10">{{ eyebrow }}</Eyebrow>
      <Stats :items="stats" class="col-span-6" />
      <div class="col-span-6 mt-16 space-y-4 md:col-span-3 md:col-start-4">
        <p class="text-lg leading-[23.4px]">{{ body }}</p>
        <ul v-if="bullets.length" class="list-disc space-y-2 pl-5 text-[15px]"><li v-for="b in bullets" :key="b">{{ b }}</li></ul>
      </div>
      <QuoteBlock v-if="quote" v-bind="quote" class="col-span-6 mt-24" />
    </section>
    <section v-if="list" class="px-3 pb-32">
      <SectionRule :label="listTitle || 'List'" :index="2" />
      <ol>
        <li v-for="(r, i) in list" :key="r.title" class="group grid grid-cols-6 gap-gap border-t border-ink/20 py-6 transition-colors hover:bg-accent">
          <span class="t-h3">{{ i + 1 }}</span>
          <span class="t-h3 col-span-5 md:col-span-3">{{ r.title }}</span>
          <span class="t-label-sm col-span-5 col-start-2 md:col-span-1">{{ r.meta }}</span>
          <NuxtLink to="/contact?intent=Learn%20about%20a%20role" class="t-label-sm col-span-5 col-start-2 md:col-span-1 md:text-right">Apply →</NuxtLink>
        </li>
      </ol>
    </section>
    <div class="pb-6"><Carousel :images="gallery" /></div>
  </main>
</template>
