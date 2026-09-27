<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useLocale } from './composables/useLocale'
import { aboutPaths } from './router/paths'

const { locale, t } = useLocale()
const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.name === 'home')

function focusMain() {
  document.getElementById('main-content')?.focus()
}

// Keep the page language, title and description (index.html starts them in Latvian) in the chosen language.
watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t('site.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('site.description'))
})

// The About page's address is language specific, so keep it in step when the language changes.
watch(locale, (value) => {
  if (route.name === 'about' && route.path !== aboutPaths[value]) router.replace(aboutPaths[value])
})
</script>

<template>
  <a
    class="absolute -left-[9999px] top-0 z-100 rounded-br-lg bg-forest-dark px-5 py-3 text-white focus:left-0"
    href="#main-content"
    @click.prevent="focusMain"
  >{{ t('nav.skipToContent') }}</a>
  <div class="flex min-h-screen flex-col">
    <main id="main-content" tabindex="-1" class="flex-1">
      <RouterView />
    </main>

    <footer v-if="!isHome" class="border-t border-parchment-dark py-6 text-center text-sm text-ink-light">
      {{ t('site.title') }} — placeholder content ·
      <RouterLink :to="aboutPaths[locale]" class="underline underline-offset-4 hover:text-terracotta-dark">{{ t('about.footerLink') }}</RouterLink>
    </footer>
  </div>
</template>
