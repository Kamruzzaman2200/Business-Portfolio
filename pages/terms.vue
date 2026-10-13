<script setup lang="ts">
import { legal } from "~/content/site";
useSeoMeta({ title: "Terms & conditions" });
</script>
<template><LegalPage v-bind="legal.terms" /></template>
