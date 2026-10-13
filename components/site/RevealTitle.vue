<script setup lang="ts">
/**
 * Signature Nitex text reveal v2:
 * Diagonal parallelogram clip-path wipe (clip-path: polygon(-100% 0, 105% 0, 100% 100%, -100% 100%))
 * combined with translateX from -3.5rem to 0.
 */
const props = withDefaults(
  defineProps<{
    as?: string;
    start?: string;
    immediate?: boolean;
    lines?: string[];
  }>(),
  { as: "h2", start: "top 85%", immediate: false }
);

const el = ref<HTMLElement>();
const isSeen = ref(false);
let trigger: { kill(): void } | undefined;

onMounted(async () => {
  const { ScrollTrigger } = useGsap();
  await document.fonts.ready;
  if (!el.value) return;

  // If explicit lines were not passed, wrap direct children or text into line-mask
  if (!props.lines || props.lines.length === 0) {
    const rawText = el.value.innerText.trim();
    if (!el.value.querySelector(".line-mask") && rawText) {
      // Split by explicit linebreaks or break into ~3-4 word lines if long
      const words = rawText.split(/\s+/);
      if (words.length <= 4) {
        el.value.innerHTML = `<span class="line-mask"><span class="line">${rawText}</span></span>`;
      } else {
        // Group into lines of max ~4 words
        const chunked: string[] = [];
        for (let i = 0; i < words.length; i += 4) {
          chunked.push(words.slice(i, i + 4).join(" "));
        }
        el.value.innerHTML = chunked
          .map((chunk) => `<span class="line-mask"><span class="line">${chunk}</span></span>`)
          .join("");
      }
    }
  }

  if (props.immediate) {
    setTimeout(() => {
      isSeen.value = true;
    }, 200);
    return;
  }

  if (ScrollTrigger) {
    trigger = ScrollTrigger.create({
      trigger: el.value,
      start: props.start,
      once: true,
      onEnter: () => {
        isSeen.value = true;
      },
    });
  } else {
    isSeen.value = true;
  }
});

onBeforeUnmount(() => {
  trigger?.kill();
});
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="text-reveal-v2"
    :class="{ 'is-seen': isSeen }"
  >
    <template v-if="lines && lines.length > 0">
      <span v-for="(l, i) in lines" :key="i" class="line-mask">
        <span class="line">{{ l }}</span>
      </span>
    </template>
    <slot v-else />
  </component>
</template>
