import { reactive, watch } from 'vue'

const STORAGE_KEY = 'baltic-culture-quiz-progress'

export interface QuizProgressState {
  badges: string[]
}

function loadInitial(): QuizProgressState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (Array.isArray(saved?.badges)) return { badges: saved.badges }
  } catch {}
  return { badges: [] }
}

const state = reactive<QuizProgressState>(loadInitial())

watch(
  state,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {}
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
