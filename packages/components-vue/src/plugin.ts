import { Plugin } from 'vue'
import { BaloiseDesignSystemDynamicConfig, initialize } from '@baloise/design-system-components'
import { applyDirectives } from './directives'

interface BaloiseDesignSystemVueConfig extends BaloiseDesignSystemDynamicConfig {
  defineCustomeElementTag?: boolean
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, config: BaloiseDesignSystemVueConfig = {}) {
    initialize(config)

    if (config && config.defineCustomeElementTag === true) {
      app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyDirectives(app)
  },
}
