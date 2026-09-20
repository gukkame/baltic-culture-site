<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
  }>(),
  { size: 24 },
)
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 1 L13.8 9 L21.5 6.2 L15.6 12 L21.5 17.8 L13.8 15 L12 23 L10.2 15 L2.5 17.8 L8.4 12 L2.5 6.2 L10.2 9 Z"
      fill="currentColor"
    />
  </svg>
</template>
