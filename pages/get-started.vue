<script setup lang="ts">
import { img, labs } from "~/content/site";
useSeoMeta({ title: "Get started" });
</script>
<template>
  <main>
    <section class="relative h-svh overflow-hidden">
      <Parallax class="absolute inset-0"><Media :src="img.hero1" eager /></Parallax>
      <div class="absolute inset-x-0 top-[12%] text-center text-paper">
        <Eyebrow :index="1" class="mb-6 justify-center">Get in touch</Eyebrow>
        <RevealTitle as="h1" immediate class="t-display">Let's have a talk</RevealTitle>
      </div>
      <InfoCard :link="{ label: 'Contact us', href: '/contact' }" class="absolute right-3 bottom-3 h-[45%] w-[calc(100%-24px)] md:w-[calc(33.333%-8px)]">
        <p>Whether you're a brand ready to scale, a partner, or someone who wants to join the team — let's talk.</p>
        <ul class="space-y-1 text-sm">
          <li><NuxtLink to="/contact?intent=Book%20a%20demo" class="hover:underline">Request a demo</NuxtLink></li>
          <li><NuxtLink to="/partner" class="hover:underline">Explore partnerships</NuxtLink></li>
          <li><NuxtLink to="/talent" class="hover:underline">Discover careers</NuxtLink></li>
        </ul>
      </InfoCard>
    </section>

    <section class="grid min-h-svh grid-cols-1 md:grid-cols-2">
      <ClipReveal class="min-h-[50vh]"><Media :src="img.demo" /></ClipReveal>
      <div class="relative flex flex-col justify-between gap-12 p-3 pt-20">
        <div>
          <Eyebrow :index="2" class="mb-6">Get a demo</Eyebrow>
          <RevealTitle class="t-h2">See the platform in action</RevealTitle>
        </div>
        <p class="ml-auto max-w-xs text-[15px] leading-[21px]">Book a personal walkthrough and our team will show you every step, from forecasting to delivery.</p>
        <SlashLink to="/contact?intent=Book%20a%20demo" class="absolute top-0 right-0 bg-accent px-3 py-2">Book a demo</SlashLink>
      </div>
    </section>

    <section class="bg-grey pt-32">
      <Eyebrow :index="3" class="mb-6 justify-center">Book a lab visit</Eyebrow>
      <RevealTitle class="t-h2 mx-auto mb-16 max-w-[14ch] text-center">Visit one of our design labs</RevealTitle>
      <Carousel :images="labs.map((l) => l.image)" :captions="labs.map((l) => `${l.city} — ${l.address}`)" item-class="w-[80vw] md:w-[28vw] aspect-[4/3]" />
      <div class="grid-6 py-6">
        <NuxtLink v-for="l in labs" :key="l.city" :to="`/contact?intent=Visit%20a%20lab&city=${l.city}`" class="btn-ghost col-span-3 justify-center md:col-span-1">Book {{ l.city }}</NuxtLink>
      </div>
    </section>

    <section class="pt-32">
      <Eyebrow :index="4" class="mb-6 justify-center">See our locations</Eyebrow>
      <RevealTitle class="t-h2 mx-auto mb-16 max-w-[16ch] text-center">Our offices around the globe</RevealTitle>
      <OfficeMap />
    </section>

    <section class="relative grid h-svh grid-cols-1 md:grid-cols-2">
      <Parallax class="h-full"><Media :src="img.frame1" /></Parallax>
      <Parallax class="h-full"><Media :src="img.frame2" /></Parallax>
      <BigLetters class="top-0" />
    </section>

    <NeedsSection :index="5" />
  </main>
</template>
