<script setup lang="ts">
/** Slide-over pages (/success-stories, /concept-to-delivery, /on-demand, /about) render over the home page. */
import { panels } from "~/content/site";
definePageMeta({ validate: (r) => panels.some((p) => p.slug === r.params.panel) });
const route = useRoute();
const page = computed(() => panels.find((p) => p.slug === route.params.panel)!);
useSeoMeta({ title: () => page.value.title });
</script>
<template>
  <div>
    <HomeSections />
    <SlidePanel :key="page.slug" :page="page" />
  </div>
</template>
