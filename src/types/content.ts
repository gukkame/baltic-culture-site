export type ItemCategory = 'dance' | 'song'

export interface LocalizedText {
  lv: string
  lt: string
}

export type QuizCountry = 'latvia' | 'lithuania' | 'both'

interface QuizQuestionBase {
  id: string
  country: QuizCountry
  itemId?: string
  question: LocalizedText
  explanation: LocalizedText
}

export interface ChoiceQuestion extends QuizQuestionBase {
  type?: 'choice'
  options: LocalizedText[]
  correct: number
}

export interface OpenQuestion extends QuizQuestionBase {
  type: 'open'
}

export type QuizQuestion = ChoiceQuestion | OpenQuestion

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
