import { ref } from 'vue'
import lv from '../i18n/lv.json'
import lt from '../i18n/lt.json'

export type Locale = 'lv' | 'lt'

const dictionaries = { lv, lt } as const

const locale = ref<Locale>('lv')

function toggleLocale(): void {
  locale.value = locale.value === 'lv' ? 'lt' : 'lv'
}

function setLocale(next: Locale): void {
  locale.value = next
}

function t(key: string): string {
  const dict = dictionaries[locale.value]
  const value = key
    .split('.')
    .reduce<unknown>((acc, segment) => {
      if (acc && typeof acc === 'object' && segment in acc) {
        return (acc as Record<string, unknown>)[segment]
      }
      return undefined
    }, dict)
  return typeof value === 'string' ? value : key
}

export function useLocale() {
  return { locale, toggleLocale, setLocale, t }
}
