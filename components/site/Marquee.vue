<script setup lang="ts">
/** Infinite client-logo strip. Speeds up briefly with scroll velocity. */
const props = withDefaults(defineProps<{ items: string[]; speed?: number }>(), { speed: 30 });
const root = ref<HTMLElement>();
const track = ref<HTMLElement>();
useGsapContext(root, () => {
  const { gsap, ScrollTrigger } = useGsap();
  const loop = gsap.to(track.value!, { xPercent: -50, duration: props.speed, ease: "none", repeat: -1 });
  ScrollTrigger.create({
    trigger: root.value, start: "top bottom", end: "bottom top",
    onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 300, 4);
      gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.2 });
    },
  });
});
</script>
<template>
  <div ref="root" class="overflow-hidden bg-accent py-8">
    <div ref="track" class="flex w-max gap-16">
      <span v-for="(t, i) in [...items, ...items, ...items, ...items]" :key="i" class="font-display text-2xl font-black whitespace-nowrap uppercase text-ink/90 [font-stretch:110%]">{{ t }}</span>
    </div>
  </div>
</template>

