<script setup lang="ts">
import { blogPosts, pic } from "~/content/site";
useSeoMeta({ title: "Blog" });
const list = blogPosts.slice(0, 4);
const featured = blogPosts[4];
const more = blogPosts.slice(5);
</script>
<template>
  <main class="bg-grey pt-24">
    <div class="px-3">
      <RevealTitle as="h1" immediate class="t-h1 max-w-[14ch]">Stories from the studio</RevealTitle>
      <ClipReveal immediate :delay="0.4" class="mt-8 aspect-[16/9]"><Media :src="pic('blog-hero', 1800, 1000)" eager /></ClipReveal>
    </div>
    <section class="grid-6 py-32">
      <div class="col-span-6"><SectionRule label="Articles" :index="1" /></div>
      <div class="col-span-6 grid gap-gap md:col-span-4 md:grid-cols-2">
        <article v-for="p in list" :key="p.slug" class="flex flex-col gap-3 border-b border-ink/20 pb-6">
          <div class="flex items-center justify-between text-xs">
            <span class="t-label-sm bg-accent px-1.5 py-0.5">{{ p.tag }}</span><span class="text-ink/60">{{ p.date }}</span>
          </div>
          <NuxtLink :to="`/blog/${p.slug}`" class="t-h3 hover:underline">{{ p.title }}</NuxtLink>
          <p class="text-[15px] leading-[21px]">{{ p.excerpt }}</p>
          <SlashLink :to="`/blog/${p.slug}`">Read article</SlashLink>
        </article>
      </div>
      <NuxtLink :to="`/blog/${featured.slug}`" class="group relative col-span-6 mt-8 block min-h-[560px] overflow-hidden md:col-span-2 md:mt-0">
        <Media :src="featured.image" class="transition-transform duration-700 group-hover:scale-105" />
        <div class="absolute inset-x-0 bottom-0 space-y-3 bg-gradient-to-t from-ink/70 p-4 text-paper">
          <h2 class="t-h2 !text-4xl">{{ featured.title }}</h2>
          <p class="text-sm">{{ featured.excerpt }}</p>
          <span class="t-label-sm text-accent">▰ Read article</span>
        </div>
      </NuxtLink>
      <div class="col-span-6 mt-24"><SectionRule label="More articles" :index="2" /></div>
      <NuxtLink v-for="p in more" :key="p.slug" :to="`/blog/${p.slug}`" class="group col-span-6 md:col-span-2">
        <div class="aspect-[3/4] overflow-hidden"><Media :src="p.image" class="transition-transform duration-700 group-hover:scale-105" /></div>
        <p class="bg-ink p-3 font-mono text-xs text-paper">{{ p.excerpt }}</p>
      </NuxtLink>
    </section>
  </main>
</template>
