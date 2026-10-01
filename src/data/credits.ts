import type { LocalizedText } from '../types/content'
import type { Country } from './index'
import { publicUrl } from '../publicUrl'

export interface License {
  name: string
  url: string
}

export interface ImageCredit {
  src: string
  title?: LocalizedText
  author?: string
  sourceUrl?: string
  license?: License
  description?: LocalizedText
}

export const CC_BY_SA_4: License = { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' }

// Paths here are relative to public/; this adds the site's base path.
function withPublicUrls(images: ImageCredit[]): ImageCredit[] {
  return images.map((image) => ({ ...image, src: publicUrl(image.src) }))
}

export const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

export const latvianSymbols: ImageCredit[] = withPublicUrls([
  {
    src: '/images/symbols/auseklis.svg',
    title: { lv: 'Auseklis', lt: 'Auseklis (Aušrinė)' },
    author: 'RootOfAllLight',
    sourceUrl: commons('Auseklis.svg'),
    license: CC_BY_SA_4,
  },
])

const LTFAI_SYMBOLISM = 'https://ltfai.org/the-rich-symbolism-of-lithuanian-folk-art/'

export const lithuanianSymbols: ImageCredit[] = withPublicUrls([
  {
    src: '/images/symbols/rozele.svg',
    title: { lv: 'Rožėlė (rozīte, zvaigznīte)', lt: 'Rožėlė (žvaigždutė)' },
    description: {
      lv: 'Rozete – dzīves loka un mūžības zīme.',
      lt: 'Rozetė – gyvenimo rato ir amžinybės ženklas.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
])

const DEJU_SKATE_2025: LocalizedText = { lv: 'Deju skate 2025', lt: 'Šokių kolektyvų peržiūra 2025' }

const gallery: Record<Country, ImageCredit[]> = {
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

export const galleryByCountry: Record<Country, ImageCredit[]> = {
  latvia: withPublicUrls(gallery.latvia),
  lithuania: withPublicUrls(gallery.lithuania),
}
