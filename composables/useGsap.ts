import type { Ref } from "vue";

/** Run GSAP code scoped to an element; everything created is reverted on unmount. */
export function useGsapContext(scope: Ref<HTMLElement | null | undefined>, fn: () => void | (() => void)) {
  let ctx: { revert(): void } | undefined;
  onMounted(() => {
    const { $gsap } = useNuxtApp();
    if (!$gsap) return;
    ctx = ($gsap as typeof import("gsap").gsap).context(fn, scope.value ?? undefined);
  });
  onBeforeUnmount(() => ctx?.revert());
}

export const useGsap = () => {
  const app = useNuxtApp();
  return {
    gsap: app.$gsap as typeof import("gsap").gsap,
    ScrollTrigger: app.$ScrollTrigger as typeof import("gsap/ScrollTrigger").ScrollTrigger,
    SplitText: app.$SplitText as typeof import("gsap/SplitText").SplitText,
    lenis: app.$lenis as import("lenis").default,
  };
};
