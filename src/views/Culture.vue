<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { contentByCountry, isCountry } from '../data'

const props = defineProps<{
  country: string
}>()

const { locale, t } = useLocale()

const validCountry = computed(() => (isCountry(props.country) ? props.country : undefined))
const items = computed(() => (validCountry.value ? contentByCountry[validCountry.value] : []))
const dances = computed(() => items.value.filter((item) => item.category === 'dance'))
const songs = computed(() => items.value.filter((item) => item.category === 'song'))
</script>

<template>
  <section v-if="!validCountry" class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="font-serif text-3xl text-ink">{{ t('culture.notFoundTitle') }}</h1>
    <p class="mt-2 text-ink-light">{{ t('culture.notFoundBody') }}</p>
    <RouterLink to="/" class="mt-6 inline-block text-terracotta-dark hover:underline">
      {{ t('culture.backHome') }}
    </RouterLink>
  </section>

  <section v-else class="mx-auto max-w-5xl px-4 py-12">
    <RouterLink to="/" class="text-sm text-terracotta-dark hover:underline">
      ← {{ t('culture.backHome') }}
    </RouterLink>
    <h1 class="mt-2 font-serif text-4xl text-ink">{{ t(`common.${validCountry}`) }}</h1>

    <section aria-labelledby="dances-heading" class="mt-10">
      <h2 id="dances-heading" class="font-serif text-2xl text-ink">{{ t('culture.dances') }}</h2>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in dances" :key="item.id">
          <RouterLink
            :to="`/culture/${validCountry}/${item.id}`"
            class="block h-full rounded-lg border border-parchment-dark bg-white/40 p-4 transition hover:border-terracotta hover:shadow-md"
          >
            <h3 class="font-serif text-lg text-ink">{{ item.title[locale] }}</h3>
            <p class="mt-1 text-sm text-ink-light">{{ item.tagline[locale] }}</p>
            <span class="mt-3 inline-block rounded-full bg-parchment-dark px-2 py-0.5 text-xs text-ink-light">
              {{ t(`culture.difficulty.${item.difficulty}`) }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <section aria-labelledby="songs-heading" class="mt-10">
      <h2 id="songs-heading" class="font-serif text-2xl text-ink">{{ t('culture.songs') }}</h2>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in songs" :key="item.id">
          <RouterLink
            :to="`/culture/${validCountry}/${item.id}`"
            class="block h-full rounded-lg border border-parchment-dark bg-white/40 p-4 transition hover:border-terracotta hover:shadow-md"
          >
            <h3 class="font-serif text-lg text-ink">{{ item.title[locale] }}</h3>
            <p class="mt-1 text-sm text-ink-light">{{ item.tagline[locale] }}</p>
            <span class="mt-3 inline-block rounded-full bg-parchment-dark px-2 py-0.5 text-xs text-ink-light">
              {{ t(`culture.difficulty.${item.difficulty}`) }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </section>
</template>
