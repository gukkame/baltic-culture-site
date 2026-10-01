<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import countryGeometry from './countryGeometry.json'
import { countryPathFor } from '../../router/paths'
import { publicUrl } from '../../publicUrl'

const props = defineProps<{
  label: string
  latvia: string
  lithuania: string
  latviaSubtitle: string
  lithuaniaSubtitle: string
}>()
const countries = computed(() => [...countryGeometry].reverse().map((country) => ({
  ...country,
  name: country.id === 'latvia' ? props.latvia : props.lithuania,
  subtitle: country.id === 'latvia' ? props.latviaSubtitle : props.lithuaniaSubtitle,
  // Colour wash over the painted terrain, a little lighter over Latvia.
  tint: country.id === 'latvia' ? 'fill-map-latvia opacity-35' : 'fill-map-lithuania opacity-54',
  terrain: country.id === 'latvia' ? 'url(#painted-latvia-forest)' : 'url(#painted-land)',
  offset: country.id === 'latvia' ? -7 : 8,
})))
</script>

<template>
  <svg class="block w-full overflow-visible" viewBox="0 0 800 360" role="group" :aria-label="label">
    <defs>
      <pattern id="painted-land" patternUnits="userSpaceOnUse" width="800" height="360">
        <image :href="publicUrl('/artwork/painted-land-v1.webp')" width="800" height="360" preserveAspectRatio="xMidYMid slice" />
      </pattern>
      <pattern id="painted-latvia-forest" patternUnits="userSpaceOnUse" width="800" height="360">
        <image :href="publicUrl('/artwork/painted-latvia-forest-v2.webp')" width="800" height="360" preserveAspectRatio="xMidYMid slice" />
      </pattern>
      <linearGradient id="map-edge" x1="0" y1="0" x2="0.3" y2="1">
        <stop class="[stop-color:var(--color-gold)]" /><stop offset=".4" class="[stop-color:var(--color-wood)]" /><stop offset="1" class="[stop-color:var(--color-wood-dark)]" />
      </linearGradient>
      <filter id="map-shadow" x="-20%" y="-20%" width="150%" height="160%">
        <feDropShadow dx="4" dy="17" stdDeviation="10" flood-opacity=".7" class="[flood-color:var(--color-bark)]" />
      </filter>
      <filter id="map-label-shadow" x="-30%" y="-50%" width="160%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity=".9" class="[flood-color:var(--color-bark)]" />
      </filter>
    </defs>
    <g v-for="country in countries" :key="country.id" :transform="`translate(0 ${country.offset})`">
      <RouterLink v-slot="{ href, navigate }" :to="countryPathFor(country.id)" custom>
      <a :href="href" :aria-label="`${country.name}: ${country.subtitle}`" class="group cursor-pointer outline-none [-webkit-tap-highlight-color:transparent]" @click="navigate">
        <title>{{ country.name }} · {{ country.subtitle }}</title>
        <g class="transition-[translate,filter] duration-300 ease-[ease] group-hover:-translate-y-[7px] group-focus-visible:-translate-y-[7px]">
          <path :d="country.path" transform="translate(0 22)" stroke-width="3" class="fill-wood-shadow stroke-wood-shadow" filter="url(#map-shadow)" />
          <path v-for="depth in [18, 14, 10, 6]" :key="depth" :d="country.path" :transform="`translate(0 ${depth})`" fill="url(#map-edge)" stroke-width="1.1" class="stroke-wood-mid" />
          <path :d="country.path" :fill="country.terrain" stroke-width="3" stroke-linejoin="round" class="stroke-gold-dark" />
          <path :d="country.path" stroke="none" class="transition-opacity duration-300 ease-[ease] group-hover:opacity-27 group-focus-visible:opacity-27" :class="country.tint" />
          <path :d="country.path" fill="none" stroke-linejoin="round" class="stroke-gold-light [stroke-width:1.8] transition-[stroke,stroke-width] duration-300 ease-[ease] group-hover:stroke-cream-bright group-hover:stroke-4 group-focus-visible:stroke-cream-bright group-focus-visible:stroke-4" />
          <g :transform="`translate(${country.label[0]} ${country.label[1]})`" class="pointer-events-none text-cream" filter="url(#map-label-shadow)">
            <text class="fill-current font-serif text-[35px] max-sm:translate-y-2 max-sm:text-[43px]" text-anchor="middle" y="-12">{{ country.name }}</text>
            <text class="fill-current font-sans text-[12px] tracking-[.3px] max-sm:hidden" text-anchor="middle" y="12">{{ country.subtitle }}</text>
            <g class="translate-y-[30px] transition-[translate] duration-300 ease-[ease] group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px] max-sm:translate-y-[25px]">
              <path d="M-12 0h24m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" />
            </g>
          </g>
        </g>
      </a>
      </RouterLink>
    </g>
  </svg>
</template>
