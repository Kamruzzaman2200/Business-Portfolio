<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "admin" });
useSeoMeta({ title: "Orders" });
const route = useRoute();
type O = { id: number; order_no: string; customer_name: string; customer_email: string; company: string; status: string; total: string; units: number; tracking_number: string; created_at: string };
const STATUSES = ["pending", "confirmed", "sampling", "in_production", "quality_check", "shipped", "delivered", "cancelled"];
const status = ref((route.query.status as string) || "");
const search = ref(""); const debounced = ref("");
let t: ReturnType<typeof setTimeout> | undefined;
watch(search, (v) => { clearTimeout(t); t = setTimeout(() => (debounced.value = v), 300); });
const { data } = await useFetch<O[]>("/api/admin/orders", { query: { search: debounced, status } });
</script>
<template>
  <div class="space-y-6">
    <h1 class="t-h2 !text-4xl">Orders</h1>
    <div class="flex flex-wrap gap-1">
      <button v-for="s in ['', ...STATUSES]" :key="s" class="t-label-sm border border-ink px-2 py-1" :class="status === s ? 'bg-ink text-accent' : 'bg-paper hover:bg-accent'" @click="status = s">{{ s ? s.replace(/_/g, " ") : "All" }}</button>
    </div>
    <input v-model="search" placeholder="Search order no., customer, email, company…" class="field max-w-md" />
    <div class="overflow-x-auto bg-paper">
      <table class="w-full text-left text-sm">
        <thead class="t-label-sm text-ink/60"><tr><th class="p-3">Order</th><th>Customer</th><th>Status</th><th class="text-right">Units</th><th class="text-right">Total</th><th>Tracking</th><th class="p-3 text-right">Placed</th></tr></thead>
        <tbody>
          <tr v-for="o in data" :key="o.id" class="cursor-pointer border-t border-ink/10 hover:bg-grey/60" @click="navigateTo(`/admin/orders/${o.id}`)">
            <td class="p-3 font-mono">{{ o.order_no }}</td>
            <td>{{ o.customer_name }}<br /><span class="text-xs text-ink/50">{{ o.company || o.customer_email }}</span></td>
            <td><StatusBadge :status="o.status" /></td><td class="text-right">{{ o.units }}</td>
            <td class="text-right font-mono">${{ Number(o.total).toLocaleString() }}</td>
            <td class="font-mono text-xs">{{ o.tracking_number || "—" }}</td>
            <td class="p-3 text-right">{{ new Date(o.created_at).toLocaleDateString() }}</td>
          </tr>
          <tr v-if="!data?.length"><td colspan="7" class="p-6 text-center text-ink/60">No orders found.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
