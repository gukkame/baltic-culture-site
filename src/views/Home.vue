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
        class="group block rounded-lg border border-parchment-dark bg-parchment-light/60 p-6 shadow-paper transition duration-200 hover:border-terracotta hover:bg-parchment-light hover:shadow-paper-hover"
      >
        <h3 class="font-serif text-xl text-ink">{{ t('common.latvia') }}</h3>
        <p class="mt-2 text-sm text-ink-light">{{ t('home.latviaDesc') }}</p>
        <span
          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-terracotta-dark transition-transform duration-200 group-hover:translate-x-1"
        >
          {{ t('home.explore') }} →
        </span>
      </RouterLink>

      <RouterLink
        to="/culture/lithuania"
        class="group block rounded-lg border border-parchment-dark bg-parchment-light/60 p-6 shadow-paper transition duration-200 hover:border-terracotta hover:bg-parchment-light hover:shadow-paper-hover"
      >
        <h3 class="font-serif text-xl text-ink">{{ t('common.lithuania') }}</h3>
        <p class="mt-2 text-sm text-ink-light">{{ t('home.lithuaniaDesc') }}</p>
        <span
          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-terracotta-dark transition-transform duration-200 group-hover:translate-x-1"
        >
          {{ t('home.explore') }} →
        </span>
      </RouterLink>
    </div>
  </section>
</template>
