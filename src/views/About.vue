<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { contentByCountry, type Country } from '../data'
import { galleryByCountry, latvianSymbolCredits, lithuanianSymbols } from '../data/credits'
import { publicUrl } from '../publicUrl'

const { locale, t } = useLocale()

const symbolGroups = computed(() => [
  { title: t('about.latvianSymbols'), intro: '', credits: latvianSymbolCredits },
  { title: t('about.lithuanianSymbols'), intro: t('about.lithuanianSymbolsIntro'), credits: lithuanianSymbols },
])

const countries: Country[] = ['latvia', 'lithuania']

// Country page photos, listed only once some have been added.
const galleryGroups = computed(() =>
  countries
    // Only photos from elsewhere need crediting; the project's own photos carry no license.
    .map((country) => ({
      title: t(`common.${country}`),
      intro: '',
      credits: galleryByCountry[country].filter((photo) => photo.license),
    }))
    .filter((group) => group.credits.length),
)

const imageSections = computed(() =>
  [
    { id: 'about-symbols', title: t('about.symbolsTitle'), intro: t('about.symbolsIntro'), groups: symbolGroups.value },
    { id: 'about-gallery', title: t('about.galleryTitle'), intro: t('about.galleryIntro'), groups: galleryGroups.value },
  ].filter((section) => section.groups.length),
)

// Text sources are the non-YouTube source pages (the YouTube ones are covered by the video list).
const textSources = computed(() =>
  countries.flatMap((country) =>
    contentByCountry[country]
      .filter((item) => item.sourceUrl && !item.sourceUrl.includes('youtube.com'))
      .map((item) => ({ id: item.id, title: item.title[locale.value], url: item.sourceUrl! })),
  ),
)

const videoGroups = computed(() =>
  countries.map((country) => ({
    country,
    items: contentByCountry[country]
      .filter((item) => item.videoUrl)
      .map((item) => ({ id: item.id, title: item.title[locale.value], url: item.videoUrl })),
  })),
)

const PROJECT_PAGE_URL = 'https://latlit.eu/theprojects/culturelink/'
const PROJECT_SOURCE_URL =
  'https://www.livani.lv/lv/projekts/livanu-novada-pasvaldiba-isteno-eiropas-regionalas-attistibas-fonda-erdf-projektu-culturelink'

const projectFacts = computed(() => [
  { label: t('about.project.programme'), value: t('about.project.programmeValue') },
  { label: t('about.project.code'), value: 'LL-00210' },
  { label: t('about.project.leadPartner'), value: t('about.project.leadPartnerValue') },
  { label: t('about.project.partner'), value: t('about.project.partnerValue') },
  { label: t('about.project.duration'), value: t('about.project.durationValue') },
  { label: t('about.project.budget'), value: t('about.project.budgetValue') },
])

