import type { LocalizedText } from '../types/content'
import type { Country } from './index'

export interface License {
  name: string
  url: string
}

export interface ImageCredit {
  src: string
  /** Caption on the country page; photos without one show just the image. */
  title?: LocalizedText
  /** Left out for images drawn for this site, which need no attribution. */
  author?: string
  /** Where the image comes from, linked as "Source" on the About page. */
  sourceUrl?: string
  /** Licensed (third-party) images are credited on the About page; the project's own photos are not. */
  license?: License
  /** Short explanation of the tradition shown, displayed under the photo on the country page. */
  description?: LocalizedText
}

export const CC_BY_SA_4: License = { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' }

export const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

export const latvianSymbolCredits: ImageCredit[] = [
  {
    src: '/images/symbols/auseklis.svg',
    title: { lv: 'Auseklis', lt: 'Auseklis (Aušrinė)' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Auseklis.svg'),
    license: CC_BY_SA_4,
  },
]



// The Lithuanian symbol used across the site: the rožėlė sash (juosta) motif, drawn cell by cell
// after the chart in the Lithuanian Folk Art Institute's article, which also gives its name and meaning.
const LTFAI_SYMBOLISM = 'https://ltfai.org/the-rich-symbolism-of-lithuanian-folk-art/'

export const lithuanianSymbols: ImageCredit[] = [
  {
    src: '/images/symbols/lt/rozele.svg',
    title: { lv: 'Rožėlė (rozīte, zvaigznīte)', lt: 'Rožėlė (žvaigždutė)' },
    description: {
      lv: 'Rozete – dzīves loka un mūžības zīme.',
      lt: 'Rozetė – gyvenimo rato ir amžinybės ženklas.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
]

/**
 * Photos shown in the Images group of each country page; the first one also opens the slideshow
 * in the page's top-right corner. The project's own photos need no credit; photos from elsewhere
 * get author, sourceUrl and license and are then credited on the About page.
 * Save photos as WebP, at most 1200px on the long side, in public/images/gallery/<country>/.
 */
const DEJU_SKATE_2025: LocalizedText = { lv: 'Deju skate 2025', lt: 'Šokių kolektyvų peržiūra 2025' }

export const galleryByCountry: Record<Country, ImageCredit[]> = {
  latvia: [
    { src: '/images/gallery/latvia/deju-skate-2025-122.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-123.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-127.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-197.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-113.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-119.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-186.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-198.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-178.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-185.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/deju-skate-2025-233.webp', title: DEJU_SKATE_2025 },
    { src: '/images/gallery/latvia/2026-05-28-088.webp' },
    { src: '/images/gallery/latvia/2026-05-28-089.webp' },
    { src: '/images/gallery/latvia/2026-05-28-090.webp' },
    { src: '/images/gallery/latvia/2026-05-28-092.webp' },
    { src: '/images/gallery/latvia/2026-05-28-093.webp' },
    { src: '/images/gallery/latvia/2026-05-28-095.webp' },
    { src: '/images/gallery/latvia/2026-05-28-100.webp' },
    { src: '/images/gallery/latvia/2026-05-28-127.webp' },
    { src: '/images/gallery/latvia/2026-05-28-137.webp' },
    { src: '/images/gallery/latvia/foto-515931146.webp' },
    { src: '/images/gallery/latvia/foto-515171692.webp' },
    { src: '/images/gallery/latvia/foto-514341964.webp' },
    { src: '/images/gallery/latvia/foto-516464293.webp' },
    { src: '/images/gallery/latvia/foto-522709976.webp' },
    { src: '/images/gallery/latvia/foto-514335796.webp' },
    { src: '/images/gallery/latvia/foto-518242257.webp' },
    { src: '/images/gallery/latvia/foto-514336614.webp' },
    { src: '/images/gallery/latvia/foto-683691849.webp' },
    { src: '/images/gallery/latvia/foto-687033804.webp' },
    { src: '/images/gallery/latvia/foto-496449471.webp' },
  ],
  lithuania: [],
}
