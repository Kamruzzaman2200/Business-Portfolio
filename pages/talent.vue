<script setup lang="ts">
import { infoPages } from "~/content/site";
useSeoMeta({ title: "Careers" });
</script>
<template><InfoPage v-bind="infoPages.talent" /></template>
