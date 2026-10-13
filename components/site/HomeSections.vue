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

/* Brand Frame (Dual Media): edge letters move smoothly in counter-parallax as you scroll matching Nitex */
const frame = ref<HTMLElement>();
useGsapContext(frame, () => {
  const { gsap } = useGsap();
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: frame.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(".frame-letter-left span", { yPercent: -20 }, { yPercent: 20, ease: "none" })
    .fromTo(".frame-letter-right span", { yPercent: 20 }, { yPercent: -20, ease: "none" }, "<");
  });
});

/* [04] How We Help: Title reveal and staggered horizontal line draw + content slide */
const helpSection = ref<HTMLElement>();
useGsapContext(helpSection, () => {
  const { gsap } = useGsap();

  // 1. Title reveal animation
  gsap.fromTo(
    ".help-line-text",
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: helpSection.value,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    }
  );

  // 2. Eyebrow reveal
  gsap.fromTo(
    ".help-eyebrow",
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: helpSection.value,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );

  // 3. Staggered row reveal (divider lines scaleX from center, numbers & content rise up)
  const rows = helpSection.value?.querySelectorAll(".help-row") || [];
  rows.forEach((row) => {
    const line = row.querySelector(".help-line");
    const bottomLine = row.querySelector(".help-bottom-line");
    const num = row.querySelector(".help-num");
    const title = row.querySelector(".help-item-title");
    const desc = row.querySelector(".help-item-desc");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.85, ease: "power2.out", transformOrigin: "center center" },
        0
      );
    }
    if (bottomLine) {
      tl.fromTo(
        bottomLine,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.85, ease: "power2.out", transformOrigin: "center center" },
        0
      );
    }
    if (num) {
      tl.fromTo(
        num,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.1
      );
    }
    if (title) {
      tl.fromTo(
        title,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.15
      );
    }
    if (desc) {
      tl.fromTo(
        desc,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.2
      );
    }
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
    <section ref="story" data-chapter="01" class="relative bg-paper">
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
    <section data-chapter="02" class="grid min-h-svh grid-cols-1 md:grid-cols-2 bg-grey">
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

    <!-- BRAND FRAME / DUAL MEDIA (Matches Nitex sticky counter-scrolling N & X letters) -->
    <section ref="frame" class="brand-frame relative min-h-[140vh] flex flex-col md:flex-row bg-black">
      <div class="w-full md:w-1/2 min-h-[70vh] md:min-h-[140vh] overflow-hidden">
        <Parallax class="h-full w-full">
          <Media :src="img.frame1" class="h-full w-full object-cover min-h-[140vh]" />
        </Parallax>
      </div>
      <div class="w-full md:w-1/2 min-h-[70vh] md:min-h-[140vh] overflow-hidden">
        <Parallax class="h-full w-full">
          <Media :src="img.frame2" class="h-full w-full object-cover min-h-[140vh]" />
        </Parallax>
      </div>

      <!-- Sticky edge letters moving in counter-parallax as you scroll -->
      <div class="absolute inset-0 z-10 flex justify-between pointer-events-none select-none">
        <!-- Left letter (sticks to top-14 while scrolling down) -->
        <div class="frame-letter-left sticky top-12 lg:top-14 mb-auto -ml-[0.05em] overflow-visible">
          <span class="font-display text-[clamp(140px,22vw,360px)] leading-[0.75] font-black text-accent block [font-stretch:125%]">
            {{ brand.edgeLetters[0] }}
          </span>
        </div>

        <!-- Right letter (sticks to bottom-0 while scrolling down) -->
        <div class="frame-letter-right sticky bottom-8 lg:bottom-0 mt-auto -mr-[0.05em] overflow-visible">
          <span class="font-display text-[clamp(140px,22vw,360px)] leading-[0.75] font-black text-accent block [font-stretch:125%]">
            {{ brand.edgeLetters[1] }}
          </span>
        </div>
      </div>
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
    <section data-chapter="03" class="grid min-h-svh grid-cols-1 md:grid-cols-2">
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

    <!-- [04] HOW WE HELP (Matches Nitex Layout & Animations) -->
    <section ref="helpSection" class="relative bg-paper py-24 md:py-36 overflow-hidden">
      <!-- Chapter Eyebrow -->
      <div class="help-eyebrow mb-8 md:mb-12 text-center">
        <h2 class="inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-wide">
          <span class="font-bold text-accent">[04]</span>
          <span class="text-ink/80">{{ home.help.eyebrow }}</span>
        </h2>
      </div>

      <!-- Main Headline: Centered, 3 lines matching Nitex screenshot -->
      <div class="px-4 md:px-8 mb-16 md:mb-24 text-center">
        <h3 class="font-display mx-auto max-w-6xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight [font-stretch:125%] leading-[0.95] text-ink">
          <div v-for="l in home.help.title" :key="l" class="help-line-mask overflow-hidden py-1">
            <span class="help-line-text block">{{ l }}</span>
          </div>
        </h3>
      </div>

      <!-- 5 Numbered Rows matching Nitex screenshot -->
      <div class="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <ol class="flex flex-col">
          <li
            v-for="(it, i) in home.help.items"
            :key="it.title"
            class="help-row group relative grid grid-cols-6 lg:grid-cols-12 py-7 sm:py-8 md:py-10 transition-colors duration-300 hover:bg-ink/[0.02]"
          >
            <!-- Top Divider Line -->
            <div class="help-line absolute top-0 inset-x-0 h-[1px] bg-ink/30 origin-center" />

            <!-- Col 1: Big Number on Left (taking 2 cols on mobile, 6 cols on desktop) -->
            <div class="col-span-2 lg:col-span-6 flex items-baseline">
              <span class="help-num font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-ink group-hover:text-accent transition-colors duration-300">
                {{ i + 1 }}
              </span>
            </div>

            <!-- Col 2: Content on Right (starts at 50% width on desktop) -->
            <div class="col-span-4 lg:col-span-6 flex flex-col justify-start">
              <h3 class="help-item-title font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-ink">
                {{ it.title }}
              </h3>
              <p class="help-item-desc text-xs sm:text-sm md:text-base text-ink/75 mt-2 md:mt-3 leading-relaxed max-w-xl">
                {{ it.body }}
              </p>
            </div>

            <!-- Bottom Divider Line for the last item -->
            <div
              v-if="i === home.help.items.length - 1"
              class="help-bottom-line absolute bottom-0 inset-x-0 h-[1px] bg-ink/30 origin-center"
            />
          </li>
        </ol>
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

    <div data-chapter="05">
      <NeedsSection :index="5" />
    </div>
  </main>
</template>
