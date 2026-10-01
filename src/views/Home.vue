<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale, type Locale } from '../composables/useLocale'
import CountryMap from '../components/home/CountryMap.vue'
import CountrySymbol from '../components/CountrySymbol.vue'
import { aboutPaths, countryPath, quizPath } from '../router/paths'
import { publicUrl } from '../publicUrl'

const { locale, setLocale, t } = useLocale()
// The journey starts in the country whose language the visitor picked.
const startRoute = computed(() => countryPath(locale.value === 'lt' ? 'lithuania' : 'latvia'))

// The brand shows a folk sign of the chosen language's country.
const brandCountry = computed(() => (locale.value === 'lt' ? 'lithuania' : 'latvia'))

const navLinks = computed(() => [
  { to: quizPath, label: t('home.navQuiz') },
  { to: aboutPaths[locale.value], label: t('home.navAbout') },
])

const languages: { code: Locale; label: string; name: string }[] = [
  { code: 'lv', label: 'LV', name: 'Latviešu' },
  { code: 'lt', label: 'LT', name: 'Lietuvių' },
]

const mobileMenuOpen = ref(false)
const mobileMenu = ref<HTMLElement | null>(null)
const mobileMenuButton = ref<HTMLButtonElement | null>(null)

function closeOnOutsidePointer(event: PointerEvent) {
  if (event.target instanceof Node && !mobileMenu.value?.contains(event.target)) {
    mobileMenuOpen.value = false
  }
}

function closeOnFocusLeave(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !mobileMenu.value?.contains(event.relatedTarget)) {
    mobileMenuOpen.value = false
  }
}

function closeOnEscape() {
  mobileMenuOpen.value = false
  mobileMenuButton.value?.focus()
}

let desktopQuery: MediaQueryList | undefined
function closeOnDesktop() {
  if (desktopQuery?.matches) mobileMenuOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOnOutsidePointer)
  desktopQuery = window.matchMedia('(min-width: 760px)')
  desktopQuery.addEventListener('change', closeOnDesktop)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', closeOnOutsidePointer)
  desktopQuery?.removeEventListener('change', closeOnDesktop)
})

// Links and buttons on the painted hero: no tap flash, and a focus ring in the text colour instead of the global red one.
const heroControl =
  '[-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-current'
</script>

