<script setup lang="ts">
export type ProductForm = {
  name: string; slug: string; category: string; description: string; price: number; moq: number; lead_time_days: number;
  stock: number; status: "draft" | "published" | "archived"; featured: boolean; images: string[]; sizes: string[]; colors: string[];
};
const props = defineProps<{ initial?: Partial<ProductForm>; saving?: boolean; submitLabel?: string }>();
const emit = defineEmits<{ submit: [ProductForm] }>();
const f = reactive<ProductForm>({
  name: "", slug: "", category: "Tops", description: "", price: 0, moq: 100, lead_time_days: 30, stock: 0,
  status: "draft", featured: false, images: [], sizes: ["S", "M", "L"], colors: [], ...props.initial,
});
const newImage = ref("");
const sizesText = computed({ get: () => f.sizes.join(", "), set: (v) => (f.sizes = v.split(",").map((s) => s.trim()).filter(Boolean)) });
const colorsText = computed({ get: () => f.colors.join(", "), set: (v) => (f.colors = v.split(",").map((s) => s.trim()).filter(Boolean)) });
function addImage() { if (newImage.value) { f.images.push(newImage.value.trim()); newImage.value = ""; } }
function randomImage() { f.images.push(`https://picsum.photos/seed/${Math.random().toString(36).slice(2, 8)}/900/1100`); }
function move(i: number, d: number) { const j = i + d; if (j < 0 || j >= f.images.length) return; [f.images[i], f.images[j]] = [f.images[j], f.images[i]]; }
const categories = ["Tops", "Bottoms", "Outerwear", "Dresses", "Knitwear", "Accessories", "General"];
</script>
<template>
  <form class="grid gap-6 lg:grid-cols-3" @submit.prevent="emit('submit', { ...f })">
    <div class="space-y-4 bg-paper p-5 lg:col-span-2">
      <p class="t-label-sm text-ink/60">Details</p>
      <label class="block space-y-1"><span class="text-xs font-medium">Name *</span><input v-model="f.name" required class="field" /></label>
      <label class="block space-y-1"><span class="text-xs font-medium">URL slug (auto from name if empty)</span><input v-model="f.slug" class="field font-mono" placeholder="relaxed-denim-jacket" /></label>
      <label class="block space-y-1"><span class="text-xs font-medium">Description</span><textarea v-model="f.description" rows="5" class="field" /></label>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block space-y-1"><span class="text-xs font-medium">Sizes (comma separated)</span><input v-model="sizesText" class="field" /></label>
        <label class="block space-y-1"><span class="text-xs font-medium">Colours (comma separated)</span><input v-model="colorsText" class="field" /></label>
      </div>
      <p class="t-label-sm pt-4 text-ink/60">Images</p>
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-4">
        <div v-for="(im, i) in f.images" :key="im + i" class="group relative aspect-[4/5]">
          <Media :src="im" />
          <span v-if="i === 0" class="absolute top-1 left-1 bg-accent px-1 font-mono text-[10px]">COVER</span>
          <div class="absolute inset-x-0 bottom-0 flex justify-between bg-ink/70 p-1 text-xs text-paper opacity-0 group-hover:opacity-100">
            <button type="button" @click="move(i, -1)">←</button><button type="button" @click="f.images.splice(i, 1)">Remove</button><button type="button" @click="move(i, 1)">→</button>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <input v-model="newImage" placeholder="https://… or /images/file.jpg" class="field" @keydown.enter.prevent="addImage" />
        <button type="button" class="btn-ghost shrink-0" @click="addImage">Add</button>
        <button type="button" class="btn-ghost shrink-0" @click="randomImage">+ Dummy</button>
      </div>
    </div>
    <div class="space-y-4">
      <div class="space-y-4 bg-paper p-5">
        <p class="t-label-sm text-ink/60">Status</p>
        <select v-model="f.status" class="field"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select>
        <label class="flex items-center gap-2 text-sm"><input v-model="f.featured" type="checkbox" class="accent-ink" /> Featured in collection</label>
        <label class="block space-y-1"><span class="text-xs font-medium">Category</span>
          <input v-model="f.category" list="cats" class="field" /><datalist id="cats"><option v-for="c in categories" :key="c" :value="c" /></datalist></label>
      </div>
      <div class="grid grid-cols-2 gap-4 bg-paper p-5">
        <p class="t-label-sm col-span-2 text-ink/60">Pricing & production</p>
        <label class="block space-y-1"><span class="text-xs font-medium">Unit price ($)</span><input v-model.number="f.price" type="number" step="0.01" min="0" class="field" /></label>
        <label class="block space-y-1"><span class="text-xs font-medium">MOQ</span><input v-model.number="f.moq" type="number" min="1" class="field" /></label>
        <label class="block space-y-1"><span class="text-xs font-medium">Lead time (days)</span><input v-model.number="f.lead_time_days" type="number" min="0" class="field" /></label>
        <label class="block space-y-1"><span class="text-xs font-medium">Stock / capacity</span><input v-model.number="f.stock" type="number" min="0" class="field" /></label>
      </div>
      <button :disabled="saving" class="btn w-full justify-center py-3">{{ saving ? "Saving…" : submitLabel || "Save product" }}</button>
      <slot />
    </div>
  </form>
</template>
