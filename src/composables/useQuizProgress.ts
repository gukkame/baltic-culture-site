import { reactive, watch } from 'vue'

const STORAGE_KEY = 'baltic-culture-quiz-progress'

export interface QuizProgressState {
  /** Ids of the questions answered correctly; each one is a badge. */
  badges: string[]
}

// Storage can be unavailable (private mode, blocked cookies) or hold an older format, so fall back to a fresh start.
function loadInitial(): QuizProgressState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (Array.isArray(saved?.badges)) return { badges: saved.badges }
  } catch {
    // fall through
  }
  return { badges: [] }
}

const state = reactive<QuizProgressState>(loadInitial())

watch(
  state,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // progress just won't persist
    }
  },
  { deep: true },
)

export function useQuizProgress() {
  function earnBadge(questionId: string): void {
    if (!state.badges.includes(questionId)) state.badges.push(questionId)
  }

  function hasBadge(questionId: string): boolean {
    return state.badges.includes(questionId)
  }

  function reset(): void {
    state.badges = []
  }

  return { state, earnBadge, hasBadge, reset }
}
