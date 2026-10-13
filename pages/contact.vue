<script setup lang="ts">
useSeoMeta({ title: "Contact us" });
const route = useRoute();
const intents = ["Book a demo", "Visit a lab", "Supplier inquiry", "Request a quote", "Learn about a role", "Explore an investment", "General question", "Other"];
const roles = ["Brand", "Investor", "Talent", "Partner", "Press", "General", "Other"];
const form = reactive({
  intent: (route.query.intent as string) || "", role: "", name: "", email: "", phone: "", company: "",
  country: "", message: route.query.city ? `I'd like to visit the ${route.query.city} lab.` : "", agree: false,
});
const state = ref<"idle" | "sending" | "sent" | "error">("idle");
const error = ref("");
async function submit() {
  state.value = "sending"; error.value = "";
  try {
    const { agree, ...body } = form; void agree;
    await $fetch("/api/contact", { method: "POST", body });
    state.value = "sent";
  } catch (e: unknown) {
    state.value = "error";
    error.value = (e as { data?: { statusMessage?: string } }).data?.statusMessage || "Something went wrong. Please try again.";
  }
}
const countries = ["Bangladesh", "United Kingdom", "Spain", "United States", "Turkey", "Singapore", "Germany", "France", "India", "Other"];
</script>
<template>
  <main class="bg-grey pt-24">
    <RevealTitle as="h1" immediate class="t-h1 px-3 pb-12">Contact us</RevealTitle>
    <div v-if="state === 'sent'" class="grid-6 pb-32">
      <InfoCard class="col-span-6 min-h-[300px] md:col-span-3" :link="{ label: 'Back home', href: '/' }">
        <p class="t-h3">Thanks, {{ form.name.split(' ')[0] }}!</p><p>Your message is in. We'll reply to {{ form.email }} within two working days.</p>
      </InfoCard>
    </div>
    <form v-else class="grid-6 gap-y-16 pb-24" @submit.prevent="submit">
      <div class="col-span-6 space-y-12 md:col-span-3">
        <fieldset v-for="g in [{ t: 'What would you like to do', o: intents, k: 'intent' }, { t: 'I\'m contacting you as', o: roles, k: 'role' }]" :key="g.k">
          <legend class="t-h3 mb-4">{{ g.t }}</legend>
          <div class="flex flex-wrap gap-2">
            <button v-for="o in g.o" :key="o" type="button" class="t-label-sm border border-ink px-3 py-2 transition-colors"
              :class="(form as any)[g.k] === o ? 'bg-ink text-accent' : 'hover:bg-ink hover:text-paper'" @click="(form as any)[g.k] = o">{{ o }}</button>
          </div>
        </fieldset>
      </div>
      <div class="col-span-6 space-y-5 md:col-span-3">
        <p class="t-h3">About you</p>
        <label class="block space-y-2"><span class="t-label-sm">Full name (required)</span><input v-model="form.name" required class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper" /></label>
        <label class="block space-y-2"><span class="t-label-sm">Work email (required)</span><input v-model="form.email" type="email" required class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper" /></label>
        <label class="block space-y-2"><span class="t-label-sm">Phone number (optional)</span><input v-model="form.phone" type="tel" class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper" /></label>
        <label class="block space-y-2"><span class="t-label-sm">Company (optional)</span><input v-model="form.company" class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper" /></label>
        <label class="block space-y-2"><span class="t-label-sm">Country (optional)</span>
          <select v-model="form.country" class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper"><option value="">Select a country</option><option v-for="c in countries" :key="c">{{ c }}</option></select></label>
        <label class="block space-y-2"><span class="t-label-sm">Message (required)</span><textarea v-model="form.message" required rows="4" class="w-full border border-ink bg-transparent px-3 py-2 outline-none focus:bg-paper" /></label>
        <label class="flex items-center gap-3 text-xs"><input v-model="form.agree" type="checkbox" required class="h-4 w-4 accent-ink" /> I agree to be contacted and to have my details shared with the relevant team.</label>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <button :disabled="state === 'sending'" class="t-label-sm bg-ink px-3 py-3 text-accent hover:bg-accent hover:text-ink disabled:opacity-50">{{ state === 'sending' ? 'Sending…' : 'Send message' }}</button>
      </div>
    </form>
  </main>
</template>
