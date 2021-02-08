import './style.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BalUiLibraryPlugin } from '@baloise/ui-library-vue'

Vue.config.productionTip = false

Vue.use(BalUiLibraryPlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
