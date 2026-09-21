import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Culture from '../views/Culture.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Quiz from '../views/Quiz.vue'
import Collection from '../views/Collection.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  // "viktorina" is the word in both Latvian (viktorīna) and Lithuanian, ASCII-safe for a URL.
  { path: '/viktorina', name: 'quiz', component: Quiz },
  { path: '/collection', name: 'collection', component: Collection },
  {
    path: '/:country',
    name: 'culture',
    component: Culture,
    props: true,
  },
  {
    path: '/:country/:itemId',
    name: 'item-detail',
    component: ItemDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
