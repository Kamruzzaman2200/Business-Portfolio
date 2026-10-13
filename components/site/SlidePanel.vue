<script setup lang="ts">
/**
 * Slide-over page: accent panel slides in from the right over the dimmed home page
 * (xPercent 100 → 0, 1.2s power2.inOut), scrolls independently, close animates out then routes home.
 */
import { home, type PanelPage, labs } from "~/content/site";
const props = defineProps<{ page: PanelPage }>();
const root = ref<HTMLElement>();
const panel = ref<HTMLElement>();
const shade = ref<HTMLElement>();
const router = useRouter();
let n = 0;
const next = () => ++n;

onMounted(() => {
  const { gsap, lenis } = useGsap();
  lenis?.stop();
  gsap.timeline()
    .fromTo(shade.value!, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    .fromTo(panel.value!, { xPercent: 100 }, { xPercent: 0, duration: 1.2, ease: "power2.inOut" }, "<")
    .from(root.value!.querySelectorAll(".panel-title"), { yPercent: 100, duration: 0.8, ease: "power3.out" }, "-=0.4");
});
onBeforeUnmount(() => useGsap().lenis?.start());

function close() {
  const { gsap } = useGsap();
  gsap.timeline({ onComplete: () => router.push("/") })
    .to(panel.value!, { xPercent: 100, duration: 0.6, ease: "power2.inOut" })
    .to(shade.value!, { opacity: 0, duration: 0.4 }, "<");
}
const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div ref="root" class="fixed inset-0 z-[1001]">
    <div ref="shade" class="absolute inset-0 cursor-pointer bg-ink/50" @click="close" />
    <div ref="panel" data-lenis-prevent class="absolute inset-y-0 right-0 w-full overflow-y-auto bg-accent p-3 md:w-[calc(83.333%-2px)]">
      <button aria-label="Close" class="sticky top-0 z-10 float-right grid h-8 w-8 place-items-center bg-ink text-accent hover:rotate-90 transition-transform" @click="close">✕</button>

      <div class="overflow-hidden pt-8"><h1 class="panel-title t-h1 max-w-[12ch]">{{ page.title }}</h1></div>
      <p v-if="page.intro" class="mt-8 max-w-xl text-lg leading-[23.4px]">{{ page.intro }}</p>
      <ClipReveal immediate :delay="0.8" class="mt-8 aspect-[16/9]"><Media :src="page.hero" eager /></ClipReveal>
      <p v-if="page.aside && !page.quote" class="t-h3 mt-12 max-w-2xl !text-3xl">{{ page.aside }}</p>

      <section v-if="page.quote" class="mt-16">
        <SectionRule label="Testimonials" :index="next()" />
        <div class="grid gap-8 md:grid-cols-6">
          <QuoteBlock v-bind="page.quote" class="md:col-span-4" />
          <p v-if="page.aside" class="text-[15px] leading-[21px] md:col-span-2 md:mt-auto">{{ page.aside }}</p>
        </div>
      </section>

      <section v-if="page.stats" class="mt-16">
        <SectionRule label="Numbers that matter" :index="next()" />
        <Stats :items="page.stats" />
      </section>

      <section v-if="page.offices" class="-mx-3 mt-16">
        <div class="px-3"><SectionRule label="Our locations" :index="next()" /></div>
        <OfficeMap />
      </section>

      <section v-if="page.steps" class="mt-16">
        <SectionRule label="How it works" :index="next()" />
        <div v-if="page.carousel" class="mb-8"><Carousel :images="page.carousel" item-class="w-[60vw] md:w-[22vw] aspect-[4/3]" /></div>
        <Steps :items="page.steps" />
      </section>

      <section v-if="page.team" class="mt-16">
        <SectionRule label="Leadership" :index="next()" />
        <div class="grid gap-gap md:grid-cols-4">
          <div v-for="m in page.team" :key="m.email" class="space-y-2">
            <div class="aspect-[4/5]"><Media :src="m.photo" /></div>
            <p class="t-h3">{{ m.name }}</p>
            <p class="text-sm">{{ m.role }}</p>
            <a :href="`mailto:${m.email}`" class="t-label-sm underline">{{ m.email }}</a>
          </div>
        </div>
      </section>

      <section v-if="page.offices" class="mt-16">
        <SectionRule label="Design labs" :index="next()" />
        <Carousel :images="labs.map((l) => l.image)" :captions="labs.map((l) => l.city + ' — ' + l.address)" item-class="w-[70vw] md:w-[30vw] aspect-[4/3]" />
      </section>

      <section v-if="page.showLogos" class="-mx-3 mt-16">
        <div class="px-3"><SectionRule label="Customers" :index="next()" /></div>
        <Marquee :items="home.logos" />
      </section>

      <div v-if="page.closingImage" class="mt-16 aspect-[16/9]"><Media :src="page.closingImage" /></div>
      <QuoteBlock v-if="page.closingQuote" v-bind="page.closingQuote" class="mt-8 pb-16" />
      <div class="h-16" />
    </div>
  </div>
</template>
