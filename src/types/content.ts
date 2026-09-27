export type ItemCategory = 'dance' | 'song'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface LocalizedText {
  lv: string
  lt: string
}

export type QuizCountry = 'latvia' | 'lithuania' | 'both'

interface QuizQuestionBase {
  /** Also the id of the badge earned for answering correctly. */
  id: string
  country: QuizCountry
  /** The dance or song this question is about, if any (used to link to and from its page). */
  itemId?: string
  question: LocalizedText
  /** Shown once answered; for open questions it gives the traditional answer. */
  explanation: LocalizedText
}

/** Pick one of the options; only `correct` earns the badge. */
export interface ChoiceQuestion extends QuizQuestionBase {
  type?: 'choice'
  options: LocalizedText[]
  /** Index into `options`. */
  correct: number
}

/** Type a free answer: there is no wrong answer, so any non-empty guess earns the badge. */
export interface OpenQuestion extends QuizQuestionBase {
  type: 'open'
}

export type QuizQuestion = ChoiceQuestion | OpenQuestion

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
