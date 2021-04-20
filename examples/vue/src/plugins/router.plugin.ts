/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../router'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
