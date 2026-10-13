<script setup lang="ts">
type P = { id: number; slug: string; name: string; category: string; description: string; price: string; moq: number; lead_time_days: number; stock: number; images: string[]; sizes: string[]; colors: string[] };
const route = useRoute();
const { data: p, error } = await useFetch<P>(`/api/products/${route.params.slug}`);
if (error.value) throw createError({ statusCode: 404, statusMessage: "Product not found", fatal: true });
useSeoMeta({ title: () => p.value?.name || "Product" });

const active = ref(0);
const form = reactive({ quantity: p.value?.moq || 1, size: p.value?.sizes[0] || "", color: p.value?.colors[0] || "", name: "", email: "", company: "", phone: "", address: "", country: "", notes: "" });
const total = computed(() => (Number(p.value?.price || 0) * form.quantity).toFixed(2));
const result = ref<{ orderNo: string } | null>(null);
const err = ref(""); const sending = ref(false);
async function order() {
  if (!p.value) return;
  sending.value = true; err.value = "";
  try {
    const { quantity, size, color, ...customer } = form;
    result.value = await $fetch<{ orderNo: string; total: number }>("/api/orders" as string, { method: "POST", body: { ...customer, items: [{ productId: p.value.id, quantity, size, color }] } });
  } catch (e: unknown) {
    err.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || "Could not place order";
  } finally { sending.value = false; }
}
</script>
<template>
  <main v-if="p" class="bg-grey pt-24 pb-24">
    <div class="grid-6 gap-y-10">
      <div class="col-span-6 md:col-span-3">
        <ClipReveal immediate class="aspect-[4/5]"><Media :key="active" :src="p.images[active]" :alt="p.name" eager /></ClipReveal>
        <div class="mt-gap grid grid-cols-4 gap-gap">
          <button v-for="(im, i) in p.images" :key="im" class="aspect-square border-2" :class="i === active ? 'border-ink' : 'border-transparent'" @click="active = i"><Media :src="im" /></button>
        </div>
      </div>
      <div class="col-span-6 space-y-6 md:col-span-3 md:pl-6">
        <NuxtLink to="/collection" class="t-label-sm">← Back to collection</NuxtLink>
        <p class="t-label-sm">{{ p.category }}</p>
        <RevealTitle as="h1" immediate class="t-h2">{{ p.name }}</RevealTitle>
        <p class="font-mono text-2xl">${{ Number(p.price).toFixed(2) }} <span class="text-sm text-ink/60">/ unit</span></p>
        <p class="max-w-lg leading-7">{{ p.description }}</p>
        <dl class="grid grid-cols-3 gap-gap border-y border-ink/20 py-4 text-sm">
          <div><dt class="t-label-sm text-ink/60">MOQ</dt><dd class="t-h3">{{ p.moq }}</dd></div>
          <div><dt class="t-label-sm text-ink/60">Lead time</dt><dd class="t-h3">{{ p.lead_time_days }} days</dd></div>
          <div><dt class="t-label-sm text-ink/60">Capacity</dt><dd class="t-h3">{{ p.stock }}</dd></div>
        </dl>

        <InfoCard v-if="result" :link="{ label: 'Track this order', href: `/track-order?no=${result.orderNo}` }" class="min-h-[220px]">
          <p class="t-h3">Order request received</p>
          <p>Your order number is <strong class="font-mono">{{ result.orderNo }}</strong>. Keep it to track progress.</p>
        </InfoCard>

        <form v-else class="space-y-4 bg-paper p-4" @submit.prevent="order">
          <p class="t-h3">Place an order request</p>
          <div v-if="p.sizes.length" class="space-y-2"><span class="t-label-sm">Size</span>
            <div class="flex flex-wrap gap-1"><button v-for="s in p.sizes" :key="s" type="button" class="t-label-sm border border-ink px-3 py-1.5" :class="form.size === s ? 'bg-ink text-accent' : ''" @click="form.size = s">{{ s }}</button></div></div>
          <div v-if="p.colors.length" class="space-y-2"><span class="t-label-sm">Colour</span>
            <div class="flex flex-wrap gap-1"><button v-for="c in p.colors" :key="c" type="button" class="t-label-sm border border-ink px-3 py-1.5" :class="form.color === c ? 'bg-ink text-accent' : ''" @click="form.color = c">{{ c }}</button></div></div>
          <label class="block space-y-1"><span class="t-label-sm">Quantity (min {{ p.moq }})</span><input v-model.number="form.quantity" type="number" :min="p.moq" step="1" required class="field" /></label>
          <div class="grid gap-3 sm:grid-cols-2">
            <input v-model="form.name" required placeholder="Full name *" class="field" />
            <input v-model="form.email" type="email" required placeholder="Email *" class="field" />
            <input v-model="form.company" placeholder="Company" class="field" />
            <input v-model="form.phone" placeholder="Phone" class="field" />
            <input v-model="form.address" placeholder="Delivery address" class="field sm:col-span-2" />
            <input v-model="form.country" placeholder="Country" class="field" />
          </div>
          <textarea v-model="form.notes" rows="2" placeholder="Notes (optional)" class="field" />
          <div class="flex items-center justify-between border-t border-ink/10 pt-4">
            <p class="font-mono">Estimated total: <strong>${{ total }}</strong></p>
            <button :disabled="sending" class="btn">{{ sending ? "Sending…" : "Submit order" }}</button>
          </div>
          <p v-if="err" class="text-sm text-red-600">{{ err }}</p>
        </form>
      </div>
    </div>
  </main>
</template>
