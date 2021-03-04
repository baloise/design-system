/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import { applyPolyfills, defineCustomElements } from './public/lib/loader'
import { balSnackbarController, balToastController } from './public/lib/dist'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.config.ignoredElements = [/bal-\w*/]
  applyPolyfills().then(() =>
    defineCustomElements().then(() => {
      window.balToastController = balToastController
      window.balSnackbarController = balSnackbarController
    }),
  )
}
