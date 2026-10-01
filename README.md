# Baltic Culture Site

Latvian and Lithuanian folk dances, songs and traditions side by side, with a quiz and badges.
Part of the Interreg Latvia–Lithuania project CultureLINK (LL-00210). The site is in Latvian and
Lithuanian; page addresses follow the language (`/latvija`, `/lietuva`, `/par-projektu` / `/apie-projekta`, `/viktorina`).

## Stack

- Vue 3 + Vite + TypeScript
- Tailwind CSS v4 (all styling as utility classes; colours, shadows and breakpoints are theme tokens in `src/style.css`)
- vue-router (HTML5 history mode)
- No backend: content is JSON/TypeScript files, quiz progress is kept in `localStorage`

## Project structure

```
public/
  artwork/            home page paintings and map textures
  images/gallery/     photo galleries, one folder per country
  images/symbols/     country symbols (Auseklis, rožėlė)
src/
  data/               content: latvia.json, lithuania.json, quiz.json, credits.ts (photos, symbols)
  i18n/               all interface texts: lv.json, lt.json
  components/home/    home page map
  router/             routes and page addresses (paths.ts)
  views/              Home, Culture (country page), ItemDetail (dance/song page), Quiz, About
```

## Scripts

```
npm install       # install dependencies
npm run dev       # start dev server
npm run build     # type-check (vue-tsc) + production build
npm run preview   # preview the production build
```

## Adding content

Every text exists twice, in Latvian (`lv`) and Lithuanian (`lt`). After any change, run
`npm run build` to check for mistakes, then commit.

### Dances and songs (with videos)

Add an entry to the end of `src/data/latvia.json` or `src/data/lithuania.json`:

```json
{
  "id": "put-vejini",
  "category": "song",
  "difficulty": "beginner",
  "videoUrl": "https://www.youtube.com/watch?v=bevcg5SMJHo",
  "sourceUrl": "https://www.youtube.com/watch?v=bevcg5SMJHo",
  "audioUrl": "",
  "contentStatus": "verified-from-source",
  "title": { "lv": "Pūt, vējiņi", "lt": "Pūt, vējiņi" },
  "tagline": { "lv": "Īss apraksts kartītei", "lt": "Trumpas aprašymas kortelei" },
  "description": { "lv": "Garāks apraksts dziesmas lapai.", "lt": "Ilgesnis aprašymas dainos puslapiui." }
}
```

- `id` becomes the page address (`/latvija/put-vejini`): lowercase letters, digits and hyphens, no diacritics, unique.
- `category`: `"dance"` or `"song"` (decides the Dejas / Dziesmas filter).
- `difficulty`: `"beginner"`, `"intermediate"` or `"advanced"` (stored, not shown at the moment).
- `videoUrl`: a normal YouTube link (`https://www.youtube.com/watch?v=…`). The card thumbnail, hover preview and
  embedded player are made from it automatically, and the video is listed on the About page.
- `sourceUrl`: where the information comes from. Use the video link, or e.g. a dejaszeltafonds.lv page;
  non-YouTube sources are listed as text sources on the About page.
- Titles of folk songs usually stay in the original language in both `lv` and `lt`.
- Prefer videos from official or the performers' own channels; re-uploads can disappear.

### Gallery photos

1. Convert the photo to **WebP, at most 1200 px on the long side** (e.g. with <https://squoosh.app> — free, in the
   browser). Originals from a camera are 2–5 MB; the converted file should be roughly 100–300 KB.
2. Put it in `public/images/gallery/latvia/` or `public/images/gallery/lithuania/`, with a lowercase name
   without spaces or diacritics (e.g. `deju-skate-2025-122.webp`).
