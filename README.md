# Baltic Culture Site

Static comparison of Latvia and Lithuania folk culture: dances, songs, a quiz, and a badge collection.

## Stack

- Vue 3 + Vite + TypeScript
- Tailwind CSS v4
- vue-router (hash mode, for zero-server-config hosting)
- No Pinia, no vue-i18n, no backend — hand-rolled locale/quiz composables, JSON content, `localStorage` for progress

## Project structure

```
src/
  composables/   useLocale, useQuizProgress
  router/        route definitions (hash history)
  views/         Home, Culture, ItemDetail, Quiz, Collection
```

## Scripts

```
npm run dev       # start dev server
npm run build     # type-check (vue-tsc) + production build
npm run preview   # preview the production build
```
