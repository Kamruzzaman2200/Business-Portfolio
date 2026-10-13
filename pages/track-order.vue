<script setup lang="ts">
useSeoMeta({ title: "Track order" });
const route = useRoute();
const STEPS = ["pending", "confirmed", "sampling", "in_production", "quality_check", "shipped", "delivered"];
const label = (s: string) => s.replace(/_/g, " ");
const form = reactive({ orderNo: (route.query.no as string) || "", email: "" });
type O = { order_no: string; status: string; carrier: string; tracking_number: string; total: string; created_at: string; customer_name: string; items: { product_name: string; quantity: number; size: string; color: string }[]; events: { status: string; note: string; created_at: string }[] };
const order = ref<O | null>(null); const err = ref(""); const loading = ref(false);
async function track() {
  loading.value = true; err.value = ""; order.value = null;
  try { order.value = await $fetch<O>("/api/track", { method: "POST", body: form }); }
  catch (e: unknown) { err.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || "Not found"; }
  finally { loading.value = false; }
}
const idx = computed(() => (order.value ? STEPS.indexOf(order.value.status) : -1));
</script>
<template>
  <main class="min-h-svh bg-grey pt-24 pb-24">
    <RevealTitle as="h1" immediate class="t-h1 px-3 pb-12">Track your order</RevealTitle>
    <form class="grid-6 items-end gap-y-4" @submit.prevent="track">
      <label class="col-span-6 space-y-2 md:col-span-2"><span class="t-label-sm">Order number</span><input v-model="form.orderNo" required placeholder="BR-123456" class="w-full border border-ink bg-transparent px-3 py-2 uppercase outline-none focus:bg-paper" /></label>
      <label class="col-span-6 space-y-2 md:col-span-2"><span class="t-label-sm">Email used for the order</span><input v-model="form.email" type="email" required class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper" /></label>
      <button class="t-label-sm col-span-6 bg-ink px-3 py-3 text-accent hover:bg-accent hover:text-ink md:col-span-1">{{ loading ? "Searching…" : "Track" }}</button>
    </form>
    <p v-if="err" class="px-3 pt-6 text-red-600">{{ err }}</p>

    <section v-if="order" class="grid-6 pt-16">
      <div class="col-span-6"><SectionRule :label="`Order ${order.order_no}`" :index="1" /></div>
      <div class="col-span-6 md:col-span-4">
        <p class="t-h2">{{ order.status === "cancelled" ? "Cancelled" : label(order.status) }}</p>
        <ol v-if="order.status !== 'cancelled'" class="mt-10 grid grid-cols-7 gap-1">
          <li v-for="(s, i) in STEPS" :key="s" class="space-y-2">
            <div class="h-2" :class="i <= idx ? 'bg-ink' : 'bg-ink/15'" />
            <p class="t-label-sm text-[10px] md:text-xs" :class="i <= idx ? '' : 'text-ink/40'">{{ label(s) }}</p>
          </li>
        </ol>
        <div v-if="order.tracking_number" class="mt-8 inline-block bg-accent p-3 font-mono text-sm">{{ order.carrier }} · {{ order.tracking_number }}</div>
        <h3 class="t-h3 mt-12 mb-4">Timeline</h3>
        <ul class="space-y-3">
          <li v-for="(e, i) in [...order.events].reverse()" :key="i" class="flex gap-4 border-t border-ink/15 pt-3 text-sm">
            <span class="w-40 shrink-0 font-mono text-xs">{{ new Date(e.created_at).toLocaleString() }}</span>
            <span class="t-label-sm">{{ label(e.status) }}</span><span class="text-ink/70">{{ e.note }}</span>
          </li>
        </ul>
      </div>
      <aside class="col-span-6 mt-10 bg-paper p-4 md:col-span-2 md:mt-0">
        <p class="t-label-sm mb-3">Items</p>
        <p v-for="(it, i) in order.items" :key="i" class="border-t border-ink/10 py-2 text-sm">{{ it.product_name }} × {{ it.quantity }} <span class="text-ink/60">{{ it.size }} {{ it.color }}</span></p>
        <p class="mt-4 font-mono">Total ${{ Number(order.total).toFixed(2) }}</p>
      </aside>
    </section>
  </main>
</template>
