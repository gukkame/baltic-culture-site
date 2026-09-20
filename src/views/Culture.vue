<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { contentByCountry, isCountry } from '../data'
import FolkEmblem from '../components/FolkEmblem.vue'
import CornerSprig from '../components/CornerSprig.vue'

const props = defineProps<{
  country: string
}>()

const { locale, t } = useLocale()

const validCountry = computed(() => (isCountry(props.country) ? props.country : undefined))
const items = computed(() => (validCountry.value ? contentByCountry[validCountry.value] : []))

type Filter = 'all' | 'dance' | 'song'
const activeFilter = ref<Filter>('all')

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items.value
  return items.value.filter((item) => item.category === activeFilter.value)
})

const heroImage = computed(() =>
  validCountry.value ? `/images/hero/${validCountry.value}.svg` : '',
)
</script>

<template>
  <section v-if="!validCountry" class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="font-serif text-3xl text-ink">{{ t('culture.notFoundTitle') }}</h1>
    <p class="mt-2 text-ink-light">{{ t('culture.notFoundBody') }}</p>
    <RouterLink to="/" class="mt-6 inline-block text-terracotta-dark hover:underline">
      {{ t('culture.backHome') }}
    </RouterLink>
  </section>

  <section v-else class="relative mx-auto max-w-6xl px-4 py-8 sm:py-12">
    <!-- Shared clip-path definition for the masked hero image, scales via objectBoundingBox -->
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <defs>
        <clipPath id="cultureHeroMask" clipPathUnits="objectBoundingBox">
          <path
            d="M0.002169 0.000923 C0.162467 0.000923 0.998985 0.000000 0.998985 0.000000
               C0.998985 0.000000 0.999472 0.006676 0.998985 0.211255
               C0.998985 0.397601 0.998942 0.698378 0.998985 0.938664
               C0.932540 0.857201 0.892814 0.909042 0.841544 0.938664
               C0.772082 0.984950 0.675576 1.049749 0.622552 0.938664
               C0.548317 0.772037 0.465069 0.752598 0.309176 0.846094
               C0.140028 0.890528 0.277728 0.508210 0.066690 0.474886
               C-0.059508 0.439708 0.039287 0.223092 0.002169 0.000923 Z"
          />
        </clipPath>
      </defs>
    </svg>

    <CornerSprig class="pointer-events-none absolute bottom-4 right-4 hidden opacity-70 sm:block" />

    <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div>
        <RouterLink to="/" class="inline-flex items-center gap-1 text-sm text-ink-light hover:text-terracotta-dark">
          ← {{ t('culture.backHome') }}
        </RouterLink>

        <div class="mt-4 flex items-center gap-2 text-ink">
          <FolkEmblem :size="20" />
          <span class="font-medium">{{ t(`common.${validCountry}`) }}</span>
        </div>

        <h1 class="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {{ t(`culture.pages.${validCountry}.headline`) }}
        </h1>
        <p class="mt-4 max-w-md text-ink-light">
          {{ t(`culture.pages.${validCountry}.description`) }}
        </p>
      </div>

      <div
        class="aspect-[942/542] w-full overflow-hidden rounded-2xl [clip-path:url(#cultureHeroMask)]"
      >
        <img :src="heroImage" alt="" class="h-full w-full object-cover" />
      </div>
    </div>

    <div class="mt-8">
      <div role="group" :aria-label="t('culture.filters.all')" class="flex flex-wrap gap-2">
        <button
          type="button"
          :aria-pressed="activeFilter === 'all'"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="activeFilter === 'all' ? 'bg-ink text-parchment' : 'bg-parchment-dark text-ink-light hover:text-ink'"
          @click="activeFilter = 'all'"
        >
          {{ t('culture.filters.all') }}
        </button>
        <button
          type="button"
          :aria-pressed="activeFilter === 'dance'"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="activeFilter === 'dance' ? 'bg-ink text-parchment' : 'bg-parchment-dark text-ink-light hover:text-ink'"
          @click="activeFilter = 'dance'"
        >
          {{ t('culture.dances') }}
        </button>
        <button
          type="button"
          :aria-pressed="activeFilter === 'song'"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="activeFilter === 'song' ? 'bg-ink text-parchment' : 'bg-parchment-dark text-ink-light hover:text-ink'"
          @click="activeFilter = 'song'"
        >
          {{ t('culture.songs') }}
        </button>
      </div>

      <ul class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in filteredItems" :key="item.id">
          <RouterLink
            :to="`/culture/${validCountry}/${item.id}`"
            class="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-parchment-dark transition hover:shadow-md"
          >
            <img
              :src="`/${item.image}`"
              :alt="item.imageAlt[locale]"
              class="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div class="flex flex-1 flex-col gap-1 p-4">
              <h3 class="font-serif text-lg text-ink">{{ item.title[locale] }}</h3>
              <p class="text-xs text-ink-light">
                {{ t(`item.category.${item.category}`) }} · {{ t(`common.${validCountry}`) }}
              </p>
              <p class="mt-1 text-sm text-ink-light">{{ item.tagline[locale] }}</p>
              <span
                class="mt-auto pt-3 text-lg text-ink transition group-hover:translate-x-1 group-hover:text-terracotta-dark"
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
