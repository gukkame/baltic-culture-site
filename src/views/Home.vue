<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import CountryMap from '../components/home/CountryMap.vue'
import FolkMark from '../components/home/FolkMark.vue'
import homeCopy from '../components/home/copy.json'
import '../components/home/home.css'

const { locale, setLocale } = useLocale()
const copy = computed(() => homeCopy[locale.value])
// The journey starts in the country whose language the visitor picked.
const startRoute = computed(() => (locale.value === 'lt' ? '/lithuania' : '/latvia'))
</script>

<template>
  <div class="folk-home">
    <section class="home-stage" aria-labelledby="home-title">
      <img class="home-art" src="/artwork/latvian-ensemble-table-painted-v2.webp" alt="" fetchpriority="high" decoding="async" />
      <div class="home-shade" aria-hidden="true" />
      <header class="home-header">
        <RouterLink to="/" class="home-brand" :aria-label="`${copy.brandTop} ${copy.brandBottom}`">
          <FolkMark /><span>{{ copy.brandTop }}<br /><small>{{ copy.brandBottom }}</small></span>
        </RouterLink>
        <nav class="home-nav" :aria-label="copy.navLabel">
          <RouterLink to="/viktorina">{{ copy.navQuiz }}</RouterLink>
          <RouterLink to="/about">{{ copy.navAbout }}</RouterLink>
        </nav>
        <div class="home-languages" role="group" :aria-label="copy.languageLabel">
          <button :aria-pressed="locale === 'lv'" lang="lv" aria-label="Latviešu" @click="setLocale('lv')">LV</button>
          <span aria-hidden="true">/</span>
          <button :aria-pressed="locale === 'lt'" lang="lt" aria-label="Lietuvių" @click="setLocale('lt')">LT</button>
        </div>
      </header>
      <div class="home-intro">
        <p class="home-tagline"><span aria-hidden="true">✧</span> {{ copy.tagline }}</p>
        <h1 id="home-title"><span class="home-title-first">{{ copy.titleFirst }}</span><br /><em>{{ copy.titleSecond }}</em></h1>
        <p class="home-lead">{{ copy.lead }}</p>
        <p class="home-description">{{ copy.description }}</p>
        <RouterLink class="home-start" :to="startRoute">
          {{ copy.start }}
          <svg viewBox="0 0 24 12" fill="none" aria-hidden="true"><path d="M1 6h21m-6-5 6 5-6 5" stroke="currentColor" stroke-width="1.5" /></svg>
        </RouterLink>
      </div>
      <div class="home-map-note">
        <span class="home-tagline">{{ copy.mapTagline }}</span><p>{{ copy.mapHint }}</p>
        <svg class="home-sketch-arrow" viewBox="0 0 112 48" fill="none" aria-hidden="true"><path d="M3 6c35 36 58 30 99 12m-15-8 17 7-9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </div>
      <div class="home-map-wrap">
        <CountryMap :label="copy.mapLabel" :latvia="copy.latvia" :lithuania="copy.lithuania" :latvia-subtitle="copy.latviaSubtitle" :lithuania-subtitle="copy.lithuaniaSubtitle" />
      </div>
    </section>
  </div>
</template>
