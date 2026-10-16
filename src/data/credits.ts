import type { Country, LocalizedText } from '../types/content'
import { publicUrl } from '../publicUrl'

interface License {
  name: string
  url: string
}

interface ImageCredit {
  src: string
  title?: LocalizedText
  author?: string
  sourceUrl?: string
  license?: License
  description?: LocalizedText
}

const CC_BY_SA_4: License = { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' }

// Paths here are relative to public/; this adds the site's base path.
function withPublicUrls(images: ImageCredit[]): ImageCredit[] {
  return images.map((image) => ({ ...image, src: publicUrl(image.src) }))
}

const commons = (file: string) =>
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
    title: { lv: 'Roželė (rozīte, zvaigznīte)', lt: 'Roželė (žvaigždutė)' },
    description: {
      lv: 'Roželė – dzīves loka un mūžības zīme.',
      lt: 'Roželė – gyvenimo rato ir amžinybės ženklas.',
    },
    sourceUrl: LTFAI_SYMBOLISM,
  },
])

const DEJU_SKATE_2025: LocalizedText = { lv: 'Deju skate 2025', lt: 'Šokių kolektyvų peržiūra 2025' }
const LT_SONG_FESTIVAL_2026: LocalizedText = {
  lv: 'Lietuvas skolēnu dziesmu svētki 2026',
  lt: 'Lietuvos moksleivių dainų šventė 2026',
}
const LT_DANCERS_IN_COSTUME: LocalizedText = { lv: 'Dejotāji tautastērpos', lt: 'Šokėjai tautiniais drabužiais' }
const LT_LEK_GERVELE: LocalizedText = {
  lv: 'Tradicionālā deja „Lėk, gervele“',
  lt: 'Tradicinis šokis „Lėk, gervele“',
}

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
    { src: '/images/gallery/latvia/folk-children-meadow.webp' },
    { src: '/images/gallery/latvia/folk-children-festival.webp' },
    { src: '/images/gallery/latvia/folk-ensemble-cabin.webp' },
    { src: '/images/gallery/latvia/young-accordionist.webp' },
    { src: '/images/gallery/latvia/young-violinist.webp' },
    { src: '/images/gallery/latvia/three-girls-forest.webp' },
    { src: '/images/gallery/latvia/folk-girls-forest.webp' },
    { src: '/images/gallery/latvia/folk-musicians-stage.webp' },
    { src: '/images/gallery/latvia/folk-ensemble-riverside.webp' },
    { src: '/images/gallery/latvia/children-in-folk-costume-forest.webp' },
    { src: '/images/gallery/latvia/accordionist-with-doll.webp' },
  ],
  lithuania: [
    {
      src: '/images/gallery/lithuania/folklore-ensemble.webp',
      title: { lv: 'Folkloras ansamblis', lt: 'Folkloro ansamblis' },
    },
    { src: '/images/gallery/lithuania/women-in-striped-shawls.webp', title: LT_DANCERS_IN_COSTUME },
    { src: '/images/gallery/lithuania/dancing-in-the-rain.webp', title: LT_LEK_GERVELE },
    { src: '/images/gallery/lithuania/schoolchildren-song-festival-2026-1.webp', title: LT_SONG_FESTIVAL_2026 },
    {
      src: '/images/gallery/lithuania/circle-with-woven-sashes.webp',
      title: { lv: 'Tradicionālā deja „Abrūsėlis“', lt: 'Tradicinis šokis „Abrūsėlis“' },
    },
    { src: '/images/gallery/lithuania/dancers-by-church.webp', title: LT_DANCERS_IN_COSTUME },
    {
      src: '/images/gallery/lithuania/mustokine.webp',
      title: { lv: 'Tradicionālā deja „Muštokinė“', lt: 'Tradicinis šokis „Muštokinė“' },
    },
    {
      src: '/images/gallery/lithuania/selininkai.webp',
      title: { lv: 'Tradicionālā deja „Sėlininkai“', lt: 'Tradicinis šokis „Sėlininkai“' },
    },
    { src: '/images/gallery/lithuania/schoolchildren-song-festival-2026-2.webp', title: LT_SONG_FESTIVAL_2026 },
    { src: '/images/gallery/lithuania/young-dancers.webp', title: LT_LEK_GERVELE },
    {
      src: '/images/gallery/lithuania/accordionist.webp',
      title: { lv: 'Jaunais akordeonists', lt: 'Jaunasis armonikierius' },
    },
  ],
}

export const galleryByCountry: Record<Country, ImageCredit[]> = {
  latvia: withPublicUrls(gallery.latvia),
  lithuania: withPublicUrls(gallery.lithuania),
}
