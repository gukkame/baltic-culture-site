<script setup lang="ts">
import { computed } from 'vue'
import type { Country } from '../data'
import { publicUrl } from '../publicUrl'

const props = defineProps<{
  country: Country
}>()

const files: Record<Country, string> = {
  latvia: '/images/symbols/auseklis.svg',
  lithuania: '/images/symbols/lt/rozele.svg',
}

// The symbol files are dark red; drawing them through a mask lets them take the surrounding text
// colour (cream on the home hero, ink on the country pages). The image address goes in a CSS
// variable so it can include the site's base path.
const symbol = computed(() => ({ '--symbol': `url("${publicUrl(files[props.country])}")` }))
</script>

<template>
  <span
    class="inline-block shrink-0 bg-current mask-(--symbol) mask-contain mask-center mask-no-repeat"
    :style="symbol"
    aria-hidden="true"
  />
</template>
