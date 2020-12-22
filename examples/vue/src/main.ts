import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BalUiLibraryPlugin } from '@baloise/ui-library-vue'
import '@baloise/ui-library/dist/ui-library/ui-library.css'

Vue.config.productionTip = false

Vue.use(BalUiLibraryPlugin, {
  defineCustomElements: true,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
