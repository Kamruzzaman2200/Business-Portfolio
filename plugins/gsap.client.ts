import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

/**
 * Motion stack (same as the reference site): GSAP + ScrollTrigger + SplitText, Lenis smooth scroll.
 * Lenis is driven by GSAP's ticker so ScrollTrigger stays in sync.
 */
export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power2.inOut" });

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Refresh triggers after every page change / once images load
  nuxtApp.hook("page:finish", () => {
    lenis.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
  window.addEventListener("load", () => ScrollTrigger.refresh());

  return { provide: { gsap, ScrollTrigger, SplitText, lenis } };
});
