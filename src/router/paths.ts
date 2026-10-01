import { isCountry, type Country } from '../data'
import type { Locale } from '../composables/useLocale'

export const countrySlugs: Record<Country, string> = {
  latvia: 'latvija',
  lithuania: 'lietuva',
}

export const aboutPaths: Record<Locale, string> = {
  lv: '/par-projektu',
  lt: '/apie-projekta',
}

export const quizPath = '/viktorina'

export const localeCountry: Record<Locale, Country> = {
  lv: 'latvia',
  lt: 'lithuania',
}

export function countryPath(country: Country, itemId?: string): string {
  const base = `/${countrySlugs[country]}`
  return itemId ? `${base}/${itemId}` : base
}

export function countryPathFor(country: string, itemId?: string): string {
  return isCountry(country) ? countryPath(country, itemId) : '/'
}

export function countryFromSlug(slug: string): Country | undefined {
  return (Object.keys(countrySlugs) as Country[]).find((country) => countrySlugs[country] === slug)
}
