import latvia from './latvia.json'
import lithuania from './lithuania.json'
import quiz from './quiz.json'
import type { ContentItem, QuizQuestion } from '../types/content'

export type Country = 'latvia' | 'lithuania'

export const contentByCountry: Record<Country, ContentItem[]> = {
  latvia: latvia as ContentItem[],
  lithuania: lithuania as ContentItem[],
}

export const quizQuestions = quiz as QuizQuestion[]

export function isCountry(value: string | undefined): value is Country {
  return value === 'latvia' || value === 'lithuania'
}

export function findItem(country: string | undefined, itemId: string | undefined): ContentItem | undefined {
  if (!isCountry(country) || !itemId) return undefined
  return contentByCountry[country].find((item) => item.id === itemId)
}

export function findNextItem(country: string | undefined, itemId: string | undefined): ContentItem | undefined {
  const current = findItem(country, itemId)
  if (!current || !isCountry(country)) return undefined
  const sameCategory = contentByCountry[country].filter((item) => item.category === current.category)
  if (sameCategory.length < 2) return undefined
  const index = sameCategory.findIndex((item) => item.id === current.id)
  return sameCategory[(index + 1) % sameCategory.length]
}

export function youtubeId(videoUrl: string): string | undefined {
  return videoUrl.match(/[?&]v=([^&]+)/)?.[1]
}

export function youtubeEmbedUrl(videoUrl: string): string {
  const id = youtubeId(videoUrl)
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : videoUrl
}

export function youtubeThumbnailUrl(videoUrl: string): string | undefined {
  const id = youtubeId(videoUrl)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined
}

export function youtubePreviewUrl(videoUrl: string): string | undefined {
  const id = youtubeId(videoUrl)
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${id}`
    : undefined
}
