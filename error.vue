<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>();
</script>
<template>
  <div class="grid min-h-screen place-items-center bg-accent p-6 text-center">
    <div class="space-y-6">
      <p class="t-display">{{ props.error.statusCode }}</p>
      <p class="t-h3">{{ props.error.statusCode === 404 ? "Page not found" : props.error.statusMessage || "Something went wrong" }}</p>
      <button class="t-label-sm bg-ink px-4 py-3 text-accent" @click="clearError({ redirect: '/' })">Back to home</button>
    </div>
  </div>
</template>
