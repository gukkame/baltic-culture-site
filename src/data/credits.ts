import type { LocalizedText } from '../types/content'
import type { Country } from './index'

export interface License {
  name: string
  url: string
}

export interface ImageCredit {
  src: string
  title: LocalizedText
  /** Left out for images drawn for this site, which need no attribution. */
  author?: string
  sourceUrl: string
  license?: License
  /** Short explanation of the tradition shown, displayed under the photo on the country page. */
  description?: LocalizedText
}

export const CC_BY_SA_4: License = { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' }
export const CC_BY_SA_3: License = { name: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/' }
export const CC_BY_2: License = { name: 'CC BY 2.0', url: 'https://creativecommons.org/licenses/by/2.0/' }
export const CC_BY_4: License = { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' }
export const CC0: License = { name: 'CC0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' }
export const PUBLIC_DOMAIN: License = { name: 'Public domain', url: 'https://creativecommons.org/publicdomain/mark/1.0/' }

export const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

export const latvianSymbolCredits: ImageCredit[] = [
  {
    src: '/images/symbols/auseklis.svg',
    title: { lv: 'Auseklis', lt: 'Auseklis (Aušrinė)' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Auseklis.svg'),
    license: CC_BY_SA_4,
  },
  {
    src: '/images/symbols/maras-krusts.svg',
    title: { lv: 'Māras krusts', lt: 'Māros kryžius' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Mārakrusts.svg'),
    license: CC_BY_SA_4,
  },
  {
    src: '/images/symbols/laima.svg',
    title: { lv: 'Laimas zīme', lt: 'Laimos ženklas' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Laima.svg'),
    license: CC_BY_SA_4,
  },
  {
    src: '/images/symbols/zalktis.svg',
    title: { lv: 'Zalktis', lt: 'Žaltys' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Zalshka.svg'),
    license: CC_BY_SA_4,
  },
  {
    src: '/images/symbols/baltic-flower.svg',
    title: { lv: 'Baltu zieds', lt: 'Baltų žiedas' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Baltic Flower Snowflake 1.svg'),
    license: CC_BY_SA_3,
  },
]



// Lithuanian woven sash (juosta) motifs, redrawn for this site from the chart in the
// Lithuanian Folk Art Institute's article, which also gives the names and meanings.
const LTFAI_SYMBOLISM = 'https://ltfai.org/the-rich-symbolism-of-lithuanian-folk-art/'

export const lithuanianSymbols: ImageCredit[] = [
  {
    src: '/images/symbols/lt/akute.svg',
    title: { lv: 'Akutė (vārnas actiņa)', lt: 'Akutė (varnos akutė)' },
    description: {
      lv: 'Saukta arī par pasaules nabu – reta un noslēpumaina zīme.',
      lt: 'Dar vadinama pasaulio bamba – retas ir paslaptingas ženklas.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
  {
    src: '/images/symbols/lt/rozele.svg',
    title: { lv: 'Rožėlė (rozīte, zvaigznīte)', lt: 'Rožėlė (žvaigždutė)' },
    description: {
      lv: 'Rozete – dzīves loka un mūžības zīme.',
      lt: 'Rozetė – gyvenimo rato ir amžinybės ženklas.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
  {
    src: '/images/symbols/lt/eglute.svg',
    title: { lv: 'Eglutė (eglīte)', lt: 'Eglutė' },
    description: {
      lv: 'Egle – viens no raksturīgākajiem lietuviešu tautas mākslas kokiem, sievišķs maiguma un rūpju simbols.',
      lt: 'Eglė – vienas būdingiausių lietuvių liaudies meno medžių, moteriškas švelnumo ir globos simbolis.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
  {
    src: '/images/symbols/lt/kryziukas.svg',
    title: { lv: 'Kryžiukas (krustiņš)', lt: 'Kryžiukas (krikštelis)' },
    description: {
      lv: 'Viens no izplatītākajiem jostu rakstu motīviem.',
      lt: 'Vienas dažniausių juostų raštų motyvų.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
  {
    src: '/images/symbols/lt/zaltinelis.svg',
    title: { lv: 'Žaltinėlis (zalktītis)', lt: 'Žaltinėlis' },
    description: {
      lv: 'Zalktis ir nozīmīga būtne lietuviešu ticējumos – mājas un ģimenes sargs.',
      lt: 'Žaltys – svarbi lietuvių tikėjimų būtybė, namų ir šeimos sargas.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
  {
    src: '/images/symbols/lt/ozkapede.svg',
    title: { lv: 'Ožkapėdė (kazas pēdiņa)', lt: 'Ožkapėdė (ožkanagutis)' },
    description: {
      lv: 'Motīva nosaukums nozīmē „kazas pēda”.',
      lt: 'Motyvo pavadinimas reiškia „ožkos pėda“.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
]

/**
 * Photos shown in the image section of each country page (and credited on the About page).
 * Put the files in public/images/gallery/<country>/ and add an entry here, e.g.
 *   {
 *     src: '/images/gallery/latvia/rundale.jpg',
 *     title: { lv: 'Rundāles pils', lt: 'Rundālės rūmai' },
 *     author: 'Author Name',
 *     sourceUrl: commons('Rundale Palace.jpg'),
 *     license: CC_BY_SA_4,
 *   },
 */
export const galleryByCountry: Record<Country, ImageCredit[]> = {
  latvia: [
    {
      src: '/images/gallery/latvia/song-festival-2008.jpg',
      title: { lv: 'Dziesmu svētki 2008', lt: 'Dainų šventė 2008' },
      author: 'Dainis Matisons',
      sourceUrl: commons('Latvian song festival by Dainis Matisons, 2008.jpg'),
      license: CC_BY_2,
    },
  ],
  lithuania: [
    {
      src: '/images/gallery/lithuania/zemaitija-dancers.jpg',
      title: { lv: 'Dejotājas Žemaitijas tautastērpos', lt: 'Šokėjos Žemaitijos tautiniais drabužiais' },
      author: 'Bcecilija',
      sourceUrl: commons('Dancing girls with traditional costumes of Žemaitija.jpg'),
      license: CC_BY_SA_4,
    },
  ],
}
