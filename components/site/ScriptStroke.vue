<script setup lang="ts">
/**
 * Scroll-drawn handwriting. The reference site plays a Lottie JSON scrubbed by ScrollTrigger;
 * this SVG stroke version needs no asset. To use Lottie: npm i lottie-web, load your JSON,
 * and drive anim.goToAndStop(progress * anim.totalFrames, true) from a ScrollTrigger onUpdate.
 */
defineProps<{ text: string }>();
const t = ref<SVGTextElement>();
const root = ref<HTMLElement>();
useGsapContext(root, () => {
  const { gsap } = useGsap();
  gsap.fromTo(t.value!, { strokeDashoffset: 1400, fillOpacity: 0 }, {
    strokeDashoffset: 0, fillOpacity: 1, ease: "none",
    scrollTrigger: { trigger: root.value, start: "top 85%", end: "top 30%", scrub: true },
  });
});
</script>
<template>
  <div ref="root" class="pointer-events-none">
    <svg viewBox="0 0 640 160" :aria-label="text">
      <text ref="t" x="10" y="110" fill="#d7ff00" stroke="#d7ff00" transform="rotate(-8 320 80)"
        style="font-family: var(--font-script); font-size: 104px; stroke-width: 1.5; stroke-dasharray: 1400">{{ text }}</text>
    </svg>
  </div>
</template>
