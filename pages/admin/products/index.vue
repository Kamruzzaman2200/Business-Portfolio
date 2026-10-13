<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "admin" });
useSeoMeta({ title: "Products" });
type P = { id: number; name: string; slug: string; category: string; price: string; moq: number; stock: number; status: string; featured: boolean; images: string[]; units_ordered: number; updated_at: string };
const search = ref(""); const status = ref("");
const debounced = ref("");
let t: ReturnType<typeof setTimeout> | undefined;
watch(search, (v) => { clearTimeout(t); t = setTimeout(() => (debounced.value = v), 300); });
const { data, refresh } = await useFetch<P[]>("/api/admin/products", { query: { search: debounced, status } });
async function remove(p: P) {
  if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
  await $fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
  refresh();
}
async function toggle(p: P) {
  const full = await $fetch<Record<string, unknown>>(`/api/admin/products/${p.id}`);
  await $fetch(`/api/admin/products/${p.id}`, { method: "PUT", body: { ...full, status: p.status === "published" ? "draft" : "published" } });
  refresh();
}
</script>
<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h1 class="t-h2 !text-4xl">Products</h1>
      <NuxtLink to="/admin/products/new" class="btn">+ New product</NuxtLink>
    </div>
    <div class="flex flex-wrap gap-2">
      <input v-model="search" placeholder="Search name or slug…" class="field max-w-xs" />
      <select v-model="status" class="field max-w-[180px]"><option value="">All statuses</option><option>published</option><option>draft</option><option>archived</option></select>
    </div>
    <div class="overflow-x-auto bg-paper">
      <table class="w-full text-left text-sm">
        <thead class="t-label-sm text-ink/60"><tr><th class="p-3">Product</th><th>Category</th><th>Status</th><th class="text-right">Price</th><th class="text-right">MOQ</th><th class="text-right">Capacity</th><th class="text-right">Units ordered</th><th class="p-3 text-right">Actions</th></tr></thead>
        <tbody>
          <tr v-for="p in data" :key="p.id" class="border-t border-ink/10 hover:bg-grey/60">
            <td class="p-3"><NuxtLink :to="`/admin/products/${p.id}`" class="flex items-center gap-3">
              <div class="h-12 w-10 shrink-0"><Media :src="p.images[0]" /></div>
              <div><p class="font-medium">{{ p.name }} <span v-if="p.featured" class="text-xs">★</span></p><p class="font-mono text-xs text-ink/50">/{{ p.slug }}</p></div></NuxtLink></td>
            <td>{{ p.category }}</td><td><StatusBadge :status="p.status" /></td>
            <td class="text-right font-mono">${{ Number(p.price).toFixed(2) }}</td><td class="text-right">{{ p.moq }}</td>
            <td class="text-right" :class="p.stock < 200 ? 'text-red-600' : ''">{{ p.stock }}</td><td class="text-right">{{ p.units_ordered }}</td>
            <td class="space-x-3 p-3 text-right whitespace-nowrap text-xs">
              <NuxtLink :to="`/admin/products/${p.id}`" class="underline">Edit</NuxtLink>
              <button class="underline" @click="toggle(p)">{{ p.status === "published" ? "Unpublish" : "Publish" }}</button>
              <NuxtLink v-if="p.status === 'published'" :to="`/collection/${p.slug}`" target="_blank" class="underline">View</NuxtLink>
              <button class="text-red-600 underline" @click="remove(p)">Delete</button>
            </td>
          </tr>
          <tr v-if="!data?.length"><td colspan="8" class="p-6 text-center text-ink/60">No products found.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
