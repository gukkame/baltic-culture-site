export type ItemCategory = 'dance' | 'song'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface LocalizedText {
  lv: string
  lt: string
}

export interface ContentItem {
  id: string
  category: ItemCategory
  difficulty: Difficulty
  image: string
  imageAlt: LocalizedText
  videoUrl: string
  audioUrl: string
  title: LocalizedText
  tagline: LocalizedText
  description: LocalizedText
  sourceUrl?: string
  contentStatus?: string
  sourceNote?: string
}
