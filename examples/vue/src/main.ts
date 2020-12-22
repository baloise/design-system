import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BalUiLibraryPlugin } from '@baloise/ui-library-next-vue'
import '@baloise/ui-library-next/dist/ui-library-next/ui-library-next.css'

Vue.config.productionTip = false

Vue.use(BalUiLibraryPlugin, {
  defineCustomElements: true,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
