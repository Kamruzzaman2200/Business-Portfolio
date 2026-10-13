<script setup lang="ts">
/** Scroll-scrubbed parallax (ScrollTrigger scrub) for images */
const props = withDefaults(defineProps<{ amount?: number }>(), { amount: 10 });
const wrap = ref<HTMLElement>();
const inner = ref<HTMLElement>();
useGsapContext(wrap, () => {
  const { gsap } = useGsap();
  gsap.fromTo(inner.value!, { yPercent: -props.amount }, {
    yPercent: props.amount, ease: "none",
    scrollTrigger: { trigger: wrap.value, start: "top bottom", end: "bottom top", scrub: true },
  });
});
</script>
<template>
  <div ref="wrap" class="overflow-hidden">
    <div ref="inner" class="h-[124%] w-full -translate-y-[12%]"><slot /></div>
  </div>
</template>
