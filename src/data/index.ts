import latvia from './latvia.json'
import lithuania from './lithuania.json'
import type { ContentItem } from '../types/content'

export type Country = 'latvia' | 'lithuania'

export const contentByCountry: Record<Country, ContentItem[]> = {
  latvia: latvia as ContentItem[],
  lithuania: lithuania as ContentItem[],
}

export function isCountry(value: string | undefined): value is Country {
  return value === 'latvia' || value === 'lithuania'
}

export function findItem(country: string | undefined, itemId: string | undefined): ContentItem | undefined {
  if (!isCountry(country) || !itemId) return undefined
  return contentByCountry[country].find((item) => item.id === itemId)
}

/** Next item of the same category (dance → dance, song → song), wrapping to the first. */
export function findNextItem(country: string | undefined, itemId: string | undefined): ContentItem | undefined {
  const current = findItem(country, itemId)
  if (!current || !isCountry(country)) return undefined
  const sameCategory = contentByCountry[country].filter((item) => item.category === current.category)
  if (sameCategory.length < 2) return undefined
  const index = sameCategory.findIndex((item) => item.id === current.id)
  return sameCategory[(index + 1) % sameCategory.length]
}

export function youtubeEmbedUrl(videoUrl: string): string {
  const match = videoUrl.match(/[?&]v=([^&]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : videoUrl
}
