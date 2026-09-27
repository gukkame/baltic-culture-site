<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useLocale } from './composables/useLocale'
import { aboutPaths, countryFromSlug, countrySymbols } from './router/paths'

const { locale, t } = useLocale()
const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.name === 'home')

// On a country's pages (the country page and its dances and songs) the footer carries that country's folk sign.
const footerSymbol = computed(() => {
  const country = typeof route.params.country === 'string' ? countryFromSlug(route.params.country) : undefined
  return country ? countrySymbols[country] : undefined
})

function focusMain() {
  document.getElementById('main-content')?.focus()
}

// Keep the page language, title, description and tab icon (index.html starts them in Latvian) in the chosen language.
watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t('site.title')
  document.querySelector('link[rel="icon"]')?.setAttribute('href', `/favicon-${locale.value}.svg`)
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

    <footer v-if="!isHome" class="relative border-t border-parchment-dark px-4 py-6 text-center text-sm text-ink-light sm:px-20">
      {{ t('site.title') }} — placeholder content ·
      <RouterLink :to="aboutPaths[locale]" class="underline underline-offset-4 hover:text-terracotta-dark">{{ t('about.footerLink') }}</RouterLink>
      <img
        v-if="footerSymbol"
        :src="footerSymbol"
        alt=""
        class="pointer-events-none absolute right-6 top-1/2 hidden size-12 -translate-y-1/2 opacity-70 sm:block"
      />
    </footer>
  </div>
</template>
