<script setup lang="ts">
useSeoMeta({ title: "Collection" });
type P = { id: number; slug: string; name: string; category: string; price: string; moq: number; lead_time_days: number; images: string[]; featured: boolean };
const category = ref("All");
const { data: cats } = await useFetch<string[]>("/api/products/categories");
const { data: products, pending } = await useFetch<P[]>("/api/products", { query: { category } });
</script>
<template>
  <main class="bg-grey pt-24 pb-24">
    <div class="px-3">
      <RevealTitle as="h1" immediate class="t-h1 max-w-[14ch]">The collection</RevealTitle>
      <p class="mt-6 max-w-xl text-lg">Ready-to-produce styles, updated every season. Pick a style, choose your quantities and place an order request.</p>
    </div>
    <div class="flex flex-wrap gap-1 px-3 pt-12 pb-6">
      <button v-for="c in ['All', ...(cats || [])]" :key="c" class="t-label-sm border border-ink px-3 py-1.5"
        :class="category === c ? 'bg-ink text-accent' : 'bg-accent hover:bg-ink hover:text-paper'" @click="category = c">{{ c }}</button>
    </div>
    <div class="grid-6 gap-y-10" :class="pending ? 'opacity-50' : ''">
      <NuxtLink v-for="p in products" :key="p.id" :to="`/collection/${p.slug}`" class="group col-span-6 sm:col-span-3 lg:col-span-2">
        <div class="relative aspect-[4/5] overflow-hidden">
          <Media :src="p.images[0]" :alt="p.name" class="transition-transform duration-700 ease-brand group-hover:scale-105" />
          <span v-if="p.featured" class="t-label-sm absolute top-2 left-2 bg-accent px-1.5 py-0.5">Featured</span>
        </div>
        <div class="mt-3 flex items-start justify-between gap-4">
          <div><p class="t-h3">{{ p.name }}</p><p class="t-label-sm mt-1 text-ink/60">{{ p.category }} · MOQ {{ p.moq }} · {{ p.lead_time_days }} days</p></div>
          <p class="font-mono text-sm">${{ Number(p.price).toFixed(2) }}</p>
        </div>
      </NuxtLink>
      <p v-if="!pending && !products?.length" class="col-span-6 t-label">No products yet — add some in the admin dashboard.</p>
    </div>
  </main>
</template>
