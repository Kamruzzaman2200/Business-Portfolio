<script setup lang="ts">
/**
 * Initial loading / intro animation matching https://nitex.com:
 * 1. Full-screen black background (fixed inset-0 z-[2000]).
 * 2. Neon-yellow parallelogram in the center (-skew-x-[20deg]).
 * 3. Parallelogram scales & fades in, pauses, then the black curtain wipes up away.
 * 4. Triggers the hero intro timeline (big edge letters slide in, tagline reveals).
 */
const curtain = ref<HTMLElement>();
const shape = ref<HTMLElement>();
const isVisible = ref(true);

onMounted(() => {
  const { gsap } = useGsap();
  const hasSeen = sessionStorage.getItem("brand_intro_seen");

  if (hasSeen) {
    isVisible.value = false;
    window.dispatchEvent(new CustomEvent("intro-complete"));
    return;
  }

  sessionStorage.setItem("brand_intro_seen", "true");

  const tl = gsap.timeline({
    onComplete: () => {
      isVisible.value = false;
      window.dispatchEvent(new CustomEvent("intro-complete"));
    },
  });

  tl.set(shape.value!, { opacity: 0, scale: 0.5, skewX: -20 })
    .to(shape.value!, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.15,
    })
    .to(shape.value!, {
      scale: 1.06,
      duration: 0.25,
      ease: "power1.inOut",
    })
    .to(curtain.value!, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    }, "+=0.1");
});
</script>

<template>
  <div
    v-if="isVisible"
    ref="curtain"
    class="fixed inset-0 z-[2500] flex h-screen w-full items-center justify-center bg-ink"
  >
    <div
      ref="shape"
      class="h-[14vmax] w-[14vmax] max-h-[180px] max-w-[180px] -skew-x-[20deg] bg-accent shadow-[0_0_60px_rgba(215,255,0,0.4)]"
    />
  </div>
</template>
