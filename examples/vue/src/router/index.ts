import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () => import('../views/Checkbox.vue'),
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import('../views/Radio.vue'),
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import('../views/Input.vue'),
  },
  {
    path: '/datepicker',
    name: 'Datepicker',
    component: () => import('../views/Datepicker.vue'),
  },
  {
    path: '/select',
    name: 'Select',
    component: () => import('../views/Select.vue'),
  },
  {
    path: '/timeinput',
    name: 'Timeinput',
    component: () => import('../views/Timeinput.vue'),
  },
  {
    path: '/toast',
    name: 'Toast',
    component: () => import('../views/Toast.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
