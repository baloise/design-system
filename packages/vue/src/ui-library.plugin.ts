import { Plugin } from 'vue'
import { defineCustomElements } from '@baloise/ui-library/dist/custom-elements'
import { applyFilters } from './generated/filters'
import { applyComponents } from './generated/components'

export const baloiseUiLibrary: Plugin = {
  async install(app, options) {
    defineCustomElements()

    if (options && options.setIsCustomElementFunction === true) {
      app.config.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyFilters(app)
    applyComponents(app)
  },
}
