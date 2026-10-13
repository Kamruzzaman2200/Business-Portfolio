<script setup lang="ts">
import { brand, nav } from "~/content/site";

const route = useRoute();
const crumbs: Record<string, string> = {
  "/talent": "Talent",
  "/partner": "Partner",
  "/contact": "Contact us",
  "/blog": "Blog",
  "/privacy": "Privacy policy",
  "/terms": "Terms & conditions",
  "/collection": "Collection",
  "/track-order": "Track order",
  "/about": "About us",
  "/get-started": "Get started",
};

const crumb = computed(() => {
  if (crumbs[route.path]) return crumbs[route.path];
  if (route.path.startsWith("/blog/")) return "Blog";
  if (route.path.startsWith("/collection/")) return "Collection";
  return "";
});

const isHome = computed(() => route.path === "/");
const isAbout = computed(() => route.path === "/about");

// Track scroll progress on homepage
const scrollProgress = ref(0);

const onScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <!-- TOP HEADER (Desktop & Mobile Brand Bar) -->
  <header class="fixed inset-x-0 top-0 z-[1000] h-14 pointer-events-none select-none px-3 lg:px-4">
    <div class="flex h-full items-center justify-between">
      <!-- Left: Brand Logo & Breadcrumb -->
      <div class="pointer-events-auto flex items-center gap-2">
        <NuxtLink to="/" class="flex items-center gap-1.5 transition-transform hover:scale-[1.02]">
          <Slash class="h-4 text-accent" />
          <span class="font-display text-lg font-black tracking-tight text-ink [font-stretch:125%]">
            {{ brand.name }}
          </span>
        </NuxtLink>
        <span v-if="crumb" class="font-mono text-xs uppercase text-ink/70">
          / {{ crumb }}
        </span>
      </div>

      <!-- Right: Desktop Navigation Tabs (matches Screenshot 1 & Nitex) -->
      <nav class="pointer-events-auto hidden h-8 w-[44vw] max-w-[480px] gap-2 lg:flex">
        <!-- ABOUT US / MEET BRAND TAB -->
        <NuxtLink
          to="/about"
          class="group relative flex w-1/2 items-center justify-between overflow-hidden border border-black/10 px-3 font-mono text-xs uppercase text-ink backdrop-blur-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:border before:border-black/10 before:transition-transform before:duration-300 hover:px-5 hover:before:-skew-x-[20deg]"
          :class="isAbout ? 'bg-accent' : 'bg-accent/40'"
        >
          <!-- Dynamic Scroll Progress Fill (Skewed parallelogram wipe) -->
          <div
            v-if="isHome"
            class="progress-fill absolute -inset-x-2 inset-y-0 -z-10 block -skew-x-[20deg] bg-accent transition-all duration-150 ease-out"
            :style="{ width: `${scrollProgress}%` }"
          />
          <span class="relative z-10 max-w-full truncate font-bold">About us</span>
          <span class="relative z-10 font-mono text-[11px] font-bold">[01]</span>
        </NuxtLink>

        <!-- GET STARTED TAB -->
        <NuxtLink
          to="/get-started"
          class="group relative flex w-1/2 items-center justify-between overflow-hidden border border-black/10 bg-white/70 px-3 font-mono text-xs uppercase text-ink backdrop-blur-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:border before:border-black/10 before:bg-white/80 before:backdrop-blur-lg before:transition-transform before:duration-300 hover:px-5 hover:bg-white/90 hover:before:-skew-x-[20deg]"
          :class="{ '!bg-accent': route.path === '/get-started' }"
        >
          <span class="relative z-10 max-w-full truncate">Get started</span>
        </NuxtLink>
      </nav>
    </div>
  </header>

  <!-- MOBILE BOTTOM NAVIGATION (Matches Nitex mobile navigation) -->
  <nav class="fixed inset-x-0 bottom-0 z-[1000] flex h-11 border-t border-black/10 bg-paper/95 font-mono text-xs uppercase backdrop-blur lg:hidden">
    <NuxtLink
      to="/about"
      class="flex w-1/2 items-center justify-between border-r border-black/10 px-4 transition-colors"
      :class="isAbout || isHome ? 'bg-accent font-bold text-ink' : 'bg-transparent text-ink'"
    >
      <span>About us</span>
      <span class="text-[10px]">■</span>
    </NuxtLink>
    <NuxtLink
      to="/get-started"
      class="flex w-1/2 items-center justify-between px-4 transition-colors"
      :class="route.path === '/get-started' ? 'bg-accent font-bold text-ink' : 'bg-white/80 text-ink'"
    >
      <span>Get started</span>
      <span class="text-[11px] opacity-75">[01]</span>
    </NuxtLink>
  </nav>
</template>
