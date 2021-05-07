import { Plugin } from 'vue'
import { defineCustomElements as defineNativeCustomElements } from '@baloise/design-system-components/dist/custom-elements'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'
import { applyFilters } from './generated/filters'
import { applyComponents } from './generated/components'

interface BaloiseDesignSystemOptions {
  defineCustomeElementTag?: boolean
  useVite?: boolean
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, options: BaloiseDesignSystemOptions = {}) {
    if (options && options.defineCustomeElementTag === true) {
      app.config.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyFilters(app)
    applyComponents(app)

    if (options && options.useVite === true) {
      defineNativeCustomElements()
    } else {
      await applyPolyfills()
      await defineCustomElements()
    }
  },
}
