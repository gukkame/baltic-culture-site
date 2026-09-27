<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ src: string; alt?: string }>()
const maskId = useId()
</script>

<template>
  <svg
    class="pointer-events-none absolute right-0 top-0 aspect-[942/542] w-[38%] drop-shadow-[0_8px_20px_rgba(50,35,20,0.14)] sm:w-[35%] lg:w-1/2"
    viewBox="0 0 942 542"
    :aria-hidden="alt ? undefined : true"
    :role="alt ? 'img' : undefined"
    :aria-label="alt"
    focusable="false"
  >
    <defs>
      <clipPath :id="maskId" clipPathUnits="objectBoundingBox">
        <path
          d="M0.002169 0
             L1 0
             L1 0.938664
             C0.932540 0.857201 0.892814 0.909042 0.841544 0.938664
             C0.772082 0.984950 0.675576 1.049749 0.622552 0.938664
             C0.548317 0.772037 0.465069 0.752598 0.309176 0.846094
             C0.140028 0.890528 0.277728 0.508210 0.066690 0.474886
             C-0.059508 0.439708 0.039287 0.223092 0.002169 0.000923 Z"
        />
      </clipPath>
    </defs>
    <image :href="src" width="942" height="542" preserveAspectRatio="xMidYMid slice" :clip-path="`url(#${maskId})`" />
  </svg>
</template>
