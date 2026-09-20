<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="font-serif text-4xl text-ink">{{ t('site.title') }}</h1>

    <h2 class="mt-12 font-serif text-2xl text-ink">{{ t('home.pickCulture') }}</h2>
    <div class="mt-4 grid gap-6 sm:grid-cols-2">
      <RouterLink
        to="/culture/latvia"
        class="block rounded-lg border border-parchment-dark bg-white/40 p-6 transition hover:border-terracotta hover:shadow-md"
      >
        <h3 class="font-serif text-xl text-ink">{{ t('common.latvia') }}</h3>
        <p class="mt-2 text-sm text-ink-light">{{ t('home.latviaDesc') }}</p>
        <span class="mt-4 inline-block text-sm font-medium text-terracotta-dark">
          {{ t('home.explore') }} →
        </span>
      </RouterLink>

      <RouterLink
        to="/culture/lithuania"
        class="block rounded-lg border border-parchment-dark bg-white/40 p-6 transition hover:border-terracotta hover:shadow-md"
      >
        <h3 class="font-serif text-xl text-ink">{{ t('common.lithuania') }}</h3>
        <p class="mt-2 text-sm text-ink-light">{{ t('home.lithuaniaDesc') }}</p>
        <span class="mt-4 inline-block text-sm font-medium text-terracotta-dark">
          {{ t('home.explore') }} →
        </span>
      </RouterLink>
    </div>
  </section>
</template>
