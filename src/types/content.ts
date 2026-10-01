export type ItemCategory = 'dance' | 'song'

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
  videoUrl: string
  title: LocalizedText
  tagline: LocalizedText
  description: LocalizedText
  /** Where the text comes from; non-YouTube sources are listed on the About page. */
  sourceUrl?: string
  /** Editors' notes, not shown on the site: how the text was checked, and anything to follow up. */
  contentStatus?: string
  sourceNote?: string
}
