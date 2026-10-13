<script setup lang="ts">
import { brand, home, img, video } from "~/content/site";

const hero = ref<HTMLElement>();
const story = ref<HTMLElement>();

/* Hero intro: edge letters slide in from the screen edges, tagline fades up */
useGsapContext(hero, () => {
  const { gsap } = useGsap();
  let hasPlayed = false;

  const playHero = () => {
    if (hasPlayed) return;
    hasPlayed = true;
    gsap.timeline()
      .fromTo(".hero-letters span:first-child", { xPercent: -100 }, { xPercent: 0, duration: 1.1, ease: "power3.out" })
      .fromTo(".hero-letters span:last-child", { xPercent: 100 }, { xPercent: 0, duration: 1.1, ease: "power3.out" }, "<")
      .fromTo(".hero-copy > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }, "-=0.5");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("intro-complete", playHero, { once: true });
    setTimeout(playHero, 1500);
  }
});

/* [01] Our Story: Pinned section matching Nitex image scale, text color shift, and visible card */
useGsapContext(story, () => {
  const { gsap } = useGsap();
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: story.value,
        start: "top top",
        end: "+=130%",
        scrub: 0.7,
        pin: ".story-pin",
        anticipatePin: 1,
      },
    });

    // 1. Cutout scales up to completely envelop the headline with generous margins, matching Nitex Screenshot 2
    tl.to(".story-cutout", {
      scaleX: 25,
      scaleY: 20,
      transformOrigin: "center center",
      ease: "power2.inOut",
      duration: 1,
    })
    // 2. Text rapidly transitions to solid pure white early in the scroll scrub
    .to(".story-word", {
      color: "#ffffff",
      ease: "power2.out",
      duration: 0.35,
    }, 0.05)
    .to(".story-eyebrow-text", {
      color: "#ffffff",
      ease: "power2.out",
      duration: 0.35,
    }, 0.05);
  });
});
</script>

