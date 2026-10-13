<script setup lang="ts">
/** Draggable horizontal strip with square accent arrows */
const props = withDefaults(defineProps<{ images: string[]; itemClass?: string; captions?: string[] }>(), { itemClass: "w-[70vw] md:w-[23vw] aspect-[4/3]" });
const track = ref<HTMLElement>();
const go = (d: number) => track.value?.scrollBy({ left: d * track.value.clientWidth * 0.5, behavior: "smooth" });
let down = false, startX = 0, startLeft = 0;
const onDown = (e: PointerEvent) => { down = true; startX = e.clientX; startLeft = track.value!.scrollLeft; };
const onMove = (e: PointerEvent) => { if (down) track.value!.scrollLeft = startLeft - (e.clientX - startX); };
const onUp = () => (down = false);
</script>
<template>
  <div class="relative">
    <div ref="track" data-lenis-prevent class="flex cursor-grab gap-gap overflow-x-auto [scrollbar-width:none] active:cursor-grabbing"
      @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointerleave="onUp">
      <figure v-for="(src, i) in props.images" :key="i" class="shrink-0 select-none" :class="props.itemClass">
        <Media :src="src" :label="`Image ${i + 1}`" class="pointer-events-none" />
        <figcaption v-if="props.captions?.[i]" class="t-label-sm mt-2">{{ props.captions[i] }}</figcaption>
      </figure>
    </div>
    <button aria-label="Previous" class="absolute top-1/2 left-0 grid h-8 w-8 -translate-y-1/2 place-items-center bg-accent text-ink hover:bg-ink hover:text-accent" @click="go(-1)">←</button>
    <button aria-label="Next" class="absolute top-1/2 right-0 grid h-8 w-8 -translate-y-1/2 place-items-center bg-accent text-ink hover:bg-ink hover:text-accent" @click="go(1)">→</button>
  </div>
</template>
