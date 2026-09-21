<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { QuizQuestion } from '../types/content'
import { useLocale } from '../composables/useLocale'
import { useQuizProgress } from '../composables/useQuizProgress'
import { findItem } from '../data'
import BadgeSeal from './BadgeSeal.vue'

const props = defineProps<{
  question: QuizQuestion
  number: number
}>()

const { locale, t } = useLocale()
const { recordAnswer, hasBadge } = useQuizProgress()

// The badge is the source of truth for "solved", so it survives reloads and a reset.
const solved = computed(() => hasBadge(props.question.id))
const picked = ref<number>()
const wrong = computed(() => !solved.value && picked.value !== undefined)

// Start fresh if progress is reset while the page is open.
watch(solved, (isSolved) => {
  if (!isSolved) picked.value = undefined
})

function pick(index: number) {
  if (solved.value) return
  picked.value = index
  const correct = index === props.question.correct
  recordAnswer(props.question.id, correct, correct ? props.question.id : undefined)
}

const relatedItem = computed(() =>
  props.question.itemId && props.question.country !== 'both'
    ? findItem(props.question.country, props.question.itemId)
    : undefined,
)

const countryLabel = computed(() =>
  props.question.country === 'both' ? t('quiz.both') : t(`common.${props.question.country}`),
)

function optionClass(index: number): string {
  if (solved.value) {
    return index === props.question.correct
      ? 'border-forest bg-forest/10 text-ink'
      : 'border-parchment-darker bg-parchment-light text-ink-light opacity-60'
  }
  if (picked.value === index) return 'border-terracotta bg-terracotta/10 text-ink'
  return 'border-parchment-darker bg-parchment-light text-ink hover:border-terracotta/50 hover:bg-parchment'
}
</script>

<template>
  <li
    :id="`q-${question.id}`"
    class="rounded-2xl bg-parchment-light p-5 shadow-paper ring-1 ring-parchment-dark sm:p-6"
  >
    <div class="flex items-start justify-between gap-4">
      <p class="text-xs text-ink-light">
        {{ number }} · <span class="font-medium">{{ countryLabel }}</span>
      </p>
      <BadgeSeal v-if="solved" :country="question.country" :label="t('quiz.badgeEarned')" :size="44" class="-mt-1 shrink-0" />
    </div>

    <h2 class="mt-2 font-serif text-xl text-ink">{{ question.question[locale] }}</h2>

    <div role="group" :aria-label="question.question[locale]" class="mt-4 grid gap-2">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        type="button"
        :disabled="solved"
        :aria-pressed="picked === index || (solved && index === question.correct)"
        class="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition duration-200"
        :class="optionClass(index)"
        @click="pick(index)"
      >
        <span
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-parchment-dark text-xs font-medium text-ink-light"
          aria-hidden="true"
        >
          {{ String.fromCharCode(65 + index) }}
        </span>
        <span>{{ option[locale] }}</span>
      </button>
    </div>

    <div aria-live="polite">
      <div v-if="wrong" class="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <p class="font-medium text-terracotta-dark">{{ t('quiz.incorrect') }}</p>
        <button
          type="button"
          class="rounded-full bg-parchment-dark px-3 py-1.5 text-ink transition-colors duration-150 hover:bg-parchment-darker"
          @click="picked = undefined"
        >
          {{ t('quiz.tryAgain') }}
        </button>
      </div>

      <div v-else-if="solved" class="mt-4 text-sm">
        <p class="font-medium text-forest-dark">{{ t('quiz.correct') }} {{ t('quiz.badgeEarned') }}</p>
        <p class="mt-1 leading-relaxed text-ink">{{ question.explanation[locale] }}</p>
        <RouterLink
          v-if="relatedItem"
          :to="`/${question.country}/${relatedItem.id}`"
          class="mt-2 inline-block text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
        >
          {{ t('quiz.learnMore') }}: {{ relatedItem.title[locale] }} →
        </RouterLink>
      </div>
    </div>
  </li>
</template>
