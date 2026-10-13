<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "admin" });
const route = useRoute();
const STATUSES = ["pending", "confirmed", "sampling", "in_production", "quality_check", "shipped", "delivered", "cancelled"];
type O = { id: number; order_no: string; customer_name: string; customer_email: string; company: string; phone: string; address: string; country: string; notes: string;
  status: string; carrier: string; tracking_number: string; total: string; created_at: string;
  items: { id: number; product_id: number | null; product_name: string; unit_price: string; quantity: number; size: string; color: string }[];
  events: { id: number; status: string; note: string; created_at: string }[] };
const { data: o, error } = await useFetch<O>(`/api/admin/orders/${route.params.id}`);
if (error.value) throw createError({ statusCode: 404, statusMessage: "Order not found" });
useSeoMeta({ title: () => `Order ${o.value?.order_no}` });
const edit = reactive({ status: o.value!.status, carrier: o.value!.carrier, tracking_number: o.value!.tracking_number, note: "" });
const saving = ref(false); const msg = ref("");
async function save() {
  saving.value = true; msg.value = "";
  o.value = await $fetch<O>(`/api/admin/orders/${route.params.id}`, { method: "PATCH", body: edit });
  edit.note = ""; msg.value = "Order updated."; saving.value = false;
}
async function remove() {
  if (!confirm("Delete this order permanently?")) return;
  await $fetch(`/api/admin/orders/${route.params.id}`, { method: "DELETE" });
  await navigateTo("/admin/orders");
}
const idx = computed(() => STATUSES.indexOf(o.value?.status || ""));
const label = (s: string) => s.replace(/_/g, " ");
</script>
<template>
  <div v-if="o" class="space-y-6">
    <NuxtLink to="/admin/orders" class="t-label-sm">← Orders</NuxtLink>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div><h1 class="t-h2 !text-4xl font-mono">{{ o.order_no }}</h1><p class="mt-2 text-xs text-ink/60">Placed {{ new Date(o.created_at).toLocaleString() }}</p></div>
      <div class="flex gap-2"><NuxtLink :to="`/track-order?no=${o.order_no}`" target="_blank" class="btn-ghost">Customer view ↗</NuxtLink><button class="btn-ghost !border-red-600 text-red-600" @click="remove">Delete</button></div>
    </div>

    <ol v-if="o.status !== 'cancelled'" class="grid grid-cols-7 gap-1 bg-paper p-4">
      <li v-for="(s, i) in STATUSES.slice(0, 7)" :key="s" class="space-y-2"><div class="h-2" :class="i <= idx ? 'bg-ink' : 'bg-ink/15'" /><p class="t-label-sm text-[10px]">{{ label(s) }}</p></li>
    </ol>
    <p v-else class="bg-red-100 p-3 text-sm">This order was cancelled.</p>

    <div class="grid gap-4 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-2">
        <div class="bg-paper p-5">
          <p class="t-label-sm mb-3 text-ink/60">Items</p>
          <table class="w-full text-sm">
            <thead class="t-label-sm text-left text-ink/50"><tr><th class="py-1">Product</th><th>Variant</th><th class="text-right">Unit</th><th class="text-right">Qty</th><th class="text-right">Line total</th></tr></thead>
            <tbody>
              <tr v-for="it in o.items" :key="it.id" class="border-t border-ink/10">
                <td class="py-2"><NuxtLink v-if="it.product_id" :to="`/admin/products/${it.product_id}`" class="underline">{{ it.product_name }}</NuxtLink><span v-else>{{ it.product_name }}</span></td>
                <td>{{ it.size }} {{ it.color }}</td><td class="text-right font-mono">${{ Number(it.unit_price).toFixed(2) }}</td>
                <td class="text-right">{{ it.quantity }}</td><td class="text-right font-mono">${{ (Number(it.unit_price) * it.quantity).toLocaleString() }}</td>
              </tr>
            </tbody>
            <tfoot><tr class="border-t-2 border-ink"><td colspan="4" class="py-2 font-medium">Total</td><td class="text-right font-mono font-semibold">${{ Number(o.total).toLocaleString() }}</td></tr></tfoot>
          </table>
        </div>
        <div class="bg-paper p-5">
          <p class="t-label-sm mb-3 text-ink/60">Timeline</p>
          <ul class="space-y-3">
            <li v-for="e in [...o.events].reverse()" :key="e.id" class="flex flex-wrap gap-3 border-t border-ink/10 pt-3 text-sm">
              <span class="w-44 font-mono text-xs">{{ new Date(e.created_at).toLocaleString() }}</span><StatusBadge :status="e.status" /><span class="text-ink/70">{{ e.note }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="space-y-4">
        <form class="space-y-3 bg-paper p-5" @submit.prevent="save">
          <p class="t-label-sm text-ink/60">Update order</p>
          <label class="block space-y-1"><span class="text-xs font-medium">Status</span><select v-model="edit.status" class="field"><option v-for="s in STATUSES" :key="s" :value="s">{{ label(s) }}</option></select></label>
          <label class="block space-y-1"><span class="text-xs font-medium">Carrier</span><input v-model="edit.carrier" placeholder="DHL, FedEx…" class="field" /></label>
          <label class="block space-y-1"><span class="text-xs font-medium">Tracking number</span><input v-model="edit.tracking_number" class="field font-mono" /></label>
          <label class="block space-y-1"><span class="text-xs font-medium">Timeline note (visible to customer)</span><textarea v-model="edit.note" rows="2" class="field" /></label>
          <button :disabled="saving" class="btn w-full justify-center">{{ saving ? "Saving…" : "Save" }}</button>
          <p v-if="msg" class="bg-accent p-2 text-sm">{{ msg }}</p>
        </form>
        <div class="space-y-1 bg-paper p-5 text-sm">
          <p class="t-label-sm mb-2 text-ink/60">Customer</p>
          <p class="font-medium">{{ o.customer_name }}</p><p>{{ o.company }}</p>
          <a :href="`mailto:${o.customer_email}`" class="block underline">{{ o.customer_email }}</a><p>{{ o.phone }}</p>
          <p class="pt-2">{{ o.address }}<br />{{ o.country }}</p>
          <p v-if="o.notes" class="mt-3 bg-grey p-2 text-xs">“{{ o.notes }}”</p>
        </div>
      </div>
    </div>
  </div>
</template>
