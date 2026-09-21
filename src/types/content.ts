export type ItemCategory = 'dance' | 'song'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface LocalizedText {
  lv: string
  lt: string
}

export type QuizCountry = 'latvia' | 'lithuania' | 'both'

export interface QuizQuestion {
  /** Also the id of the badge earned for answering correctly. */
  id: string
  country: QuizCountry
  /** The dance or song this question is about, if any (used to link to and from its page). */
  itemId?: string
  question: LocalizedText
  options: LocalizedText[]
  /** Index into `options`. */
  correct: number
  explanation: LocalizedText
}

export interface ContentItem {
  id: string
  category: ItemCategory
  difficulty: Difficulty
  videoUrl: string
  audioUrl: string
  title: LocalizedText
  tagline: LocalizedText
  description: LocalizedText
  sourceUrl?: string
  contentStatus?: string
  sourceNote?: string
}
