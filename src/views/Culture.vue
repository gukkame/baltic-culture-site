<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { contentByCountry, isCountry } from '../data'
import FolkEmblem from '../components/FolkEmblem.vue'
import CornerSprig from '../components/CornerSprig.vue'
import ItemCardMedia from '../components/ItemCardMedia.vue'

const props = defineProps<{
  country: string
}>()

const { locale, t } = useLocale()

const validCountry = computed(() => (isCountry(props.country) ? props.country : undefined))
const items = computed(() => (validCountry.value ? contentByCountry[validCountry.value] : []))

type Filter = 'all' | 'dance' | 'song'
const activeFilter = ref<Filter>('all')

// Hide a category filter when the country has nothing in it (e.g. Latvia has no songs yet).
const hasDances = computed(() => items.value.some((item) => item.category === 'dance'))
const hasSongs = computed(() => items.value.some((item) => item.category === 'song'))

// "All" only means something when there are two categories to tell apart.
const showAll = computed(() => hasDances.value && hasSongs.value)

// The component is reused across countries, so don't keep a filter the new country lacks.
watch(validCountry, () => {
  activeFilter.value = 'all'
})

// With a single category left, that category is the (only) active filter.
const currentFilter = computed<Filter>(() => {
  if (showAll.value) return activeFilter.value
  return hasDances.value ? 'dance' : hasSongs.value ? 'song' : 'all'
})

const filteredItems = computed(() => {
  if (currentFilter.value === 'all') return items.value
  return items.value.filter((item) => item.category === currentFilter.value)
})

// Card currently hovered/focused; only that card plays its video preview.
const previewId = ref<string>()

const heroImage = computed(() =>
  validCountry.value ? `/images/hero/${validCountry.value}.svg` : '',
)
</script>

<template>
  <section v-if="!validCountry" class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="font-serif text-3xl text-ink">{{ t('culture.notFoundTitle') }}</h1>
    <p class="mt-2 text-ink-light">{{ t('culture.notFoundBody') }}</p>
    <RouterLink
      to="/"
      class="mt-6 inline-block text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
    >
      {{ t('culture.backHome') }}
    </RouterLink>
  </section>

  <section v-else class="relative">
    <!-- Shared clip-path definition for the masked hero image, scales via objectBoundingBox -->
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <defs>
        <clipPath id="cultureHeroMask" clipPathUnits="objectBoundingBox">
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
    </svg>

    <!-- Header row: the hero image is absolutely positioned, pinned to the page's top-right
         corner at every breakpoint, just narrower on small screens. The text column reserves
         matching min-height (via aspect-ratio math) so later content never collides with the
         floated-out image, and shares the exact same horizontal padding as the card grid
         below it. Capped at max-w so the image stays sane on very wide monitors. -->
    <div class="relative mx-auto max-w-[1800px]">
      <div
        class="absolute right-0 top-0 aspect-[942/542] w-[38%] overflow-hidden drop-shadow-[0_8px_20px_rgba(50,35,20,0.14)] [clip-path:url(#cultureHeroMask)] sm:w-[35%] lg:w-1/2"
      >
        <img :src="heroImage" alt="" class="h-full w-full object-cover" />
      </div>

      <div
        class="mx-auto min-h-[clamp(140px,22vw,220px)] max-w-6xl px-4 pb-2 pt-10 sm:min-h-[clamp(180px,20vw,260px)] sm:px-6 sm:pt-16 lg:min-h-[clamp(320px,29vw,520px)] lg:px-8"
      >
        <div class="max-w-[60%] sm:max-w-[60%] lg:max-w-md">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-1 text-sm text-ink-light underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark hover:underline"
          >
            ← {{ t('culture.backHome') }}
          </RouterLink>

          <div class="mt-4 flex items-center gap-2 text-ink">
            <FolkEmblem :size="20" />
            <span class="font-medium">{{ t(`common.${validCountry}`) }}</span>
          </div>

          <h1 class="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
            {{ t(`culture.pages.${validCountry}.headline`) }}
          </h1>
          <p class="mt-4 max-w-md text-sm text-ink-light sm:text-base">
            {{ t(`culture.pages.${validCountry}.description`) }}
          </p>
        </div>
      </div>
    </div>

    <CornerSprig class="pointer-events-none absolute bottom-4 right-4 hidden opacity-70 sm:block" />

    <div class="mx-auto mt-8 max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
      <div role="group" :aria-label="t('culture.filters.all')" class="flex flex-wrap gap-2">
        <button
          v-if="showAll"
          type="button"
          :aria-pressed="currentFilter === 'all'"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150"
          :class="
            currentFilter === 'all'
              ? 'bg-ink text-parchment hover:bg-ink-light'
              : 'bg-parchment-dark text-ink-light hover:bg-parchment-darker hover:text-ink'
          "
          @click="activeFilter = 'all'"
        >
          {{ t('culture.filters.all') }}
        </button>
        <button
          v-if="hasDances"
          type="button"
          :aria-pressed="currentFilter === 'dance'"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150"
          :class="
            currentFilter === 'dance'
              ? 'bg-ink text-parchment hover:bg-ink-light'
              : 'bg-parchment-dark text-ink-light hover:bg-parchment-darker hover:text-ink'
          "
          @click="activeFilter = 'dance'"
        >
          {{ t('culture.dances') }}
        </button>
        <button
          v-if="hasSongs"
          type="button"
          :aria-pressed="currentFilter === 'song'"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150"
          :class="
            currentFilter === 'song'
              ? 'bg-ink text-parchment hover:bg-ink-light'
              : 'bg-parchment-dark text-ink-light hover:bg-parchment-darker hover:text-ink'
          "
          @click="activeFilter = 'song'"
        >
          {{ t('culture.songs') }}
        </button>
      </div>

      <ul class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in filteredItems" :key="item.id">
          <RouterLink
            :to="`/${validCountry}/${item.id}`"
            class="group flex h-full flex-col overflow-hidden rounded-2xl bg-parchment-light shadow-paper ring-1 ring-parchment-dark transition duration-300 ease-out hover:-translate-y-1.5 hover:bg-parchment hover:shadow-paper-hover hover:ring-terracotta/30 focus-visible:-translate-y-1.5 focus-visible:shadow-paper-hover"
            @mouseenter="previewId = item.id"
            @mouseleave="previewId = undefined"
            @focus="previewId = item.id"
            @blur="previewId = undefined"
          >
            <ItemCardMedia :item="item" :active="previewId === item.id" />
            <div class="flex flex-1 flex-col gap-1 p-4">
              <h3 class="font-serif text-lg text-ink transition-colors duration-200 group-hover:text-terracotta-dark group-focus-visible:text-terracotta-dark">{{ item.title[locale] }}</h3>
              <p class="text-xs text-ink-light">
                {{ t(`item.category.${item.category}`) }} · {{ t(`common.${validCountry}`) }}
              </p>
              <p class="mt-1 text-sm text-ink-light">{{ item.tagline[locale] }}</p>
              <span
                class="mt-auto pt-3 text-lg text-ink transition group-hover:translate-x-2 group-hover:text-terracotta-dark group-focus-visible:translate-x-2 group-focus-visible:text-terracotta-dark"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
