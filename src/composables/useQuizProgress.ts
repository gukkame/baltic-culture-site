import { reactive, watch } from 'vue'

const STORAGE_KEY = 'baltic-culture-quiz-progress'

export interface QuizProgressState {
  answered: Record<string, boolean>
  badges: string[]
}

function loadInitial(): QuizProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as QuizProgressState
  } catch {
    return { answered: {}, badges: [] }
  }
  return { answered: {}, badges: [] }
}

const state = reactive<QuizProgressState>(loadInitial())

watch(
  state,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // localStorage unavailable (e.g. private mode) — progress just won't persist
    }
  },
  { deep: true },
)

export function useQuizProgress() {
  function recordAnswer(questionId: string, correct: boolean, badgeId?: string): void {
    state.answered[questionId] = correct
    if (correct && badgeId && !state.badges.includes(badgeId)) {
      state.badges.push(badgeId)
    }
  }

  function hasBadge(badgeId: string): boolean {
    return state.badges.includes(badgeId)
  }

  function reset(): void {
    state.answered = {}
    state.badges = []
  }

  return { state, recordAnswer, hasBadge, reset }
}
