<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "admin" });
useSeoMeta({ title: "Dashboard" });
type Stats = { counts: Record<string, number>; byStatus: { status: string; n: number }[]; monthly: { month: string; total: number }[];
  recent: { id: number; order_no: string; customer_name: string; company: string; status: string; total: string; created_at: string }[] };
const { data } = await useFetch<Stats>("/api/admin/stats");
const money = (n: number | string) => "$" + Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
const maxMonth = computed(() => Math.max(1, ...(data.value?.monthly.map((m) => m.total) || [1])));
const cards = computed(() => data.value ? [
  { label: "Revenue (non-cancelled)", value: money(data.value.counts.revenue), to: "/admin/orders" },
  { label: "Open orders", value: data.value.counts.open_orders, to: "/admin/orders" },
  { label: "Products published", value: `${data.value.counts.published} / ${data.value.counts.products}`, to: "/admin/products" },
  { label: "New inquiries", value: data.value.counts.new_inquiries, to: "/admin/inquiries" },
] : []);
</script>
<template>
  <div v-if="data" class="space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h1 class="t-h2 !text-4xl">Dashboard</h1>
      <div class="flex gap-2"><NuxtLink to="/admin/products/new" class="btn">+ New product</NuxtLink><NuxtLink to="/admin/orders" class="btn-ghost">All orders</NuxtLink></div>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <NuxtLink v-for="c in cards" :key="c.label" :to="c.to" class="space-y-3 bg-paper p-5 transition-colors hover:bg-accent">
        <p class="t-label-sm text-ink/60">{{ c.label }}</p><p class="t-stat !text-4xl">{{ c.value }}</p>
      </NuxtLink>
    </div>
    <div class="grid gap-4 xl:grid-cols-3">
      <div class="bg-paper p-5 xl:col-span-2">
        <p class="t-label-sm mb-6 text-ink/60">Order value — last 6 months</p>
        <div class="flex h-48 items-end gap-3">
          <div v-for="m in data.monthly" :key="m.month" class="flex flex-1 flex-col items-center gap-2">
            <span class="font-mono text-[11px]">{{ money(m.total) }}</span>
            <div class="w-full bg-ink" :style="{ height: (m.total / maxMonth) * 140 + 'px' }" />
            <span class="t-label-sm">{{ m.month }}</span>
          </div>
          <p v-if="!data.monthly.length" class="text-sm text-ink/60">No orders yet.</p>
        </div>
      </div>
      <div class="bg-paper p-5">
        <p class="t-label-sm mb-4 text-ink/60">Orders by status</p>
        <ul class="space-y-2">
          <li v-for="s in data.byStatus" :key="s.status" class="flex items-center justify-between">
            <NuxtLink :to="`/admin/orders?status=${s.status}`"><StatusBadge :status="s.status" /></NuxtLink><span class="font-mono">{{ s.n }}</span>
          </li>
        </ul>
        <p v-if="data.counts.low_stock" class="mt-6 bg-yellow-100 p-3 text-sm">{{ data.counts.low_stock }} product(s) have low capacity (&lt; 200).</p>
      </div>
    </div>
    <div class="bg-paper p-5">
      <p class="t-label-sm mb-4 text-ink/60">Recent orders</p>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="t-label-sm text-ink/60"><tr><th class="py-2">Order</th><th>Customer</th><th>Status</th><th class="text-right">Total</th><th class="text-right">Date</th></tr></thead>
          <tbody>
            <tr v-for="o in data.recent" :key="o.id" class="cursor-pointer border-t border-ink/10 hover:bg-grey" @click="navigateTo(`/admin/orders/${o.id}`)">
              <td class="py-2 font-mono">{{ o.order_no }}</td><td>{{ o.customer_name }} <span class="text-ink/50">{{ o.company }}</span></td>
              <td><StatusBadge :status="o.status" /></td><td class="text-right font-mono">{{ money(o.total) }}</td><td class="text-right">{{ new Date(o.created_at).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
