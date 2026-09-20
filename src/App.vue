<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useLocale } from './composables/useLocale'

const { locale, toggleLocale } = useLocale()
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-parchment-dark bg-parchment/80">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="font-serif text-xl font-semibold text-ink">
          Baltic Folk Culture
        </RouterLink>
        <nav aria-label="Primary" class="flex items-center gap-4">
          <RouterLink to="/quiz" class="text-ink hover:text-terracotta">Quiz</RouterLink>
          <RouterLink to="/collection" class="text-ink hover:text-terracotta">
            Collection
          </RouterLink>
          <button
            type="button"
            class="rounded-full border border-forest px-3 py-1 text-sm font-medium text-forest-dark hover:bg-forest hover:text-white"
            :aria-label="locale === 'lv' ? 'Switch language to Lithuanian' : 'Switch language to Latvian'"
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
      Baltic Folk Culture — placeholder content
    </footer>
  </div>
</template>
