<script setup lang="ts">
/** Image (or dummy placeholder). Fades in when loaded with cache support and error fallback. */
const props = defineProps<{ src?: string; alt?: string; label?: string; eager?: boolean }>();
const loaded = ref(false);
const error = ref(false);
const imgRef = ref<HTMLImageElement>();

function onLoad() {
  loaded.value = true;
}
function onError() {
  error.value = true;
  loaded.value = true;
}

onMounted(() => {
  if (imgRef.value?.complete) {
    loaded.value = true;
  }
});
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,#9aa3ad,#4b5560)]">
    <img
      v-if="props.src && !error"
      ref="imgRef"
      :src="props.src"
      :alt="props.alt || ''"
      :loading="props.eager ? 'eager' : 'lazy'"
      class="h-full w-full object-cover transition-all duration-700 ease-out"
      :class="loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'"
      @load="onLoad"
      @error="onError"
    />
    <div v-else-if="error" class="absolute inset-0 flex flex-col items-center justify-center bg-grey p-4 text-center">
      <span class="t-label-sm text-ink/60">{{ props.alt || props.label || 'Image preview' }}</span>
    </div>
    <span v-else-if="props.label" class="t-label-sm absolute bottom-3 left-3 text-white/70">{{ props.label }}</span>
  </div>
</template>

