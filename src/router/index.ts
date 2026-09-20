import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Culture from '../views/Culture.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Quiz from '../views/Quiz.vue'
import Collection from '../views/Collection.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/culture/:country', name: 'culture', component: Culture, props: true },
  {
    path: '/culture/:country/:itemId',
    name: 'item-detail',
    component: ItemDetail,
    props: true,
  },
  { path: '/quiz', name: 'quiz', component: Quiz },
  { path: '/collection', name: 'collection', component: Collection },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
