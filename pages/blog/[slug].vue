<script setup lang="ts">
import { blogPosts } from "~/content/site";
definePageMeta({ validate: (r) => blogPosts.some((p) => p.slug === r.params.slug) });
const route = useRoute();
const post = computed(() => blogPosts.find((p) => p.slug === route.params.slug)!);
const others = computed(() => blogPosts.filter((p) => p.slug !== post.value.slug).slice(0, 3));
useSeoMeta({ title: () => post.value.title, description: () => post.value.excerpt });
</script>
<template>
  <main class="bg-grey pt-24">
    <article class="grid-6 pb-24">
      <div class="col-span-6 flex gap-4"><span class="t-label-sm bg-accent px-1.5 py-0.5">{{ post.tag }}</span><span class="t-label-sm">{{ post.date }}</span></div>
      <RevealTitle as="h1" immediate class="t-h1 col-span-6 mt-6 max-w-[18ch]">{{ post.title }}</RevealTitle>
      <ClipReveal immediate :delay="0.4" class="col-span-6 mt-10 aspect-[16/9]"><Media :src="post.image" eager /></ClipReveal>
      <div class="col-span-6 mt-16 space-y-6 text-lg leading-8 md:col-span-3 md:col-start-3">
        <p class="text-xl">{{ post.excerpt }}</p>
        <p v-for="(b, i) in post.body" :key="i">{{ b }}</p>
      </div>
    </article>
    <section class="grid-6 pb-24">
      <div class="col-span-6"><SectionRule label="Keep reading" :index="1" /></div>
      <NuxtLink v-for="p in others" :key="p.slug" :to="`/blog/${p.slug}`" class="group col-span-6 space-y-3 md:col-span-2">
        <div class="aspect-[4/3] overflow-hidden"><Media :src="p.image" class="transition-transform duration-700 group-hover:scale-105" /></div>
        <p class="t-h3">{{ p.title }}</p>
      </NuxtLink>
    </section>
  </main>
</template>