const linkClass =
  'text-terracotta-dark underline underline-offset-4 transition-colors duration-150 hover:text-terracotta'
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-12">
    <RouterLink
      to="/"
      class="text-sm text-ink-light underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark hover:underline"
    >
      ← {{ t('culture.backHome') }}
    </RouterLink>

    <h1 class="mt-4 font-serif text-3xl text-ink sm:text-4xl">{{ t('about.title') }}</h1>
    <p class="mt-3 max-w-2xl text-ink-light">{{ t('about.intro') }}</p>

    <div class="mt-6 w-[280px] max-w-full overflow-hidden rounded-xl bg-white p-2 shadow-sm sm:w-80">
      <img
        :src="publicUrl('/images/partners/interreg-latvia-lithuania.jpg')"
        alt="Interreg Latvija–Lietuva. Līdzfinansē Eiropas Savienība."
        lang="lv"
        width="400"
        height="121"
        decoding="async"
        class="block h-auto w-full"
      />
    </div>

    <section class="mt-12 rounded-2xl bg-parchment-light p-6 shadow-paper ring-1 ring-parchment-dark sm:p-8" aria-labelledby="about-project">
      <h2 id="about-project" class="font-serif text-2xl text-ink">{{ t('about.project.title') }}</h2>
      <p class="mt-2 font-serif text-lg italic text-ink">{{ t('about.project.name') }}</p>
      <p class="mt-4 text-ink-light">{{ t('about.project.goal') }}</p>
      <p class="mt-3 text-ink-light">{{ t('about.project.challenge') }}</p>
      <p class="mt-3 text-ink-light">{{ t('about.project.activities') }}</p>

      <dl class="mt-6 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[max-content_1fr]">
        <template v-for="fact in projectFacts" :key="fact.label">
          <dt class="font-medium text-ink">{{ fact.label }}</dt>
          <dd class="text-ink-light">{{ fact.value }}</dd>
        </template>
      </dl>

      <p class="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <a :href="PROJECT_PAGE_URL" target="_blank" rel="noopener" :class="linkClass">{{ t('about.project.moreInfo') }}</a>
        <span class="text-ink-light">
          {{ t('about.project.source') }}:
          <a :href="PROJECT_SOURCE_URL" target="_blank" rel="noopener" :class="linkClass">livani.lv</a>
        </span>
      </p>

      <p class="mt-6 border-t border-parchment-dark pt-4 text-xs text-ink-light">{{ t('about.project.disclaimer') }}</p>
    </section>

    <section v-for="section in imageSections" :key="section.id" class="mt-12" :aria-labelledby="section.id">
      <h2 :id="section.id" class="font-serif text-2xl text-ink">{{ section.title }}</h2>
      <p v-if="section.intro" class="mt-2 max-w-2xl text-ink-light">{{ section.intro }}</p>

      <div v-for="group in section.groups" :key="group.title" class="mt-8">
        <h3 class="font-serif text-xl text-ink">{{ group.title }}</h3>
        <p v-if="group.intro" class="mt-2 max-w-2xl text-sm text-ink-light">{{ group.intro }}</p>
        <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="credit in group.credits"
            :key="credit.src"
            class="flex gap-4 rounded-2xl bg-parchment-light p-4 shadow-paper ring-1 ring-parchment-dark"
          >
            <img :src="credit.src" alt="" class="h-16 w-16 shrink-0 object-contain" loading="lazy" />
            <div class="min-w-0 text-sm">
              <p v-if="credit.title" class="font-medium text-ink">{{ credit.title[locale] }}</p>
              <p v-if="credit.description" class="mt-1 text-ink-light">{{ credit.description[locale] }}</p>
              <p v-if="credit.author" class="mt-1 text-ink-light">{{ t('about.author') }}: {{ credit.author }}</p>
              <p class="mt-1 flex flex-wrap gap-x-3">
                <a v-if="credit.license" :href="credit.license.url" target="_blank" rel="noopener" :class="linkClass">{{ credit.license.name }}</a>
                <a v-if="credit.sourceUrl" :href="credit.sourceUrl" target="_blank" rel="noopener" :class="linkClass">{{ t('about.source') }}</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="mt-12" aria-labelledby="about-texts">
      <h2 id="about-texts" class="font-serif text-2xl text-ink">{{ t('about.textsTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-ink-light">{{ t('about.textsIntro') }}</p>
      <ul class="mt-4 space-y-1 text-sm">
        <li v-for="source in textSources" :key="source.id">
          <a :href="source.url" target="_blank" rel="noopener" :class="linkClass">{{ source.title }}</a>
        </li>
      </ul>
    </section>

    <section class="mt-12" aria-labelledby="about-videos">
      <h2 id="about-videos" class="font-serif text-2xl text-ink">{{ t('about.videosTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-ink-light">{{ t('about.videosIntro') }}</p>
      <div class="mt-4 grid gap-8 sm:grid-cols-2">
        <div v-for="group in videoGroups" :key="group.country">
          <h3 class="font-serif text-xl text-ink">{{ t(`common.${group.country}`) }}</h3>
          <ul class="mt-3 space-y-1 text-sm">
            <li v-for="video in group.items" :key="video.id">
              <a :href="video.url" target="_blank" rel="noopener" :class="linkClass">{{ video.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
</template>
