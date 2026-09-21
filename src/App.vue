<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useLocale } from './composables/useLocale'

const { locale, toggleLocale, t } = useLocale()
const route = useRoute()
const isHome = computed(() => route.name === 'home')

function focusMain() {
  document.getElementById('main-content')?.focus()
}

watchEffect(() => {
  document.documentElement.lang = locale.value
})
</script>

<template>
  <a class="skip-link" href="#main-content" @click.prevent="focusMain">{{ t('nav.skipToContent') }}</a>
  <div class="flex min-h-screen flex-col">
    <header v-if="!route.meta.hideGlobalNav" class="border-b border-parchment-dark bg-parchment/80">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <RouterLink
          to="/"
          class="font-serif text-xl font-semibold text-ink transition-colors duration-150 hover:text-terracotta-dark"
        >
          {{ t('site.title') }}
        </RouterLink>
        <nav aria-label="Primary" class="flex items-center gap-4">
          <RouterLink
            to="/quiz"
            class="text-ink underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark hover:underline"
          >
            {{ t('nav.quiz') }}
          </RouterLink>
          <RouterLink
            to="/collection"
            class="text-ink underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark hover:underline"
          >
            {{ t('nav.collection') }}
          </RouterLink>
          <button
            type="button"
            class="rounded-full border border-forest px-3 py-1.5 text-sm font-medium text-forest-dark transition-colors duration-150 hover:bg-forest hover:text-white"
            :aria-label="t('nav.localeToggle')"
            @click="toggleLocale"
          >
            {{ locale === 'lv' ? 'LV' : 'LT' }}
          </button>
        </nav>
      </div>
    </header>

    <main id="main-content" tabindex="-1" class="flex-1">
      <RouterView />
    </main>

    <footer v-if="!isHome" class="border-t border-parchment-dark py-6 text-center text-sm text-ink-light">
      {{ t('site.title') }} — placeholder content
    </footer>
  </div>
</template>