3. Add it to `galleryByCountry` in `src/data/credits.ts`:

   ```ts
   { src: '/images/gallery/latvia/deju-skate-2025-122.webp' },
   { src: '/images/gallery/latvia/foto.webp', title: { lv: 'Paraksts', lt: 'Parašas' } },
   ```

   - `title` (optional) is the caption under the photo; without it the photo shows on its own.
   - `description` (optional) adds a second line under the caption.
   - The **first** photo of a country also opens the slideshow in the top-right corner of the country page,
     so put a strong, landscape-format photo first.
   - The project's own photos need nothing else. A photo from elsewhere (e.g. Wikimedia Commons) also needs
     `author`, `sourceUrl` and `license`; it is then credited on the About page automatically. Only use
     photos the project has permission to use.

### Quiz questions

Add to `src/data/quiz.json`. Questions unlock one by one in file order, and the `id` is also the badge.

- Multiple choice: `question`, `options` (list of `{ "lv", "lt" }`), `correct` (index of the right option,
  starting from 0) and `explanation`.
- Open question (any typed answer earns the badge, then `explanation` shows the traditional answer):
  `"type": "open"`, `question` and `explanation`.
- `country`: `"latvia"`, `"lithuania"` or `"both"`; optional `itemId` links the answer to a dance/song page.

### Interface texts

All fixed texts of every page (buttons, headings, the home page, the programme name in the header and footer)
are in `src/i18n/lv.json` and `src/i18n/lt.json`, grouped by page (`home`, `culture`, `item`, `quiz`, `about`);
both files have the same keys.

## Artwork

The home page painting and the map textures in `public/artwork/` are AI-generated painted interpretations
based on photographs supplied by the project, not documentary images. The Lithuanian rožėlė symbol is drawn
after the sash motif chart of the Lithuanian Folk Art Institute; the Auseklis is from Wikimedia Commons
(credited on the About page).

The fonts Playfair Display and Work Sans are self-hosted in `src/assets/fonts/` under the SIL Open Font
License 1.1 (license texts next to the files), so no visitor data goes to Google Fonts.

## Deployment

The site is a static single-page application: no server-side code, database, environment variables or
secrets. Visitor state (language, quiz progress) is stored only in the browser's `localStorage`.

**Build**

Requires Node.js 20.19+ or 22.12+ (Vite 8).

```
npm ci
npm run build
```

The output is the `dist/` folder. Publish its contents on any static web server or hosting (web root, or a
sub-path — see below). Nothing else needs to be installed on the server.

**Server requirements**

- **SPA fallback (required).** Page addresses such as `/latvija/put-vejini` or `/viktorina` are handled in the
  browser. The server must return `dist/index.html` with status 200 for any path that is not an existing file;
  otherwise direct visits and page refreshes return 404.
- **HTTPS** recommended.
- **Caching:** files in `dist/assets/` have content hashes in their names and can be cached long-term
  (e.g. `Cache-Control: public, max-age=31536000, immutable`). `index.html` should not be cached
  (`no-cache`), so new releases appear immediately.
- **Sub-path hosting:** to serve the site under a sub-path (e.g. `https://example.lv/kultura/`), set
  `base: '/kultura/'` in `vite.config.ts` (or build with `npx vite build --base=/kultura/`). Every page address,
  image and icon then includes that prefix; nothing else needs to change. Developers: refer to files in
  `public/` from code through `publicUrl('/images/…')` (`src/publicUrl.ts`) so this keeps working; image paths
  in `src/data/credits.ts` are handled automatically.

**External services** (for firewall or Content-Security-Policy allow-lists). Fonts are self-hosted, so only YouTube is needed:

- `www.youtube.com`, `www.youtube-nocookie.com`, `i.ytimg.com` — embedded videos, previews and thumbnails

Embedded YouTube players are loaded from YouTube; consider this in the site's privacy/cookie notice.

**Updating:** change content (see *Adding content*), rebuild, and replace the published files with the new
`dist/` contents.

## Claude instructions

- Use as little packages as possible
- Use i18 for translations
- Use JSON files for content (dances, songs, quiz questions)
- Use localStorage for quiz progress and badge collection
- Use latest accesability rules
