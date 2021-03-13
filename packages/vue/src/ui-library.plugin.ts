import { Plugin } from 'vue'
import { defineCustomElements } from '@baloise/ui-library/dist/custom-elements'
import { applyFilters } from './filters'

export const baloiseUiLibrary: Plugin = {
  async install(app) {
    defineCustomElements()

    app.config.isCustomElement = tag => tag.startsWith('bal-')

    applyFilters(app)
  },
}
