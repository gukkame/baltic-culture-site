export type Country = 'latvia' | 'lithuania'

type ItemCategory = 'dance' | 'song'

export interface LocalizedText {
  lv: string
  lt: string
}

export type QuizCountry = Country | 'both'

export interface QuizQuestion {
  id: string
  country: QuizCountry
  itemId?: string
  question: LocalizedText
  options: LocalizedText[]
  correct: number
  explanation: LocalizedText
}

export interface ContentItem {
  id: string
  category: ItemCategory
  videoUrl: string
  title: LocalizedText
  tagline: LocalizedText
  description: LocalizedText
  sourceUrl?: string
  contentStatus?: string
  sourceNote?: string
}
