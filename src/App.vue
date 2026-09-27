<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useLocale } from './composables/useLocale'
import { aboutPaths } from './router/paths'
import CountrySymbol from './components/CountrySymbol.vue'
import homeCopy from './components/home/copy.json'

const { locale, t } = useLocale()
const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.name === 'home')

// The footer carries the folk sign of the chosen language's country, whichever page is open.
const footerCountry = computed(() => (locale.value === 'lt' ? 'lithuania' : 'latvia'))
const projectCopy = computed(() => homeCopy[locale.value])

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

    <footer v-if="!isHome" class="border-t border-parchment-dark px-4 py-8 text-ink-light sm:px-6 sm:py-10 lg:px-8">
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-7 md:flex-row md:items-center md:gap-10 lg:gap-16">
        <div class="w-[280px] max-w-full shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm lg:w-80">
          <img
            src="/images/partners/interreg-latvia-lithuania.jpg"
            alt="Interreg Latvija–Lietuva. Līdzfinansē Eiropas Savienība."
            lang="lv"
            width="400"
            height="121"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          />
        </div>
        <div class="flex min-w-0 items-start gap-4 text-ink sm:gap-5">
          <CountrySymbol :country="footerCountry" class="mt-1 size-9 sm:size-12" />
          <div class="max-w-xl">
            <p class="font-serif text-lg leading-snug sm:text-xl">{{ projectCopy.brandTop }}</p>
            <p class="mt-1 text-xs leading-relaxed tracking-wide text-ink-light sm:text-sm">{{ projectCopy.brandBottom }}</p>
            <RouterLink
              :to="aboutPaths[locale]"
              class="mt-3 inline-flex min-h-11 items-center text-sm text-ink-light underline underline-offset-4 transition-colors hover:text-terracotta-dark focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-dark"
            >{{ t('about.footerLink') }}</RouterLink>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>
