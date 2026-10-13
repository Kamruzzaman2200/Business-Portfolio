<script setup lang="ts">
/**
 * Poster + interactive play button. Plays HTML5 video in a fullscreen modal lightbox.
 */
const props = withDefaults(
  defineProps<{ poster?: string; src?: string }>(),
  {
    src: "https://vjs.zencdn.net/v/oceans.mp4"
  }
);
const open = ref(false);

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape" && open.value) open.value = false;
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="group relative h-full w-full overflow-hidden">
    <Media :src="props.poster" />
    <button
      aria-label="Play video"
      class="group/btn absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center bg-ink text-accent shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-ink focus:outline-none"
      @click="open = true"
    >
      <span class="absolute inset-0 -z-10 animate-ping rounded-none bg-accent/30 opacity-75 duration-1000" />
      <span class="pl-1 text-xl font-bold">▶</span>
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-[3000] grid place-items-center bg-ink/95 p-4 backdrop-blur-md transition-opacity"
        @click.self="open = false"
      >
        <button
          aria-label="Close video"
          class="absolute top-6 right-6 grid h-10 w-10 place-items-center bg-accent text-ink transition-transform hover:rotate-90"
          @click="open = false"
        >
          ✕
        </button>
        <div class="relative w-full max-w-5xl overflow-hidden border border-ink/20 bg-black shadow-2xl">
          <video
            :src="props.src"
            controls
            autoplay
            playsinline
            class="max-h-[80vh] w-full object-contain"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

