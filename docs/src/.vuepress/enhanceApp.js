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

  document.onreadystatechange = () => {
    if (document.readyState == 'complete') {
      console.log('Page completed with image and files!')
      const siteNameElements = document.getElementsByClassName('site-name')
      if (siteNameElements && siteNameElements.length > 0) {
        const siteNameElement = siteNameElements[0]
        siteNameElement.innerHTML = '<b>Baloise</b> Design System'
      }
      // fetch to next page or some code
    }
  }
}