<template>
  <section
    class="relative isolate h-svh min-h-[750px] overflow-hidden bg-pine text-cream max-laptop:min-h-[790px] max-tablet:min-h-[960px] max-xs:min-h-[840px] max-[360px]:min-h-[900px]"
    aria-labelledby="home-title"
  >
    <img
      class="pointer-events-none absolute inset-0 -z-2 size-full object-cover object-[center_62%] max-tablet:object-[62%_center]"
      :src="publicUrl('/artwork/folk-dancers-table-painted-v4.webp')"
      alt=""
      fetchpriority="high"
      decoding="async"
    />
    <div
      class="pointer-events-none absolute inset-0 -z-1 bg-hero-shade max-tablet:bg-hero-shade-full"
      aria-hidden="true"
    />

    <header
      class="relative z-10 mx-[4.1%] flex h-28 items-center gap-[38px] border-b border-cream/13 max-laptop:h-25 max-laptop:gap-6 max-tablet:mx-[6%] max-tablet:h-[87px] max-tablet:gap-3 max-xs:gap-2 max-[360px]:h-auto max-[360px]:flex-wrap max-[360px]:gap-y-2 max-[360px]:py-3"
    >
      <RouterLink
        to="/"
        class="inline-flex min-w-0 items-center gap-4 max-tablet:gap-3 max-[360px]:w-full"
        :class="heroControl"
        :aria-label="`${t('site.programmeTitle')} ${t('site.programmeSubtitle')}`"
      >
        <CountrySymbol :country="brandCountry" class="size-[47px] max-tablet:size-9" />
        <span class="max-w-[430px] font-serif text-[17px] leading-[1.25] max-laptop:max-w-[330px] max-laptop:text-[15px] max-tablet:text-[12px] max-tablet:leading-tight">
          {{ t('site.programmeTitle') }}
          <small class="mt-1 block font-sans text-[12px] tracking-[.08em] max-tablet:mt-0.5 max-tablet:text-[10px]">{{ t('site.programmeSubtitle') }}</small>
        </span>
      </RouterLink>

      <nav class="ml-auto flex gap-[33px] text-[13px] max-laptop:gap-[23px] max-tablet:hidden" :aria-label="t('home.navLabel')">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative inline-block py-3 text-shadow-nav after:absolute after:bottom-[5px] after:left-0 after:right-full after:h-px after:bg-current after:transition-[right] after:duration-200 hover:after:right-0"
          :class="heroControl"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div
        class="flex shrink-0 items-center gap-[7px] rounded-full bg-linen/90 px-[7px] text-[12px] text-pine max-tablet:ml-auto max-tablet:gap-px max-xs:text-[11px]"
        role="group"
        :aria-label="t('home.languageLabel')"
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

      <div
        ref="mobileMenu"
        class="hidden shrink-0 max-tablet:block"
        @keydown.esc.stop.prevent="closeOnEscape"
        @focusout="closeOnFocusLeave"
      >
        <button
          ref="mobileMenuButton"
          type="button"
          class="flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream/30 bg-pine/50 text-cream transition-colors hover:bg-pine/80"
          :class="heroControl"
          :aria-label="mobileMenuOpen ? t('home.closeMenu') : t('home.openMenu')"
          :aria-expanded="mobileMenuOpen"
          aria-controls="home-mobile-navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <path v-if="mobileMenuOpen" d="m6 6 12 12M6 18 18 6" />
            <path v-else d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav
          v-show="mobileMenuOpen"
          id="home-mobile-navigation"
          class="absolute right-0 top-[calc(100%+12px)] w-64 max-w-full rounded-2xl border border-pine/10 bg-cream p-2 text-pine shadow-xl"
          :aria-label="t('home.navLabel')"
        >
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex min-h-12 items-center justify-between gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors hover:bg-pine/10 focus-visible:bg-pine/10 focus-visible:outline-2 focus-visible:outline-pine"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
            <span aria-hidden="true">→</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <div
      class="absolute left-[5.3%] top-[19%] w-[46%] max-w-[660px] wide:top-[18%] max-laptop:top-[17%] max-laptop:w-[56%] max-tablet:left-[7%] max-tablet:right-[6%] max-tablet:top-[139px] max-tablet:w-auto max-xs:top-32 max-[360px]:top-[184px]"
    >
      <p
        class="mb-5 flex items-center gap-[9px] text-[10px] font-medium leading-[1.7] tracking-[.2em] max-tablet:mb-6 max-tablet:text-[8px] max-tablet:tracking-[.14em]"
      >
        <span class="text-[21px] leading-none" aria-hidden="true">✧</span> {{ t('home.tagline') }}
      </p>
      <h1
        id="home-title"
        class="text-[length:clamp(58px,5.55vw,92px)] leading-[1.05] font-medium tracking-[-.045em] text-balance text-shadow-title max-laptop:text-[67px] max-tablet:text-[length:clamp(54px,10vw,77px)] max-xs:text-[length:clamp(43px,13.7vw,59px)]"
      >
        <span class="whitespace-nowrap">{{ t('home.titleFirst') }}</span><br /><em class="font-normal text-sand">{{ t('home.titleSecond') }}</em>
      </h1>
      <p class="mt-6 text-[length:clamp(14px,1.15vw,18px)] leading-[1.6] font-medium max-tablet:mt-[25px] max-tablet:text-[15px]">
        {{ t('home.lead') }}
      </p>
      <p class="mt-[5px] max-w-[350px] text-[13px] leading-[1.8] text-cream/86 max-tablet:max-w-[300px]">{{ t('home.description') }}</p>
      <RouterLink
        :to="startRoute"
        class="group mt-[27px] inline-flex items-center justify-between gap-9 rounded-full border border-peach/27 bg-folk-red px-[25px] py-[15px] text-[13px] font-medium shadow-button transition duration-200 hover:-translate-y-0.5 hover:bg-folk-red-light max-tablet:mt-[25px]"
        :class="heroControl"
      >
        {{ t('home.start') }}
        <svg class="h-3 w-[23px] transition-transform duration-200 group-hover:translate-x-[3px]" viewBox="0 0 24 12" fill="none" aria-hidden="true">
          <path d="M1 6h21m-6-5 6 5-6 5" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </RouterLink>
    </div>

    <div
      class="absolute bottom-[18%] left-[6%] w-1/4 text-cream max-laptop:left-[5.3%] max-laptop:w-[22%] max-laptop:portrait:hidden max-tablet:hidden"
    >
      <span class="text-[10px] font-medium leading-[1.7] tracking-[.2em]">{{ t('home.mapTagline') }}</span>
      <p class="mt-2.5 max-w-[250px] font-serif text-2xl leading-[1.4] italic max-laptop:text-[21px]">{{ t('home.mapHint') }}</p>
      <svg
        class="absolute left-[70%] top-[68%] h-12 w-[110px] opacity-75 max-laptop:left-[65%] max-laptop:top-[105%] max-laptop:w-[65px]"
        viewBox="0 0 112 48"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 6c35 36 58 30 99 12m-15-8 17 7-9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </div>

    <div
      class="absolute bottom-[45px] right-0 w-3/5 max-w-[960px] wide:right-[4%] max-laptop:bottom-[38px] max-laptop:w-[69%] max-laptop:portrait:inset-x-[3%] max-laptop:portrait:bottom-[132px] max-laptop:portrait:w-auto max-tablet:inset-x-[3%] max-tablet:bottom-[132px] max-tablet:w-auto"
    >
      <CountryMap
        :label="t('home.mapLabel')"
        :latvia="t('home.latvia')"
        :lithuania="t('home.lithuania')"
        :latvia-subtitle="t('home.latviaSubtitle')"
        :lithuania-subtitle="t('home.lithuaniaSubtitle')"
      />
    </div>

    <div class="absolute bottom-6 left-[5.3%] w-80 max-w-[86%] overflow-hidden rounded-xl bg-white p-2 shadow-md max-tablet:bottom-5 max-tablet:left-[7%] max-tablet:w-[280px]">
      <img
        class="block h-auto w-full"
        :src="publicUrl('/images/partners/interreg-latvia-lithuania.jpg')"
        alt="Interreg Latvija–Lietuva. Līdzfinansē Eiropas Savienība."
        lang="lv"
        width="400"
        height="121"
        decoding="async"
      />
    </div>
  </section>
</template>
