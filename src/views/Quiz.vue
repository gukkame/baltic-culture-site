<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useQuizProgress } from '../composables/useQuizProgress'
import { quizQuestions } from '../data'
import QuizQuestionCard from '../components/QuizQuestionCard.vue'

const { t } = useLocale()
const { state, reset } = useQuizProgress()

const total = quizQuestions.length
const collected = computed(() => quizQuestions.filter((question) => state.badges.includes(question.id)).length)
const allDone = computed(() => collected.value === total)

// Questions unlock one at a time: everything answered so far, plus the current one.
const visibleQuestions = computed(() => {
  const current = quizQuestions.findIndex((question) => !state.badges.includes(question.id))
  return current === -1 ? quizQuestions : quizQuestions.slice(0, current + 1)
})

// When a new question unlocks, bring it to the middle of the screen so nobody has to scroll for it.
// A short pause first lets the "Correct! Badge earned" feedback register before the page moves.
const SCROLL_DELAY_MS = 700
let scrollTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => visibleQuestions.value.length,
  async (length, previousLength) => {
    clearTimeout(scrollTimer)
    if (length <= previousLength) return // start over: nothing to scroll to
    await nextTick()
    const unlocked = visibleQuestions.value[length - 1]
    scrollTimer = setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document
        .getElementById(`q-${unlocked.id}`)
        ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
    }, SCROLL_DELAY_MS)
  },
)

onBeforeUnmount(() => clearTimeout(scrollTimer))

const resetDialog = ref<HTMLDialogElement>()

function confirmStartOver() {
  reset()
  resetDialog.value?.close()
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-12">
    <RouterLink
      to="/"
      class="text-sm text-ink-light underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark hover:underline"
    >
      ← {{ t('culture.backHome') }}
    </RouterLink>

    <h1 class="mt-4 font-serif text-3xl text-ink sm:text-4xl">{{ t('quiz.title') }}</h1>
    <p class="mt-2 text-ink-light">{{ t('quiz.intro') }}</p>

    <div class="mt-6 rounded-2xl bg-parchment-light p-4 shadow-paper ring-1 ring-parchment-dark">
      <div class="flex items-baseline justify-between gap-4 text-sm">
        <span class="font-medium text-ink">{{ t('quiz.badges') }}</span>
        <span class="text-ink-light">{{ collected }} / {{ total }}</span>
      </div>
      <div
        class="mt-2 h-2 overflow-hidden rounded-full bg-parchment-dark"
        role="progressbar"
        :aria-label="t('quiz.badges')"
        aria-valuemin="0"
        :aria-valuemax="total"
        :aria-valuenow="collected"
      >
        <div class="h-full rounded-full bg-terracotta transition-all duration-500" :style="{ width: `${(collected / total) * 100}%` }" />
      </div>
      <p v-if="allDone" class="mt-3 text-sm font-medium text-forest-dark">{{ t('quiz.allDone') }}</p>
    </div>

    <TransitionGroup
      tag="ol"
      class="mt-6 grid gap-5"
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-3 opacity-0"
    >
      <QuizQuestionCard
        v-for="(question, index) in visibleQuestions"
        :key="question.id"
        :question="question"
        :number="index + 1"
      />
    </TransitionGroup>

    <div v-if="collected > 0" class="mt-8 text-center">
      <button
        type="button"
        class="text-sm text-ink-light underline underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark"
        @click="resetDialog?.showModal()"
      >
        {{ t('quiz.startOver') }}
      </button>
    </div>

    <!-- Room below the newest question, otherwise the page is too short to scroll it to the middle. -->
    <div v-if="!allDone" class="h-[45vh]" aria-hidden="true" />

    <!-- A real dialog instead of window.confirm(): always visible, focus-trapped, closes with Esc. -->
    <dialog
      ref="resetDialog"
      aria-labelledby="reset-title"
      class="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-parchment-light p-6 text-ink shadow-paper-hover ring-1 ring-parchment-dark backdrop:bg-ink/50"
    >
      <h2 id="reset-title" class="font-serif text-xl">{{ t('quiz.resetTitle') }}</h2>
      <p class="mt-2 text-sm leading-relaxed text-ink-light">{{ t('quiz.resetConfirm') }}</p>
      <div class="mt-6 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          autofocus
          class="rounded-full bg-parchment-dark px-4 py-2 text-sm text-ink transition-colors duration-150 hover:bg-parchment-darker"
          @click="resetDialog?.close()"
        >
          {{ t('quiz.cancel') }}
        </button>
        <button
          type="button"
          class="rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-parchment transition-colors duration-150 hover:bg-terracotta-dark"
          @click="confirmStartOver"
        >
          {{ t('quiz.resetButton') }}
        </button>
      </div>
    </dialog>
  </section>
</template>