<template>
  <main>
    <!-- HERO -->
    <section ref="hero" class="relative h-svh overflow-hidden">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <Parallax class="h-full">
          <Media :src="img.hero1" eager class="h-full w-full object-cover" />
        </Parallax>
        <Parallax class="hidden h-full md:block">
          <Media :src="img.hero2" eager class="h-full w-full object-cover" />
        </Parallax>
      </div>

      <!-- Edge letters (Nitex signature edge marks) -->
      <div class="hero-letters absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none">
        <BigLetters class="relative" />
      </div>

      <!-- Center tagline & CTA button -->
      <div class="hero-copy absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center pointer-events-auto z-10">
        <p class="max-w-md text-base md:text-lg leading-[1.35] text-accent font-medium [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
          {{ brand.tagline }}
        </p>
        <BrandButton to="/about">Inside {{ brand.name }}</BrandButton>
      </div>
    </section>

    <!-- [01] OUR STORY (Matches Screenshot 2 and Nitex Pinned Section) -->
    <section ref="story" class="relative bg-paper">
      <div class="story-pin flex min-h-screen flex-col justify-center items-center relative overflow-hidden py-24 px-4 select-none">
        <!-- Chapter eyebrow -->
        <div class="chapter-text relative z-20 pb-6 lg:pb-8 text-center">
          <h2 class="inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-wide">
            <span class="font-bold text-accent">[01]</span>
            <span class="story-eyebrow-text text-ink/80">{{ home.story.eyebrow }}</span>
          </h2>
        </div>

        <!-- Giant Headline with Cutout Media (Nitex 3-line layout) -->
        <div class="story-headline font-display relative m-auto flex max-w-full flex-col items-center text-center text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight [font-stretch:125%] z-20">
          <!-- Line 1: BUILT FOR -->
          <div class="flex items-center justify-center gap-3">
            <span class="story-word relative z-20 text-ink">BUILT FOR</span>
          </div>

          <!-- Line 2: THE [media cutout] NEXT -->
          <div class="flex items-center justify-center gap-3 my-2">
            <span class="story-word relative z-20 text-ink">THE</span>
            <div class="story-cutout-wrap relative inline-block mx-2 md:mx-4 overflow-visible z-10">
              <div class="story-cutout relative h-[0.9em] w-[1.15em] overflow-hidden [clip-path:polygon(25%_0,100%_0,75%_100%,0_100%)] shadow-2xl">
                <div class="absolute inset-0 z-10 bg-black/30 pointer-events-none" />
                <Media :src="img.story" class="h-full w-full object-cover scale-110" />
              </div>
            </div>
            <span class="story-word relative z-20 text-ink">NEXT</span>
          </div>

          <!-- Line 3: SEASON -->
          <div class="flex items-center justify-center gap-3">
            <span class="story-word relative z-20 text-ink">SEASON</span>
          </div>
        </div>

        <!-- Pinned Yellow Info Card: ALWAYS VISIBLE (Matches Screenshot 2 and Nitex) -->
        <div class="story-card pointer-events-auto relative mt-10 lg:mt-0 lg:absolute lg:bottom-12 lg:right-8 z-30 w-full max-w-[340px] bg-accent p-5 md:p-6 flex flex-col gap-4 shadow-2xl opacity-100">
          <p class="text-base md:text-lg leading-[1.3] font-medium text-ink">
            {{ home.story.body[0] }}
          </p>
          <p class="text-xs md:text-sm leading-[1.4] text-ink/80">
            {{ home.story.body[1] }}
          </p>
          <NuxtLink to="/about" class="group mt-2 flex items-center gap-2 font-mono text-xs uppercase text-ink">
            <span class="logomark h-[0.6lh] w-3 -skew-x-[20deg] bg-ink transition-all duration-300 group-hover:w-7"></span>
            <span class="font-bold transition-transform duration-300 group-hover:translate-x-2">INSIDE {{ brand.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- [02] WHAT WE DO -->
    <section class="grid min-h-svh grid-cols-1 md:grid-cols-2 bg-grey">
      <div class="flex flex-col justify-between gap-12 p-6 md:p-10 pt-20">
        <div>
          <Eyebrow :index="2" class="mb-6">{{ home.whatWeDo.eyebrow }}</Eyebrow>
          <RevealTitle class="t-h2 max-w-[12ch]">{{ home.whatWeDo.title }}</RevealTitle>
        </div>
        <p class="ml-auto max-w-sm text-sm md:text-[15px] leading-[21px] text-ink/80">{{ home.whatWeDo.body }}</p>
      </div>

      <div class="relative min-h-[60vh] flex flex-col justify-between">
        <VideoBlock :poster="img.video" :src="video.workshop" />
        <div class="relative md:absolute md:top-0 md:right-0 flex w-full flex-col md:w-1/2 z-10">
          <NuxtLink
            v-for="t in home.whatWeDo.tabs"
            :key="t.href"
            :to="t.href"
            class="group flex items-center gap-2 border-b border-ink/10 bg-accent px-4 py-3 font-mono text-xs uppercase text-ink transition-colors hover:bg-ink hover:text-accent"
          >
            <span class="logomark h-3 w-3 -skew-x-[20deg] bg-current transition-all duration-200 group-hover:w-6"></span>
            <span class="transition-transform duration-300 group-hover:translate-x-1">{{ t.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- BRAND FRAME -->
    <section class="relative grid h-svh grid-cols-1 md:grid-cols-2 overflow-hidden">
      <Parallax class="h-full"><Media :src="img.frame1" class="h-full w-full object-cover" /></Parallax>
      <Parallax class="h-full"><Media :src="img.frame2" class="h-full w-full object-cover" /></Parallax>
      <BigLetters class="top-0 pointer-events-none select-none" />
    </section>

    <!-- LOGOS MARQUEE -->
    <Marquee :items="home.logos" />

    <!-- PRODUCT DEMO VIDEO -->
    <section class="flex min-h-svh items-center justify-center bg-ink p-4 md:p-8">
      <ClipReveal class="aspect-video w-full max-w-4xl shadow-2xl">
        <VideoBlock :poster="img.demo" :src="video.demo" />
      </ClipReveal>
    </section>

    <!-- [03] WHAT WE BELIEVE -->
    <section class="grid min-h-svh grid-cols-1 md:grid-cols-2">
      <Parallax class="min-h-[60vh]"><Media :src="img.believe" class="h-full w-full object-cover" /></Parallax>
      <div class="relative flex flex-col justify-between gap-12 bg-grey p-6 md:p-10 pt-20">
        <div>
          <Eyebrow :index="3" class="mb-6">{{ home.believe.eyebrow }}</Eyebrow>
          <RevealTitle class="t-h2">{{ home.believe.title }}</RevealTitle>
        </div>
        <div class="max-w-sm space-y-4 text-sm md:text-[15px] leading-[21px] text-ink/80">
          <p v-for="p in home.believe.body" :key="p">{{ p }}</p>
        </div>
        <NuxtLink
          :to="home.believe.link.href"
          class="group absolute top-0 right-0 flex items-center gap-2 bg-accent px-4 py-2.5 font-mono text-xs uppercase text-ink transition-colors hover:bg-ink hover:text-accent"
        >
          <span class="logomark h-3 w-3 -skew-x-[20deg] bg-current transition-all duration-200 group-hover:w-6"></span>
          <span class="transition-transform duration-300 group-hover:translate-x-1">{{ home.believe.link.label }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- [04] HOW WE HELP -->
    <section class="bg-paper py-24 md:py-32">
      <Eyebrow :index="4" class="mb-6 justify-center">{{ home.help.eyebrow }}</Eyebrow>
      <RevealTitle class="t-h2 mx-auto mb-20 text-center max-w-2xl px-4">
        <span v-for="l in home.help.title" :key="l" class="block">{{ l }}</span>
      </RevealTitle>
      <div class="grid-6">
        <div v-for="(it, i) in home.help.items" :key="it.title" class="col-span-6 space-y-4 border-t border-ink pt-6 md:col-span-3">
          <div class="flex items-center gap-4">
            <span class="font-mono text-sm font-bold text-accent bg-ink px-2 py-0.5 -skew-x-[15deg]">0{{ i + 1 }}</span>
            <h3 class="t-h3">{{ it.title }}</h3>
          </div>
          <p class="max-w-md pb-6 pl-10 text-sm leading-[22px] text-ink/80">{{ it.body }}</p>
        </div>
      </div>
    </section>

    <!-- SHOWCASE -->
    <section class="relative h-svh overflow-hidden">
      <Parallax class="absolute inset-0"><Media :src="img.showcase" class="h-full w-full object-cover" /></Parallax>
      <ScriptStroke :text="home.showcase.script" class="absolute top-[45%] left-[18%] w-[56%] pointer-events-none" />
      <InfoCard :link="home.showcase.link" class="absolute top-4 right-4 h-[70%] w-[calc(100%-32px)] md:w-[calc(33.333%-12px)] shadow-2xl">
        <p class="text-base leading-[23px]">{{ home.showcase.body }}</p>
      </InfoCard>
    </section>

    <NeedsSection :index="5" />
  </main>
</template>
