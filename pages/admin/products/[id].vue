<script setup lang="ts">
import type { ProductForm } from "~/components/admin/ProductForm.vue";
definePageMeta({ layout: "admin", middleware: "admin" });
const route = useRoute();
type P = ProductForm & { id: number; created_at: string; updated_at: string; orders: { id: number; order_no: string; customer_name: string; status: string; quantity: number; created_at: string }[] };
const { data: p, refresh, error } = await useFetch<P>(`/api/admin/products/${route.params.id}`);
if (error.value) throw createError({ statusCode: 404, statusMessage: "Product not found" });
useSeoMeta({ title: () => p.value?.name || "Product" });
const saving = ref(false); const msg = ref(route.query.created ? "Product created." : ""); const err = ref("");
const formKey = ref(0);
async function save(body: ProductForm) {
  saving.value = true; err.value = ""; msg.value = "";
  try { await $fetch(`/api/admin/products/${route.params.id}`, { method: "PUT", body }); await refresh(); formKey.value++; msg.value = "Saved."; }
  catch (e: unknown) { err.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || "Could not save"; }
  finally { saving.value = false; }
}
async function remove() {
  if (!confirm("Delete this product?")) return;
  await $fetch(`/api/admin/products/${route.params.id}`, { method: "DELETE" });
  await navigateTo("/admin/products");
}
</script>
<template>
  <div v-if="p" class="space-y-6">
    <NuxtLink to="/admin/products" class="t-label-sm">← Products</NuxtLink>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div><h1 class="t-h2 !text-4xl">{{ p.name }}</h1><p class="mt-2 text-xs text-ink/60">Updated {{ new Date(p.updated_at).toLocaleString() }} · <StatusBadge :status="p.status" /></p></div>
      <div class="flex gap-2">
        <NuxtLink v-if="p.status === 'published'" :to="`/collection/${p.slug}`" target="_blank" class="btn-ghost">View on site ↗</NuxtLink>
        <button class="btn-ghost !border-red-600 text-red-600" @click="remove">Delete</button>
      </div>
    </div>
    <p v-if="msg" class="bg-accent p-3 text-sm">{{ msg }}</p>
    <ProductForm :key="formKey" :initial="p" :saving="saving" submit-label="Save changes" @submit="save">
      <p v-if="err" class="text-sm text-red-600">{{ err }}</p>
    </ProductForm>
    <div class="bg-paper p-5">
      <p class="t-label-sm mb-4 text-ink/60">Orders containing this product</p>
      <table class="w-full text-left text-sm">
        <tbody>
          <tr v-for="o in p.orders" :key="o.id" class="cursor-pointer border-t border-ink/10 hover:bg-grey" @click="navigateTo(`/admin/orders/${o.id}`)">
            <td class="py-2 font-mono">{{ o.order_no }}</td><td>{{ o.customer_name }}</td><td>× {{ o.quantity }}</td><td><StatusBadge :status="o.status" /></td><td class="text-right">{{ new Date(o.created_at).toLocaleDateString() }}</td>
          </tr>
          <tr v-if="!p.orders.length"><td class="py-2 text-ink/60">No orders yet.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
