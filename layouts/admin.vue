<script setup lang="ts">
const { user, clear } = useUserSession();
const route = useRoute();
const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/inquiries", label: "Inquiries" },
];
const open = ref(false);
async function logout() { await clear(); await navigateTo("/admin/login"); }
const active = (to: string) => (to === "/admin" ? route.path === "/admin" : route.path.startsWith(to));
</script>
<template>
  <div class="min-h-screen bg-grey font-sans md:grid md:grid-cols-[220px_1fr]">
    <aside class="bg-ink text-paper md:sticky md:top-0 md:h-screen">
      <div class="flex items-center justify-between p-4">
        <NuxtLink to="/admin" class="flex items-center gap-1 text-accent"><Slash class="h-4" /><span class="font-display font-black [font-stretch:125%]">BRAND ADMIN</span></NuxtLink>
        <button class="md:hidden t-label-sm text-accent" @click="open = !open">Menu</button>
      </div>
      <nav class="flex-col gap-1 px-2 pb-4 md:flex" :class="open ? 'flex' : 'hidden'">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="t-label-sm px-3 py-2" :class="active(l.to) ? 'bg-accent text-ink' : 'hover:bg-white/10'" @click="open = false">{{ l.label }}</NuxtLink>
        <div class="mt-6 border-t border-white/10 px-3 pt-4 text-xs text-white/60">{{ user?.email }}</div>
        <NuxtLink to="/" target="_blank" class="t-label-sm px-3 py-2 hover:bg-white/10">View site ↗</NuxtLink>
        <button class="t-label-sm px-3 py-2 text-left hover:bg-white/10" @click="logout">Log out</button>
      </nav>
    </aside>
    <main class="min-w-0 p-4 md:p-8"><slot /></main>
  </div>
</template>
