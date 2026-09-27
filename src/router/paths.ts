import { isCountry, type Country } from '../data'
import type { Locale } from '../composables/useLocale'

/** URL slug of each country page: "Latvija" and "Lietuva" are spelled the same in Latvian and Lithuanian. */
export const countrySlugs: Record<Country, string> = {
  latvia: 'latvija',
  lithuania: 'lietuva',
}

/** The About page lives at a different address in each language. */
export const aboutPaths: Record<Locale, string> = {
  lv: '/par-projektu',
  lt: '/apie-projekta',
}

export const quizPath = '/viktorina'

export function countryPath(country: Country, itemId?: string): string {
  const base = `/${countrySlugs[country]}`
  return itemId ? `${base}/${itemId}` : base
}

/** For values typed as plain strings (route props, quiz data): falls back to home for an unknown country. */
export function countryPathFor(country: string, itemId?: string): string {
  return isCountry(country) ? countryPath(country, itemId) : '/'
}

export function countryFromSlug(slug: string): Country | undefined {
  return (Object.keys(countrySlugs) as Country[]).find((country) => countrySlugs[country] === slug)
}
