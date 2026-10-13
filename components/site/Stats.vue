<script setup lang="ts">
/** Stat row — numbers count up when scrolled into view */
const props = defineProps<{ items: { value: string; label: string }[] }>();
const root = ref<HTMLElement>();
useGsapContext(root, () => {
  const { gsap } = useGsap();
  root.value?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const raw = el.dataset.count || "";
    const num = parseFloat(raw);
    if (Number.isNaN(num)) return;
    const suffix = raw.replace(/^[\d.]+/, "");
    const obj = { v: 0 };
    gsap.to(obj, {
      v: num, duration: 1.6, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v) + suffix),
    });
  });
});
</script>
<template>
  <div ref="root" class="grid grid-cols-2 gap-gap md:grid-cols-4">
    <div v-for="s in props.items" :key="s.label" class="space-y-3">
      <p class="t-stat" :data-count="s.value">{{ s.value }}</p>
      <p class="t-label-sm">{{ s.label }}</p>
    </div>
  </div>
</template>
