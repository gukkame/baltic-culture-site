<script setup lang="ts">
import type { QuizCountry } from '../types/content'

withDefaults(
  defineProps<{
    country: QuizCountry
    label: string
    size?: number
  }>(),
  { size: 48 },
)

// Latvia: brick red, Lithuania: forest green, both: indigo.
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
    class="drop-shadow-[0_2px_4px_rgba(50,35,20,0.25)]"
  >
    <circle cx="24" cy="24" r="22" fill="currentColor" />
    <circle cx="24" cy="24" r="18.5" fill="none" stroke="#e9c786" stroke-width="1.5" stroke-dasharray="2 3" />
    <g transform="translate(12 12)">
      <path
        d="M12 1 L13.8 9 L21.5 6.2 L15.6 12 L21.5 17.8 L13.8 15 L12 23 L10.2 15 L2.5 17.8 L8.4 12 L2.5 6.2 L10.2 9 Z"
        fill="#f8f1e5"
      />
    </g>
  </svg>
</template>
