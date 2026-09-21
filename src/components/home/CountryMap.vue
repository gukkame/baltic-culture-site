<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import countryGeometry from './countryGeometry.json'

const props = defineProps<{
  label: string
  latvia: string
  lithuania: string
  latviaSubtitle: string
  lithuaniaSubtitle: string
}>()
const router = useRouter()
const countries = computed(() => [...countryGeometry].reverse().map((country) => ({
  ...country,
  name: country.id === 'latvia' ? props.latvia : props.lithuania,
  subtitle: country.id === 'latvia' ? props.latviaSubtitle : props.lithuaniaSubtitle,
  href: router.resolve(`/${country.id}`).href,
  tint: country.id === 'latvia' ? '#863d27' : '#183f35',
  offset: country.id === 'latvia' ? -7 : 8,
})))
</script>

<template>
  <svg class="country-map" viewBox="0 0 800 360" role="group" :aria-label="label">
    <defs>
      <pattern id="painted-land" patternUnits="userSpaceOnUse" width="800" height="360">
        <image href="/artwork/painted-land-v1.png" width="800" height="360" preserveAspectRatio="xMidYMid slice" />
      </pattern>
      <linearGradient id="map-edge" x1="0" y1="0" x2="0.3" y2="1">
        <stop stop-color="#e2bc79" /><stop offset=".4" stop-color="#977047" /><stop offset="1" stop-color="#493c2c" />
      </linearGradient>
      <filter id="map-shadow" x="-20%" y="-20%" width="150%" height="160%">
        <feDropShadow dx="4" dy="17" stdDeviation="10" flood-color="#140e09" flood-opacity=".7" />
      </filter>
      <filter id="map-label-shadow" x="-30%" y="-50%" width="160%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#181e14" flood-opacity=".9" />
      </filter>
    </defs>
    <g v-for="country in countries" :key="country.id" :transform="`translate(0 ${country.offset})`">
      <a :href="country.href" :aria-label="`${country.name}: ${country.subtitle}`" class="map-country" :class="`map-country--${country.id}`">
        <title>{{ country.name }} · {{ country.subtitle }}</title>
        <g class="map-piece">
          <path :d="country.path" transform="translate(0 22)" fill="#322b22" stroke="#322b22" stroke-width="3" filter="url(#map-shadow)" />
          <path v-for="depth in [18, 14, 10, 6]" :key="depth" :d="country.path" :transform="`translate(0 ${depth})`" fill="url(#map-edge)" stroke="#78583b" stroke-width="1.1" />
          <path :d="country.path" fill="url(#painted-land)" stroke="#d6b572" stroke-width="3" stroke-linejoin="round" />
          <path :d="country.path" :fill="country.tint" class="map-tint" stroke="none" />
          <path :d="country.path" fill="none" class="map-outline" stroke-linejoin="round" />
          <g :transform="`translate(${country.label[0]} ${country.label[1]})`" class="map-label" filter="url(#map-label-shadow)">
            <g transform="translate(0 -34) scale(.7)" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="m0-17 5 12 12 5-12 5-5 12-5-12-12-5 12-5Z" />
              <path d="M-11-11 11 11M11-11-11 11M0-23v-4M0 23v4M23 0h4M-23 0h-4" /><circle r="3" />
            </g>
            <text class="map-name" text-anchor="middle" y="5">{{ country.name }}</text>
            <text class="map-subtitle" text-anchor="middle" y="29">{{ country.subtitle }}</text>
            <g class="map-discover" transform="translate(0 47)">
              <path d="M-12 0h24m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" />
            </g>
          </g>
        </g>
      </a>
    </g>
  </svg>
</template>

<style scoped>
.country-map { display: block; width: 100%; overflow: visible; }
.map-country { cursor: pointer; -webkit-tap-highlight-color: transparent; outline: none; }
.map-piece { transition: transform .3s ease, filter .3s ease; }
.map-tint { opacity: .47; transition: opacity .3s ease; }
.map-country--lithuania .map-tint { opacity: .54; }
.map-outline { stroke: #e9c786; stroke-width: 1.8; transition: stroke-width .3s ease, stroke .3s ease; }
.map-label { color: #fff3d8; pointer-events: none; }
.map-name { fill: currentColor; font-family: var(--font-serif); font-size: 35px; }
.map-subtitle { fill: currentColor; font-family: var(--font-sans); font-size: 12px; letter-spacing: .3px; }
.map-discover { transition: transform .3s ease; }
.map-country:hover .map-piece, .map-country:focus-visible .map-piece { transform: translateY(-7px); }
.map-country:hover .map-tint, .map-country:focus-visible .map-tint { opacity: .27; }
.map-country:hover .map-outline, .map-country:focus-visible .map-outline { stroke: #fff4ce; stroke-width: 4; }
.map-country:hover .map-discover, .map-country:focus-visible .map-discover { transform: translate(5px, 47px); }
@media (max-width: 640px) {
  .map-name { font-size: 43px; }
  .map-subtitle { display: none; }
  .map-discover { transform: translateY(34px); }
  .map-country:hover .map-discover, .map-country:focus-visible .map-discover { transform: translate(5px, 34px); }
}
@media (prefers-reduced-motion: reduce) {
  .map-piece, .map-tint, .map-outline, .map-discover { transition: none; }
}
</style>
