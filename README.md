# Baltic Culture Site

Static comparison of Latvia and Lithuania folk culture: dances, songs, a quiz, and a badge collection.

## Stack

- Vue 3 + Vite + TypeScript
- Tailwind CSS v4
- vue-router (HTML5 history mode — clean URLs like `/latvia`, no `/#/` prefix)
- No Pinia, no vue-i18n, no backend — hand-rolled locale/quiz composables, JSON content, `localStorage` for progress

## Project structure

```
src/
  composables/   useLocale, useQuizProgress
  router/        route definitions (history mode)
  views/         Home, Culture, ItemDetail, Quiz, Collection
```

## Scripts

```
npm install      # install dependencies
npm run dev       # start dev server
npm run build     # type-check (vue-tsc) + production build
npm run preview   # preview the production build
```

## Deployment

Because routing uses HTML5 history mode, the host must redirect every
unmatched path back to `index.html` — otherwise a direct visit or refresh
on `/latvia` returns a real 404 (unlike hash-mode routing, where nothing
after `#` is ever sent to the server). Add **one** of these, matching
whichever host you actually deploy to — don't add more than one speculatively.

**Netlify or Cloudflare Pages** — create `public/_redirects`:

```
/*    /index.html   200
```

**Vercel** — create `vercel.json` at the repo root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**GitHub Pages** — it can't do server-side rewrites at all, so it needs a
different trick: make `public/404.html` redirect to `index.html` with the
real path encoded in a query string, decoded back by a matching snippet in
`index.html` before the app boots. This is the standard ["spa-github-pages"](https://github.com/rafgraph/spa-github-pages)
approach — copy the `404.html` and `index.html` snippets from that repo if
this ends up being the target. If deploying to a GitHub Pages *project*
page (served under `/<repo-name>/`), also set `pathSegmentsToKeep = 1` in
the 404 script.

## Claude instructions

- Use as little packages as possible
- Use i18 for translations
- Use JSON files for content (dances, songs, quiz questions)
- Use localStorage for quiz progress and badge collection
- Use latest accesability rules
