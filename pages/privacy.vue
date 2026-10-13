<script setup lang="ts">
import { legal } from "~/content/site";
useSeoMeta({ title: "Privacy policy" });
</script>
<template><LegalPage v-bind="legal.privacy" /></template>
