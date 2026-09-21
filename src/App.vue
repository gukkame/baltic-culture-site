<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useLocale } from './composables/useLocale'

const { locale, t } = useLocale()
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
    <main id="main-content" tabindex="-1" class="flex-1">
      <RouterView />
    </main>

    <footer v-if="!isHome" class="border-t border-parchment-dark py-6 text-center text-sm text-ink-light">
      {{ t('site.title') }} — placeholder content
    </footer>
  </div>
</template>
