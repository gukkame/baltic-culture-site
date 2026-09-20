<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { findItem, youtubeEmbedUrl } from '../data'

const props = defineProps<{
  country: string
  itemId: string
}>()

const { locale, t } = useLocale()

const item = computed(() => findItem(props.country, props.itemId))
</script>

<template>
  <section v-if="!item" class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="font-serif text-3xl text-ink">{{ t('item.notFoundTitle') }}</h1>
    <p class="mt-2 text-ink-light">{{ t('item.notFoundBody') }}</p>
    <RouterLink
      :to="`/culture/${country}`"
      class="mt-6 inline-block text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
    >
      ← {{ t('item.backToCulture') }}
    </RouterLink>
  </section>

  <article v-else class="mx-auto max-w-3xl px-4 py-12">
    <RouterLink
      :to="`/culture/${country}`"
      class="text-sm text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
    >
      ← {{ t('item.backToCulture') }}
    </RouterLink>

    <span class="mt-4 inline-block rounded-full bg-parchment-dark px-3 py-1 text-xs text-ink-light">
      {{ t(`item.category.${item.category}`) }} · {{ t(`culture.difficulty.${item.difficulty}`) }}
    </span>

    <h1 class="mt-3 font-serif text-4xl text-ink">{{ item.title[locale] }}</h1>
    <p class="mt-2 text-lg text-ink-light">{{ item.tagline[locale] }}</p>

    <img
      :src="`/${item.image}`"
      :alt="item.imageAlt[locale]"
      class="mt-6 aspect-video w-full rounded-lg border border-parchment-dark object-cover"
      loading="lazy"
    />

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
  </article>
</template>
