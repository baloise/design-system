/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import { applyPolyfills, defineCustomElements } from './lib/loader'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.config.ignoredElements = [/bal-\w*/]
  applyPolyfills().then(() => {
    defineCustomElements()
  })

  window.addEventListener('load', function(event) {
    const list = document.getElementsByClassName('site-name')
    if (list && list.length > 0) {
      const el = list[0]
      el.innerHTML = '<b>Baloise</b> Design System'
    }
  })
}
