import { App } from 'vue'

export const applyDirectives = (app: App) => {
  // Register a global custom directive called `v-focus`
  app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
      // Focus the element
      el.focus()
    },
  })
}
