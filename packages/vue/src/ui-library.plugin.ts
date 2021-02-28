import { Plugin } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import { applyFilters } from './filters'

export const baloiseUiLibrary: Plugin = {
  async install(app) {
    await applyPolyfills()
    await defineCustomElements()

    app.config.isCustomElement = tag => tag.startsWith('bal-')

    applyFilters(app)
  },
}
