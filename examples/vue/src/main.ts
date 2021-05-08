/* ============
 * Main File
 * ============
 *
 * The main.ts file is the entry point of our web application.
 * Here we add global styling, plugins and define where the should get mounted.
 */

import { createApp } from 'vue'

/* ============
 * Styling
 * ============
 *
 * The global styles are defined in the src/styles/main.scss file.
 *
 * https://sass-lang.com/
 */

import './styles/main.scss'

/* ============
 * Configure App
 * ============
 *
 * In this section we define our entry component and mount it to a dom
 * element form the index.html. Moreover, the plugins get registered.
 *
 * Plugins are self-contained code that usually add global-level functionality to Vue.
 * It is either an object that exposes an install() method, or a function.
 *
 * https://v3.vuejs.org/guide/plugins.html
 */

import { BaloiseDesignSystem } from '@baloise/design-system-components-vue'
import { vueAxios } from '@baloise/vue-axios'
import { router } from './plugins/router.plugin'
import { i18n } from './plugins/i18n.plugin'
import App from './app/App.vue'

createApp(App)
  /**
   * Our router plugins, which sync URLs to views in your app.
   * To define a new route open the src/app/router/routes file.
   */
  .use(router)
  /**
   * The localization plugin to support multiple locals.
   * There are located in the src/i18n folder.
   */
  .use(i18n)
  /**
   * Our plugin to do http request with the axios library.
   */
  .use(vueAxios)
  /**
   * Our Baloise component library.
   * https://baloise-design-system.vercel.app/
   */
  .use(BaloiseDesignSystem, { useVite: false })
  /**
   * Bind the Vue instance to the HTML DOM.
   */
  .mount('#app')
