<script setup lang="ts">
import type { Country } from '../data'

defineProps<{
  country: Country
}>()

// The symbol files are dark red; drawing them through a mask lets them take the surrounding
// text colour (cream on the home hero, ink on the country pages). Full class names so Tailwind finds them.
const masks: Record<Country, string> = {
  latvia: 'mask-[url(/images/symbols/auseklis.svg)]',
  lithuania: 'mask-[url(/images/symbols/lt/rozele.svg)]',
}
</script>

<template>
  <span class="inline-block shrink-0 bg-current mask-contain mask-center mask-no-repeat" :class="masks[country]" aria-hidden="true" />
</template>
