<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import CountryMap from '../components/home/CountryMap.vue'
import FolkMark from '../components/home/FolkMark.vue'
import homeCopy from '../components/home/copy.json'
import '../components/home/home.css'

const { locale, setLocale } = useLocale()
const copy = computed(() => homeCopy[locale.value])
const countryMap = ref<HTMLElement>()
const story = ref<HTMLElement>()
const quiz = ref<HTMLElement>()
const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' as const : 'smooth' as const

function goTo(section?: HTMLElement) {
  if (!section) return
  section.focus({ preventScroll: true })
  section.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
}
function toTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() })
}
</script>

<template>
  <div class="folk-home">
    <section class="home-stage" aria-labelledby="home-title">
      <picture>
        <source srcset="/artwork/baltic-table-painted-v1.avif" type="image/avif" />
        <img class="home-art" src="/artwork/baltic-table-painted-v1.webp" alt="" fetchpriority="high" decoding="async" />
      </picture>
      <div class="home-shade" aria-hidden="true" />
      <header class="home-header">
        <RouterLink to="/" class="home-brand" :aria-label="`${copy.brandTop} ${copy.brandBottom}`">
          <FolkMark /><span>{{ copy.brandTop }}<br /><small>{{ copy.brandBottom }}</small></span>
        </RouterLink>
        <nav class="home-nav" :aria-label="copy.navLabel">
          <button @click="goTo(countryMap)">{{ copy.navExplore }}</button>
          <button @click="goTo(quiz)">{{ copy.navQuiz }}</button>
          <button @click="goTo(story)">{{ copy.navAbout }}</button>
        </nav>
        <div class="home-languages" role="group" :aria-label="copy.languageLabel">
          <button :aria-pressed="locale === 'lv'" lang="lv" aria-label="Latviešu" @click="setLocale('lv')">LV</button>
          <span aria-hidden="true">/</span>
          <button :aria-pressed="locale === 'lt'" lang="lt" aria-label="Lietuvių" @click="setLocale('lt')">LT</button>
        </div>
      </header>
      <div class="home-intro">
        <p class="home-eyebrow"><span aria-hidden="true">✧</span> {{ copy.eyebrow }}</p>
        <h1 id="home-title"><span class="home-title-first">{{ copy.titleFirst }}</span><br /><em>{{ copy.titleSecond }}</em></h1>
        <p class="home-lead">{{ copy.lead }}</p>
        <p class="home-description">{{ copy.description }}</p>
        <button class="home-start" @click="goTo(countryMap)">
          {{ copy.start }}
          <svg viewBox="0 0 24 12" fill="none" aria-hidden="true"><path d="M1 6h21m-6-5 6 5-6 5" stroke="currentColor" stroke-width="1.5" /></svg>
        </button>
      </div>
      <div class="home-map-note">
        <span class="home-eyebrow">{{ copy.mapEyebrow }}</span><p>{{ copy.mapHint }}</p>
        <svg class="home-sketch-arrow" viewBox="0 0 112 48" fill="none" aria-hidden="true"><path d="M3 6c35 36 58 30 99 12m-15-8 17 7-9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </div>
      <div ref="countryMap" class="home-map-wrap" tabindex="-1" :aria-label="copy.mapLabel">
        <CountryMap :label="copy.mapLabel" :latvia="copy.latvia" :lithuania="copy.lithuania" :latvia-subtitle="copy.latviaSubtitle" :lithuania-subtitle="copy.lithuaniaSubtitle" />
      </div>
      <div class="home-stage-bottom">
        <span class="home-country-shortcuts">
          <RouterLink to="/latvia">{{ copy.latvia }} <span aria-hidden="true">↗</span></RouterLink>
          <span aria-hidden="true">·</span>
          <RouterLink to="/lithuania">{{ copy.lithuania }} <span aria-hidden="true">↗</span></RouterLink>
        </span>
        <button class="home-scroll" @click="goTo(story)">{{ copy.scroll }} <span aria-hidden="true">↓</span></button>
      </div>
    </section>
    <section ref="story" class="home-story" tabindex="-1" aria-labelledby="story-title">
      <div class="home-story-heading">
        <p class="home-eyebrow">{{ copy.storyEyebrow }}</p><h2 id="story-title">{{ copy.storyTitle }}</h2>
      </div>
      <p class="home-story-body">{{ copy.storyBody }}</p>
      <div class="home-chapters">
        <article class="home-chapter">
          <span class="home-chapter-number">01</span><div><h3>{{ copy.danceTitle }}</h3><p>{{ copy.danceText }}</p></div>
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m10 10 14 14L10 38M24 10l14 14-14 14M10 24h28" stroke="currentColor" stroke-width="1.6" /></svg>
        </article>
        <article class="home-chapter">
          <span class="home-chapter-number">02</span><div><h3>{{ copy.songTitle }}</h3><p>{{ copy.songText }}</p></div>
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M20 33V11l19-4v22M20 18l19-4" stroke="currentColor" stroke-width="1.6" /><ellipse cx="14" cy="34" rx="6" ry="4" stroke="currentColor" stroke-width="1.6" /><ellipse cx="33" cy="30" rx="6" ry="4" stroke="currentColor" stroke-width="1.6" /></svg>
        </article>
        <article ref="quiz" class="home-chapter home-chapter--quiz" tabindex="-1">
          <span class="home-chapter-number">03</span><div><h3>{{ copy.quizTitle }}</h3><p>{{ copy.quizText }}</p><span class="home-soon">{{ copy.quizSoon }}</span></div>
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m24 4 5 13 15 7-15 5-5 15-5-15-15-5 15-7Z" stroke="currentColor" stroke-width="1.6" /><circle cx="24" cy="24" r="5" stroke="currentColor" stroke-width="1.6" /></svg>
        </article>
      </div>
    </section>
    <footer class="home-footer">
      <div><FolkMark /><span>{{ copy.footer }}</span></div>
      <button @click="toTop">{{ copy.backTop }} <span aria-hidden="true">↑</span></button>
    </footer>
  </div>
</template>
