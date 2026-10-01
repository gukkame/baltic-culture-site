<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'

export interface HeroSlide {
  src: string
  alt?: string
}

const props = defineProps<{
  images: HeroSlide[]
}>()

const SLIDE_INTERVAL_MS = 4500

const maskId = useId()
const current = ref(0)
// Only the current and the next image are downloaded.
const fetched = ref(new Set<number>())
let timer: ReturnType<typeof setInterval> | undefined

const currentAlt = computed(() => props.images[current.value]?.alt)

function start() {
  clearInterval(timer)
  current.value = 0
  fetched.value = new Set([0, 1])
  if (props.images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    const count = props.images.length
    current.value = (current.value + 1) % count
    fetched.value.add((current.value + 1) % count)
  }, SLIDE_INTERVAL_MS)
}

watch(() => props.images.map((image) => image.src).join('|'), start, { immediate: true })
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <svg
    class="pointer-events-none absolute right-0 top-0 aspect-[942/542] w-[38%] drop-shadow-hero sm:w-[35%] lg:w-1/2"
    viewBox="0 0 942 542"
    :aria-hidden="currentAlt ? undefined : true"
    :role="currentAlt ? 'img' : undefined"
    :aria-label="currentAlt"
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
    <g :clip-path="`url(#${maskId})`">
      <image
        v-for="(image, index) in images"
        :key="image.src"
        :href="fetched.has(index) ? image.src : undefined"
        width="942"
        height="542"
        preserveAspectRatio="xMidYMid slice"
        class="transition-opacity duration-1000 ease-in-out"
        :class="index === current ? 'opacity-100' : 'opacity-0'"
      />
    </g>
  </svg>
</template>
