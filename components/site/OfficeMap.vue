<script setup lang="ts">
/** City filter chips + map pins + address cards. Replace the dotted backdrop with a world-map SVG in /public if you like. */
import { offices } from "~/content/site";
const active = ref("All");
const shown = computed(() => (active.value === "All" ? offices : offices.filter((o) => o.city === active.value)));
</script>
<template>
  <div class="relative bg-grey">
    <div class="absolute top-3 left-3 z-10 flex flex-wrap gap-1">
      <button v-for="c in ['All', ...offices.map((o) => o.city)]" :key="c"
        class="t-label-sm border border-ink px-2 py-1 transition-colors"
        :class="active === c ? 'bg-ink text-paper' : 'bg-accent text-ink hover:bg-ink hover:text-paper'"
        @click="active = c">{{ c }}</button>
    </div>
    <div class="relative aspect-[2/1] w-full bg-[radial-gradient(#b5b5b5_1px,transparent_1px)] [background-size:10px_10px]">
      <svg v-for="o in offices" :key="o.city" viewBox="0 0 14 10"
        class="absolute h-3 w-4 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
        :class="shown.includes(o) ? 'scale-150 opacity-100' : 'opacity-20'"
        :style="{ left: o.x + '%', top: o.y + '%' }"><polygon points="4,0 14,0 10,10 0,10" /></svg>
    </div>
    <TransitionGroup tag="div" name="fade" class="grid gap-gap p-3 md:grid-cols-3">
      <div v-for="o in shown" :key="o.city" class="space-y-2 bg-paper p-3">
        <p class="t-h3">{{ o.city }}</p>
        <p class="text-sm">{{ o.address }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
