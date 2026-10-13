<script setup lang="ts">
import type { ProductForm } from "~/components/admin/ProductForm.vue";
definePageMeta({ layout: "admin", middleware: "admin" });
useSeoMeta({ title: "New product" });
const saving = ref(false); const err = ref("");
async function save(body: ProductForm) {
  saving.value = true; err.value = "";
  try {
    const p = await $fetch<{ id: number }>("/api/admin/products", { method: "POST", body });
    await navigateTo(`/admin/products/${p.id}?created=1`);
  } catch (e: unknown) { err.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || "Could not save"; }
  finally { saving.value = false; }
}
</script>
<template>
  <div class="space-y-6">
    <NuxtLink to="/admin/products" class="t-label-sm">← Products</NuxtLink>
    <h1 class="t-h2 !text-4xl">New product</h1>
    <ProductForm :saving="saving" submit-label="Create product" @submit="save"><p v-if="err" class="text-sm text-red-600">{{ err }}</p></ProductForm>
  </div>
</template>
