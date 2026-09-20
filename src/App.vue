<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useLocale } from './composables/useLocale'

const { locale, toggleLocale, t } = useLocale()

watchEffect(() => {
  document.documentElement.lang = locale.value
})
</script>

<template>
  <a class="skip-link" href="#main-content">{{ t('nav.skipToContent') }}</a>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-parchment-dark bg-parchment/80">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="font-serif text-xl font-semibold text-ink">
          {{ t('site.title') }}
        </RouterLink>
        <nav aria-label="Primary" class="flex items-center gap-4">
          <RouterLink to="/quiz" class="text-ink hover:text-terracotta">
            {{ t('nav.quiz') }}
          </RouterLink>
          <RouterLink to="/collection" class="text-ink hover:text-terracotta">
            {{ t('nav.collection') }}
          </RouterLink>
          <button
            type="button"
            class="rounded-full border border-forest px-3 py-1 text-sm font-medium text-forest-dark hover:bg-forest hover:text-white"
            :aria-label="t('nav.localeToggle')"
            @click="toggleLocale"
          >
            {{ locale === 'lv' ? 'LV' : 'LT' }}
          </button>
        </nav>
      </div>
    </header>

    <main id="main-content" class="flex-1">
      <RouterView />
    </main>

    <footer class="border-t border-parchment-dark py-6 text-center text-sm text-ink-light">
      {{ t('site.title') }} — placeholder content
    </footer>
  </div>
</template>
