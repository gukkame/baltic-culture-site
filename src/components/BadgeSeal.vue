<script setup lang="ts">
import type { QuizCountry } from '../types/content'
import FolkEmblem from './FolkEmblem.vue'

withDefaults(
  defineProps<{
    country: QuizCountry
    label: string
    size?: number
  }>(),
  { size: 48 },
)

const tone: Record<QuizCountry, string> = {
  latvia: 'text-terracotta',
  lithuania: 'text-forest-dark',
  both: 'text-indigo',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    role="img"
    :aria-label="label"
    :class="tone[country]"
    class="drop-shadow-seal"
  >
    <circle cx="24" cy="24" r="22" fill="currentColor" />
    <circle cx="24" cy="24" r="18.5" fill="none" stroke-width="1.5" class="stroke-gold-light" stroke-dasharray="2 3" />
    <FolkEmblem x="12" y="12" class="text-parchment-light" />
  </svg>
</template>
