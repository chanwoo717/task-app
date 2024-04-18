import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('../views/WeatherView.vue')
  },
  {
    path:'/todo',
    name:'todo',
    component: () => import('../views/TodoView.vue')
  },
  {
    path:'/calculator',
    name:'calculator',
    component: () => import('../views/CalcView.vue')
  },
  {
    path:'/map',
    name:'map',
    component: () => import('../views/MapView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
