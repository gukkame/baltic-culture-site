import { ref } from 'vue'

export type Locale = 'lv' | 'lt'

const locale = ref<Locale>('lv')

function toggleLocale(): void {
  locale.value = locale.value === 'lv' ? 'lt' : 'lv'
}

function setLocale(next: Locale): void {
  locale.value = next
}

export function useLocale() {
  return { locale, toggleLocale, setLocale }
}
