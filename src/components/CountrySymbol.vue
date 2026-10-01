<script setup lang="ts">
import { computed } from 'vue'
import type { Country } from '../data'
import { publicUrl } from '../publicUrl'

const props = defineProps<{
  country: Country
}>()

const files: Record<Country, string> = {
  latvia: '/images/symbols/auseklis.svg',
  lithuania: '/images/symbols/rozele.svg',
}

// Drawn as a mask so it takes the text colour; the URL is a CSS variable so it can include the base path.
const symbol = computed(() => ({ '--symbol': `url("${publicUrl(files[props.country])}")` }))
</script>

<template>
  <span
    class="inline-block shrink-0 bg-current mask-(--symbol) mask-contain mask-center mask-no-repeat"
    :style="symbol"
    aria-hidden="true"
  />
</template>
