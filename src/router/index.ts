import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Culture from '../views/Culture.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Quiz from '../views/Quiz.vue'
import Collection from '../views/Collection.vue'
import About from '../views/About.vue'
import { useLocale } from '../composables/useLocale'
import { aboutPaths, countryFromSlug, countryPath, quizPath } from './paths'

const { locale } = useLocale()

// Country slugs map back to the internal country ids the views work with.
const countryProp = (slug: string | string[]) => {
  const value = String(slug)
  return countryFromSlug(value) ?? value
}

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  // "viktorina" is the word in both Latvian (viktorīna) and Lithuanian, ASCII-safe for a URL.
  { path: quizPath, name: 'quiz', component: Quiz },
  { path: '/collection', name: 'collection', component: Collection },
  // One page, one address per language; the address also decides the language (see beforeEach below).
  { path: aboutPaths.lv, name: 'about', alias: aboutPaths.lt, component: About },
  // Old English addresses keep working.
  { path: '/about', redirect: () => aboutPaths[locale.value] },
  { path: '/latvia/:itemId?', redirect: (to) => countryPath('latvia', to.params.itemId as string | undefined) },
  { path: '/lithuania/:itemId?', redirect: (to) => countryPath('lithuania', to.params.itemId as string | undefined) },
  {
    path: '/:country',
    name: 'culture',
    component: Culture,
    props: (route) => ({ country: countryProp(route.params.country) }),
  },
  {
    path: '/:country/:itemId',
    name: 'item-detail',
    component: ItemDetail,
    props: (route) => ({ country: countryProp(route.params.country), itemId: String(route.params.itemId) }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // Reopening the quiz partway through: land on the current question, centered on screen.
    if (to.name === 'quiz') {
      const resume = document.querySelector<HTMLElement>('[data-resume]')
      if (resume) {
        const offset = Math.max(24, (window.innerHeight - resume.offsetHeight) / 2)
        return { el: resume, top: offset, behavior: 'instant' }
      }
    }
    return { top: 0 }
  },
})

// Opening the About page by its Latvian or Lithuanian address switches the site to that language.
router.beforeEach((to) => {
  if (to.name === 'about') locale.value = to.path === aboutPaths.lt ? 'lt' : 'lv'
})

export default router
