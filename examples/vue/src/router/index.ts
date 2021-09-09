import { RouteRecordRaw } from 'vue-router'
import Home from '../app/pages/Home.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "form" */ '../app/pages/Form.vue'),
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "table" */ '../app/pages/Table.vue'),
  },
  {
    path: '/pipes',
    name: 'Pipes',
    component: () => import(/* webpackChunkName: "pipes" */ '../app/pages/Pipes.vue'),
  },
  {
    path: '/modal',
    name: 'Modal',
    component: () => import(/* webpackChunkName: "modal" */ '../app/pages/Modal.vue'),
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import(/* webpackChunkName: "services" */ '../app/pages/Services.vue'),
  },
]
