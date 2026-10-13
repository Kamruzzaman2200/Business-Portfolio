<script setup lang="ts">
/**
 * Page transition: accent curtain wipes up over the page, route changes, curtain wipes away
 * (reference used translate-container yPercent 100 → 0 → -100 with power2.inOut).
 */
const curtain = ref<HTMLElement>();
const router = useRouter();
const isPanel = (p: string) => ["/success-stories", "/concept-to-delivery", "/on-demand", "/about"].includes(p);
onMounted(() => {
  const { gsap } = useGsap();
  router.beforeEach((to, from) => {
    if (to.path === from.path || to.path.startsWith("/admin") || from.path.startsWith("/admin")) return true;
    if (isPanel(to.path) || isPanel(from.path)) return true; // panels animate themselves
    return new Promise<boolean>((resolve) => {
      gsap.fromTo(curtain.value!, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "power2.inOut", onComplete: () => resolve(true) });
    });
  });
  router.afterEach((to, from) => {
    if (to.path === from.path) return;
    const y = Number(gsap.getProperty(curtain.value!, "yPercent"));
    if (y === 0 || Math.abs(y) < 1) {
      setTimeout(() => {
        gsap.to(curtain.value!, {
          yPercent: -100,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
          onComplete: () => {
            gsap.set(curtain.value!, { yPercent: 100 });
          },
        });
      }, 50);
    }
  });
});

</script>
<template>
  <div ref="curtain" class="curtain pointer-events-none fixed inset-0 z-[2000] flex items-center justify-center bg-accent">
    <Slash class="!h-16 text-ink" />
  </div>
</template>
