<script setup lang="ts">
/** Signature parallelogram wipe: clip-path polygon slides in from the left (power2.inOut, 1.2s) */
const props = withDefaults(defineProps<{ delay?: number; immediate?: boolean }>(), { delay: 0, immediate: false });
const el = ref<HTMLElement>();
useGsapContext(el, () => {
  const { gsap } = useGsap();
  gsap.fromTo(el.value!,
    { clipPath: "polygon(-100% 0%, 0% 0%, -5% 100%, -100% 100%)" },
    { clipPath: "polygon(0% 0%, 105% 0%, 100% 100%, -5% 100%)", duration: 1.2, delay: props.delay, ease: "power2.inOut",
      scrollTrigger: props.immediate ? undefined : { trigger: el.value, start: "top 90%", once: true } });
});
</script>
<template><div ref="el"><slot /></div></template>
