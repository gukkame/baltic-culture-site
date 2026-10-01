import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Culture from '../views/Culture.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Quiz from '../views/Quiz.vue'
import About from '../views/About.vue'
import { useLocale } from '../composables/useLocale'
import { aboutPaths, countryFromSlug, countryPath, quizPath } from './paths'

const { locale } = useLocale()

const countryProp = (slug: string | string[]) => {
  const value = String(slug)
  return countryFromSlug(value) ?? value
}

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: quizPath, name: 'quiz', component: Quiz },
  { path: aboutPaths.lv, name: 'about', alias: aboutPaths.lt, component: About },
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

router.beforeEach((to) => {
  if (to.name === 'about') locale.value = to.path === aboutPaths.lt ? 'lt' : 'lv'
})

export default router
