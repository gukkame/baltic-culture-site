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
export const CC_BY_SA_2: License = { name: 'CC BY-SA 2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0/' }
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
 * Photos shown in the Images group of each country page (and credited on the About page).
 * The first one also appears in the page's top-right corner. Save photos as WebP, at most
 * 1200px on the long side (they are shown far smaller), to keep the pages light.
 * Put the files in public/images/gallery/<country>/ and add an entry here, e.g.
 *   {
 *     src: '/images/gallery/latvia/rundale.webp',
 *     title: { lv: 'Rundāles pils', lt: 'Rundālės rūmai' },
 *     author: 'Author Name',
 *     sourceUrl: commons('Rundale Palace.jpg'),
 *     license: CC_BY_SA_4,
 *   },
 */
export const galleryByCountry: Record<Country, ImageCredit[]> = {
  latvia: [
    {
      src: '/images/gallery/latvia/dzintarins-1.webp',
      title: { lv: 'Deju ansamblis „Dzintariņš”, Rīga', lt: 'Šokių ansamblis „Dzintariņš“, Ryga' },
      author: 'Richard Maack',
      sourceUrl: commons('Latvia, Riga, Dzintarins Folk Dance Ensemble 150502-1.jpg'),
      license: CC_BY_4,
    },
    {
      src: '/images/gallery/latvia/maras-zeme-2018.webp',
      title: { lv: 'Deju lieluzvedums „Māras zeme”, 2018', lt: 'Šokių spektaklis „Māras zeme“, 2018' },
      author: 'Ieva Ābele, Saeima',
      sourceUrl: commons('Dziesmu un deju svētku pasākumi 2018 (41456017810).jpg'),
      license: CC_BY_SA_2,
    },
    {
      src: '/images/gallery/latvia/dzintarins-3.webp',
      title: { lv: 'Dejotājas tautastērpos, „Dzintariņš”', lt: 'Šokėjos tautiniais drabužiais, „Dzintariņš“' },
      author: 'Richard Maack',
      sourceUrl: commons('Latvia, Riga, Dzintarins Folk Dance Ensemble 150502-3.jpg'),
      license: CC_BY_4,
    },
    {
      src: '/images/gallery/latvia/song-festival-2008.webp',
      title: { lv: 'Dziesmu svētki 2008', lt: 'Dainų šventė 2008' },
      author: 'Dainis Matisons',
      sourceUrl: commons('Latvian song festival by Dainis Matisons, 2008.jpg'),
      license: CC_BY_2,
    },
    {
      src: '/images/gallery/latvia/senatne-1953.webp',
      title: { lv: 'Deju kopa „Senatne” Brisbenā, 1953', lt: 'Šokių grupė „Senatne“ Brisbene, 1953' },
      author: 'State Library of Queensland',
      sourceUrl: commons('StateLibQld 2 129059 Latvian folk group dancing, Brisbane, 1953.jpg'),
      license: PUBLIC_DOMAIN,
    },
  ],
  lithuania: [
    {
      src: '/images/gallery/lithuania/zemaitija-dancers.webp',
      title: { lv: 'Dejotājas Žemaitijas tautastērpos', lt: 'Šokėjos Žemaitijos tautiniais drabužiais' },
      author: 'Bcecilija',
      sourceUrl: commons('Dancing girls with traditional costumes of Žemaitija.jpg'),
      license: CC_BY_SA_4,
    },
    {
      src: '/images/gallery/lithuania/folk-dances.webp',
      title: { lv: 'Lietuviešu tautas dejas', lt: 'Lietuvių liaudies šokiai' },
      author: 'Gabija',
      sourceUrl: commons('Lithuanian folk dances 01.jpg'),
      license: CC_BY_SA_4,
    },
    {
      src: '/images/gallery/lithuania/sutartines.webp',
      title: { lv: 'Sutartiņu dziedātājas', lt: 'Sutartinių dainininkės' },
      author: 'Bcecilija',
      sourceUrl: commons('Sutartinės.jpg'),
      license: CC_BY_SA_4,
    },
    {
      src: '/images/gallery/lithuania/folklore-performance.webp',
      title: { lv: 'Folkloras kopas uzstāšanās', lt: 'Folkloro ansamblio pasirodymas' },
      author: 'Gailė Paštukaitė',
      sourceUrl: commons('Lithuanian folklore performance.jpg'),
      license: CC_BY_SA_3,
    },
    {
      src: '/images/gallery/lithuania/dainu-svente-2009.webp',
      title: { lv: 'Dziesmu svētki Viļņā, 2009', lt: 'Dainų šventė Vilniuje, 2009' },
      author: 'Andrius Vanagas',
      sourceUrl: commons('Dainu svente 2009-07-06.jpg'),
      license: CC_BY_SA_3,
    },
    {
      src: '/images/gallery/lithuania/dainu-svente-1924.webp',
      title: { lv: 'Pirmie Lietuvas Dziesmu svētki, Kauņa, 1924', lt: 'Pirmoji Lietuvos dainų šventė, Kaunas, 1924' },
      author: 'Jasvoinas',
      sourceUrl: commons('The first song festival in Lithuania in 1924.jpeg'),
      license: CC0,
    },
  ],
}
