<script setup lang="ts">
defineProps<{
  country: string
}>()
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="font-serif text-3xl text-ink">Culture: {{ country }}</h1>
  </section>
</template>
