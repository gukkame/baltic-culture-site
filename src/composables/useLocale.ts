import { ref, watch } from 'vue'
import lv from '../i18n/lv.json'
import lt from '../i18n/lt.json'

export type Locale = 'lv' | 'lt'

const dictionaries = { lv, lt } as const

const STORAGE_KEY = 'baltic-locale'

function detectLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const language of languages) {
    const code = language?.toLowerCase().split('-')[0]
    if (code === 'lt' || code === 'lv') return code
  }
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Vilnius') return 'lt'
  } catch {}
  return 'lv'
}

function loadLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'lv' || stored === 'lt') return stored
  } catch {}
  return detectLocale()
}

const locale = ref<Locale>(loadLocale())

watch(locale, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {}
})

function setLocale(next: Locale): void {
  locale.value = next
}

function t(key: string): string {
  const dict = dictionaries[locale.value]
  const value = key.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return (acc as Record<string, unknown>)[segment]
    }
    return undefined
  }, dict)
  return typeof value === 'string' ? value : key
}

export function useLocale() {
  return { locale, setLocale, t }
}
