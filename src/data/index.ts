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

export function youtubeEmbedUrl(videoUrl: string): string {
  const match = videoUrl.match(/[?&]v=([^&]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : videoUrl
}
