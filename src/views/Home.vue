<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale, type Locale } from '../composables/useLocale'
import CountryMap from '../components/home/CountryMap.vue'
import FolkMark from '../components/home/FolkMark.vue'
import homeCopy from '../components/home/copy.json'

const { locale, setLocale } = useLocale()
const copy = computed(() => homeCopy[locale.value])
// The journey starts in the country whose language the visitor picked.
const startRoute = computed(() => (locale.value === 'lt' ? '/lithuania' : '/latvia'))

const navLinks = computed(() => [
  { to: '/viktorina', label: copy.value.navQuiz },
  { to: '/about', label: copy.value.navAbout },
])

const languages: { code: Locale; label: string; name: string }[] = [
  { code: 'lv', label: 'LV', name: 'Latviešu' },
  { code: 'lt', label: 'LT', name: 'Lietuvių' },
]

// Links and buttons on the painted hero: no tap flash, and a focus ring in the text colour instead of the global red one.
const heroControl =
  '[-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-current'
</script>

<template>
  <!-- The hero is designed desktop-first, so smaller screens use max-* variants of the
       xs (440px), tablet (760px), laptop (1100px) and wide (1750px) breakpoints from style.css. -->
  <section
    class="relative isolate h-svh min-h-[750px] overflow-hidden bg-pine text-cream max-laptop:min-h-[790px] max-tablet:min-h-[960px] max-xs:min-h-[840px]"
    aria-labelledby="home-title"
  >
    <img
      class="pointer-events-none absolute inset-0 -z-2 size-full object-cover object-[center_62%] max-tablet:object-[62%_center]"
      src="/artwork/folk-dancers-table-painted-v4.webp"
      alt=""
      fetchpriority="high"
      decoding="async"
    />
    <div
      class="pointer-events-none absolute inset-0 -z-1 bg-[linear-gradient(90deg,rgba(14,33,29,.66),transparent_60%),linear-gradient(180deg,rgba(14,28,23,.42),transparent_19%),linear-gradient(0deg,rgba(32,19,11,.53),transparent_30%)] max-tablet:bg-[linear-gradient(90deg,#172f28d9,#172f2866_100%),linear-gradient(0deg,#25170cc7,transparent_34%)]"
      aria-hidden="true"
    />

    <header
      class="relative mx-[4.1%] flex h-28 items-center gap-[38px] border-b border-[#fff1d521] max-laptop:h-25 max-laptop:gap-6 max-tablet:mx-[6%] max-tablet:h-[87px] max-tablet:gap-3"
    >
      <RouterLink
        to="/"
        class="inline-flex items-center gap-4 font-serif text-[25px] leading-[1.17] tracking-[.03em] max-tablet:gap-3 max-tablet:text-[23px] max-xs:text-[21px]"
        :class="heroControl"
        :aria-label="`${copy.brandTop} ${copy.brandBottom}`"
      >
        <FolkMark class="size-[47px] max-tablet:size-9" />
        <span>{{ copy.brandTop }}<br /><small class="font-sans text-[12px] tracking-[.08em] max-tablet:text-[10px]">{{ copy.brandBottom }}</small></span>
      </RouterLink>

      <nav class="ml-auto flex gap-[33px] text-[13px] max-laptop:gap-[23px] max-tablet:hidden" :aria-label="copy.navLabel">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative inline-block py-3 [text-shadow:0_1px_8px_#14261dcc] after:absolute after:bottom-[5px] after:left-0 after:right-full after:h-px after:bg-current after:transition-[right] after:duration-200 hover:after:right-0"
          :class="heroControl"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div
        class="flex items-center gap-[7px] rounded-full bg-[#f5eedce6] px-[7px] text-[12px] text-[#263f36] max-tablet:ml-auto max-tablet:gap-px max-xs:text-[11px]"
        role="group"
        :aria-label="copy.languageLabel"
      >
        <template v-for="(language, index) in languages" :key="language.code">
          <span v-if="index > 0" class="opacity-50" aria-hidden="true">/</span>
          <button
            class="min-h-11 min-w-[35px] cursor-pointer opacity-75 aria-pressed:font-semibold aria-pressed:opacity-100 max-tablet:min-w-8"
            :class="heroControl"
            :aria-pressed="locale === language.code"
            :lang="language.code"
            :aria-label="language.name"
            @click="setLocale(language.code)"
          >
            {{ language.label }}
          </button>
        </template>
      </div>
    </header>

    <div
      class="absolute left-[5.3%] top-[19%] w-[46%] max-w-[660px] wide:top-[18%] max-laptop:top-[17%] max-laptop:w-[56%] max-tablet:left-[7%] max-tablet:right-[6%] max-tablet:top-[139px] max-tablet:w-auto max-xs:top-32"
    >
      <p
        class="mb-5 flex items-center gap-[9px] text-[10px] font-medium leading-[1.7] tracking-[.2em] max-tablet:mb-6 max-tablet:text-[8px] max-tablet:tracking-[.14em]"
      >
        <span class="text-[21px] leading-none" aria-hidden="true">✧</span> {{ copy.tagline }}
      </p>
      <h1
        id="home-title"
        class="text-[length:clamp(58px,5.55vw,92px)] leading-[1.05] font-medium tracking-[-.045em] text-balance [text-shadow:0_2px_25px_#193d4830] max-laptop:text-[67px] max-tablet:text-[length:clamp(54px,10vw,77px)] max-xs:text-[length:clamp(43px,13.7vw,59px)]"
      >
        <span class="whitespace-nowrap">{{ copy.titleFirst }}</span><br /><em class="font-normal text-[#f3d6a7]">{{ copy.titleSecond }}</em>
      </h1>
      <p class="mt-6 text-[length:clamp(14px,1.15vw,18px)] leading-[1.6] font-medium max-tablet:mt-[25px] max-tablet:text-[15px]">
        {{ copy.lead }}
      </p>
      <p class="mt-[5px] max-w-[350px] text-[13px] leading-[1.8] text-[#fff1dbdc] max-tablet:max-w-[300px]">{{ copy.description }}</p>
      <RouterLink
        :to="startRoute"
        class="group mt-[27px] inline-flex items-center justify-between gap-9 rounded-full border border-[#ffc49e45] bg-folk-red px-[25px] py-[15px] text-[13px] font-medium shadow-[0_5px_20px_#331c1833] transition duration-200 hover:-translate-y-0.5 hover:bg-folk-red-light max-tablet:mt-[25px]"
        :class="heroControl"
      >
        {{ copy.start }}
        <svg class="h-3 w-[23px] transition-transform duration-200 group-hover:translate-x-[3px]" viewBox="0 0 24 12" fill="none" aria-hidden="true">
          <path d="M1 6h21m-6-5 6 5-6 5" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </RouterLink>
    </div>

    <!-- Hidden wherever the map spans the full width (phones and portrait tablets), since it would sit on top of it. -->
    <div
      class="absolute bottom-[18%] left-[6%] w-1/4 text-[#fff0d4] max-laptop:left-[5.3%] max-laptop:w-[22%] max-laptop:portrait:hidden max-tablet:hidden"
    >
      <span class="text-[10px] font-medium leading-[1.7] tracking-[.2em]">{{ copy.mapTagline }}</span>
      <p class="mt-2.5 max-w-[250px] font-serif text-2xl leading-[1.4] italic max-laptop:text-[21px]">{{ copy.mapHint }}</p>
      <svg
        class="absolute left-[70%] top-[68%] h-12 w-[110px] opacity-75 max-laptop:left-[65%] max-laptop:top-[105%] max-laptop:w-[65px]"
        viewBox="0 0 112 48"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 6c35 36 58 30 99 12m-15-8 17 7-9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </div>

    <!-- Full width on phones and portrait tablets, so both countries stay whole instead of being cropped. -->
    <div
      class="absolute bottom-[45px] right-0 w-3/5 max-w-[960px] wide:right-[4%] max-laptop:bottom-[38px] max-laptop:w-[69%] max-laptop:portrait:inset-x-[3%] max-laptop:portrait:bottom-[132px] max-laptop:portrait:w-auto max-tablet:inset-x-[3%] max-tablet:bottom-[132px] max-tablet:w-auto"
    >
      <CountryMap
        :label="copy.mapLabel"
        :latvia="copy.latvia"
        :lithuania="copy.lithuania"
        :latvia-subtitle="copy.latviaSubtitle"
        :lithuania-subtitle="copy.lithuaniaSubtitle"
      />
    </div>

    <div class="absolute bottom-6 left-[5.3%] w-80 max-w-[86%] overflow-hidden rounded-xl bg-white p-2 shadow-md max-tablet:bottom-5 max-tablet:left-[7%] max-tablet:w-[280px]">
      <img
        class="block h-auto w-full"
        src="/images/partners/interreg-latvia-lithuania.jpg"
        alt="Interreg Latvija–Lietuva. Līdzfinansē Eiropas Savienība."
        lang="lv"
        width="400"
        height="121"
        decoding="async"
      />
    </div>
  </section>
</template>
