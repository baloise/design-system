import { Plugin } from 'vue'
import { defineCustomElements as defineNativeCustomElements } from '@baloise/ui-library/dist/custom-elements'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import { applyFilters } from './generated/filters'
import { applyComponents } from './generated/components'

interface BaloiseUiLibraryOptions {
  defineCustomeElementTag?: boolean
  useVite?: boolean
}

export const baloiseUiLibrary: Plugin = {
  async install(app, options: BaloiseUiLibraryOptions = {}) {
    if (options && options.useVite === true) {
      await defineNativeCustomElements()
    } else {
      await applyPolyfills()
      await defineCustomElements()
    }

    if (options && options.defineCustomeElementTag === true) {
      app.config.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyFilters(app)
    applyComponents(app)
  },
}
