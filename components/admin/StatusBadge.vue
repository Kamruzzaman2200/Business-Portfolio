<script setup lang="ts">
const props = defineProps<{ status: string }>();
const colors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-900", confirmed: "bg-blue-100 text-blue-900", sampling: "bg-purple-100 text-purple-900",
  in_production: "bg-orange-100 text-orange-900", quality_check: "bg-cyan-100 text-cyan-900", shipped: "bg-indigo-100 text-indigo-900",
  delivered: "bg-green-100 text-green-900", cancelled: "bg-red-100 text-red-900",
  published: "bg-accent text-ink", draft: "bg-ink/10 text-ink", archived: "bg-red-100 text-red-900",
  new: "bg-accent text-ink", read: "bg-ink/10 text-ink",
};
</script>
<template>
  <span class="inline-block px-2 py-0.5 font-mono text-[11px] uppercase" :class="colors[props.status] || 'bg-ink/10'">{{ props.status.replace(/_/g, " ") }}</span>
</template>
