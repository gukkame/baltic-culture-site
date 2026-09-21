<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { findItem, findNextItem, youtubeEmbedUrl } from '../data'

const props = defineProps<{
  country: string
  itemId: string
}>()

const { locale, t } = useLocale()

const item = computed(() => findItem(props.country, props.itemId))
const nextItem = computed(() => findNextItem(props.country, props.itemId))
</script>

<template>
  <section v-if="!item" class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="font-serif text-3xl text-ink">{{ t('item.notFoundTitle') }}</h1>
    <p class="mt-2 text-ink-light">{{ t('item.notFoundBody') }}</p>
    <RouterLink
      :to="`/${country}`"
      class="mt-6 inline-block text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
    >
      ← {{ t('item.backToCulture') }}
    </RouterLink>
  </section>

  <article v-else class="mx-auto max-w-3xl px-4 py-12">
    <RouterLink
      :to="`/${country}`"
      class="text-sm text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
    >
      ← {{ t('item.backToCulture') }}
    </RouterLink>

    <span class="mt-4 ml-2 inline-block rounded-full bg-parchment-dark px-3 py-1 text-xs text-ink-light">
      {{ t(`item.category.${item.category}`) }} · {{ t(`culture.difficulty.${item.difficulty}`) }}
    </span>

    <h1 class="mt-3 font-serif text-4xl text-ink">{{ item.title[locale] }}</h1>
    <p class="mt-2 text-lg text-ink-light">{{ item.tagline[locale] }}</p>

    <p class="mt-6 whitespace-pre-line leading-relaxed text-ink">{{ item.description[locale] }}</p>

    <div v-if="item.videoUrl" class="mt-8">
      <h2 class="font-serif text-xl text-ink">{{ t('item.watchVideo') }}</h2>
      <div class="mt-3 aspect-video w-full overflow-hidden rounded-lg border border-parchment-dark">
        <iframe
          :src="youtubeEmbedUrl(item.videoUrl)"
          :title="item.title[locale]"
          class="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </div>

    <section class="mt-10 rounded-2xl bg-parchment-light p-5 shadow-paper ring-1 ring-parchment-dark sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <h2 class="font-serif text-xl text-ink">{{ t('item.testTitle') }}</h2>
        <p class="mt-1 text-sm text-ink-light">{{ t('item.testText') }}</p>
      </div>
      <RouterLink
        to="/viktorina"
        class="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-parchment transition-colors duration-150 hover:bg-terracotta-dark sm:mt-0"
      >
        {{ t('item.testButton') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </section>

    <nav
      v-if="nextItem"
      :aria-label="t(`item.next.${item.category}`)"
      class="mt-12 border-t border-parchment-dark pt-6"
    >
      <RouterLink
        :to="`/${country}/${nextItem.id}`"
        class="group flex items-center justify-between gap-4 rounded-2xl bg-parchment-light p-4 shadow-paper ring-1 ring-parchment-dark transition duration-300 ease-out hover:-translate-y-1 hover:bg-parchment hover:shadow-paper-hover hover:ring-terracotta/30"
      >
        <span class="min-w-0">
          <span class="block text-xs text-ink-light">{{ t(`item.next.${item.category}`) }}</span>
          <span class="mt-1 block truncate font-serif text-lg text-ink">{{ nextItem.title[locale] }}</span>
        </span>
        <span
          class="text-2xl text-ink transition group-hover:translate-x-1 group-hover:text-terracotta-dark"
          aria-hidden="true"
        >
          →
        </span>
      </RouterLink>
    </nav>
  </article>
</template>
