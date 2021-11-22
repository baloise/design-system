import { Plugin } from 'vue'
import { BaloiseDesignSystemConfig, baloiseDesignSystemDefaultConfig } from '@baloise/design-system-components'
import { defineCustomElements as defineNativeCustomElements } from '@baloise/design-system-components/dist/custom-elements'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'
import { applyComponents } from './generated/components'
import { applyDirectives } from './directives'

interface BaloiseDesignSystemVueConfig extends BaloiseDesignSystemConfig {
  defineCustomeElementTag?: boolean
  useVite?: boolean
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, config: BaloiseDesignSystemVueConfig = baloiseDesignSystemDefaultConfig) {
    if (config && config.defineCustomeElementTag === true) {
      app.config.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyComponents(app)
    applyDirectives(app)

    if (config && config.useVite === true) {
      defineNativeCustomElements()
    } else {
      if (config.applyPolyfills) {
        await applyPolyfills()
      }
      await defineCustomElements()
    }
  },
}
