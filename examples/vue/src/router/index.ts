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
    component: () =>
      import(/* webpackChunkName: "form" */ '../app/pages/Form.vue'),
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () =>
      import(/* webpackChunkName: "checkbox" */ '../app/pages/Checkbox.vue'),
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () =>
      import(/* webpackChunkName: "radio" */ '../app/pages/Radio.vue'),
  },
  {
    path: '/datepicker',
    name: 'Datepicker',
    component: () =>
      import(
        /* webpackChunkName: "datepicker" */ '../app/pages/Datepicker.vue'
      ),
  },
  {
    path: '/select',
    name: 'Select',
    component: () =>
      import(/* webpackChunkName: "select" */ '../app/pages/Select.vue'),
  },
]
