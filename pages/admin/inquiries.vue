<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "admin" });
useSeoMeta({ title: "Inquiries" });
type I = { id: number; intent: string; role: string; name: string; email: string; phone: string; company: string; country: string; message: string; status: string; created_at: string };
const { data, refresh } = await useFetch<I[]>("/api/admin/inquiries");
const open = ref<number | null>(null);
async function setStatus(i: I, status: string) { await $fetch(`/api/admin/inquiries/${i.id}`, { method: "PATCH", body: { status } }); refresh(); }
function toggle(i: I) { open.value = open.value === i.id ? null : i.id; if (i.status === "new") setStatus(i, "read"); }
</script>
<template>
  <div class="space-y-6">
    <h1 class="t-h2 !text-4xl">Inquiries</h1>
    <div class="divide-y divide-ink/10 bg-paper">
      <div v-for="i in data" :key="i.id" class="p-4">
        <button class="flex w-full flex-wrap items-center gap-3 text-left" @click="toggle(i)">
          <StatusBadge :status="i.status" /><span class="font-medium">{{ i.name }}</span><span class="text-sm text-ink/60">{{ i.company }}</span>
          <span class="t-label-sm bg-grey px-1.5">{{ i.intent || "—" }}</span><span class="t-label-sm">{{ i.role }}</span>
          <span class="ml-auto text-xs text-ink/60">{{ new Date(i.created_at).toLocaleString() }}</span>
        </button>
        <div v-if="open === i.id" class="mt-4 space-y-3 text-sm">
          <p class="whitespace-pre-line bg-grey p-3">{{ i.message }}</p>
          <p><a :href="`mailto:${i.email}`" class="underline">{{ i.email }}</a> · {{ i.phone }} · {{ i.country }}</p>
          <div class="flex gap-2"><a :href="`mailto:${i.email}`" class="btn">Reply by email</a><button class="btn-ghost" @click="setStatus(i, 'archived')">Archive</button></div>
        </div>
      </div>
      <p v-if="!data?.length" class="p-6 text-center text-ink/60">No inquiries yet.</p>
    </div>
  </div>
</template>
