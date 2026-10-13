<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Admin login" });
const { loggedIn, fetch: refresh } = useUserSession();
if (loggedIn.value) await navigateTo("/admin");
const form = reactive({ email: "", password: "" });
const err = ref(""); const loading = ref(false);
async function login() {
  loading.value = true; err.value = "";
  try {
    await $fetch("/api/auth/login", { method: "POST", body: form });
    await refresh();
    await navigateTo("/admin");
  } catch (e: unknown) {
    err.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || "Login failed";
  } finally { loading.value = false; }
}
</script>
<template>
  <div class="grid min-h-screen place-items-center bg-ink p-4">
    <form class="w-full max-w-sm space-y-5 bg-paper p-8" @submit.prevent="login">
      <div class="flex items-center gap-1"><Slash class="h-5 text-ink" /><span class="font-display text-xl font-black [font-stretch:125%]">BRAND ADMIN</span></div>
      <label class="block space-y-1"><span class="t-label-sm">Email</span><input v-model="form.email" type="email" required autocomplete="username" class="field" /></label>
      <label class="block space-y-1"><span class="t-label-sm">Password</span><input v-model="form.password" type="password" required autocomplete="current-password" class="field" /></label>
      <p v-if="err" class="text-sm text-red-600">{{ err }}</p>
      <button :disabled="loading" class="btn w-full justify-center py-3">{{ loading ? "Signing in…" : "Sign in" }}</button>
      <NuxtLink to="/" class="t-label-sm block text-center text-ink/60">← Back to site</NuxtLink>
    </form>
  </div>
</template>
