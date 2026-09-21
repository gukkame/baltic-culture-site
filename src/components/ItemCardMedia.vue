<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { ContentItem } from '../types/content'
import { youtubePreviewUrl, youtubeThumbnailUrl } from '../data'
import FolkEmblem from './FolkEmblem.vue'

const props = defineProps<{
  item: ContentItem
  /** True while the parent card is hovered or focused. */
  active: boolean
}>()

const PREVIEW_DELAY_MS = 400

const thumbnail = computed(() => (props.item.videoUrl ? youtubeThumbnailUrl(props.item.videoUrl) : undefined))
const previewUrl = computed(() => (props.item.videoUrl ? youtubePreviewUrl(props.item.videoUrl) : undefined))

// No video, or its thumbnail can't load: show a plain block instead of a broken image.
const thumbnailFailed = ref(false)
const showThumbnail = computed(() => thumbnail.value && !thumbnailFailed.value)

// Only autoplay where hover exists and the user hasn't asked for reduced motion.
const canPreview =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches

const showVideo = ref(false)
const videoReady = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function stop() {
  clearTimeout(timer)
  showVideo.value = false
  videoReady.value = false
}

watch(
  () => props.active,
  (active) => {
    stop()
    if (active && canPreview && previewUrl.value) {
      // Short delay so sweeping the mouse across the grid doesn't load a video per card.
      timer = setTimeout(() => (showVideo.value = true), PREVIEW_DELAY_MS)
    }
  },
)

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="relative aspect-video w-full overflow-hidden bg-parchment-dark">
    <img
      v-if="showThumbnail"
      :src="thumbnail"
      alt=""
      class="h-full w-full object-cover"
      loading="lazy"
      @error="thumbnailFailed = true"
    />
    <div v-else class="flex h-full w-full items-center justify-center text-ink-light/40">
      <FolkEmblem :size="40" />
    </div>

    <span
      v-if="showThumbnail && !videoReady"
      class="absolute bottom-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-xs text-parchment"
      aria-hidden="true"
    >
      ▶
    </span>

    <iframe
      v-if="showVideo && previewUrl"
      :src="previewUrl"
      title=""
      tabindex="-1"
      aria-hidden="true"
      allow="autoplay; encrypted-media"
      class="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-full min-w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      :class="videoReady ? 'opacity-100' : 'opacity-0'"
      @load="videoReady = true"
    />
  </div>
</template>
