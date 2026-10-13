<script setup lang="ts">
import { brand, nav } from "~/content/site";
const route = useRoute();
const year = new Date().getFullYear();
</script>
<template>
  <footer class="relative overflow-hidden bg-ink pb-16 text-accent md:pb-0">
    <div class="relative flex min-h-[300px] items-center justify-center py-12">
      <BigLetters class="top-1/2 hidden -translate-y-1/2 md:flex" />
      <ul class="relative flex flex-col items-center gap-2">
        <li v-for="n in nav.footer" :key="n.href">
          <NuxtLink :to="n.href" class="t-h3 flex items-center gap-2 transition-opacity hover:opacity-70">
            <Slash v-if="route.path.startsWith(n.href)" />{{ n.label }}
          </NuxtLink>
        </li>
        <li class="mt-2"><NuxtLink :to="nav.login.href" class="t-h3 bg-accent px-2 py-1 text-ink hover:bg-paper">{{ nav.login.label }}</NuxtLink></li>
      </ul>
    </div>
    <div class="grid-6 t-label-sm items-center pb-4">
      <p class="col-span-6 text-center md:col-span-2 md:text-left">© {{ year }} {{ brand.name }}. All rights reserved.</p>
      <div class="col-span-6 flex justify-center gap-2 py-3 md:col-span-2">
        <a :href="brand.social.instagram" class="grid h-6 w-6 place-items-center border border-accent text-[10px] hover:bg-accent hover:text-ink">IG</a>
        <a :href="brand.social.linkedin" class="grid h-6 w-6 place-items-center border border-accent text-[10px] hover:bg-accent hover:text-ink">IN</a>
      </div>
      <div class="col-span-6 flex flex-wrap justify-center gap-4 md:col-span-2 md:justify-end">
        <NuxtLink v-for="n in nav.legal" :key="n.href" :to="n.href" class="hover:underline">{{ n.label }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>
