import { Plugin } from 'vue'
import { BaloiseDesignSystemConfig, baloiseDesignSystemDefaultConfig } from '@baloise/design-system-components'
import { applyDirectives } from './directives'

interface BaloiseDesignSystemVueConfig extends BaloiseDesignSystemConfig {
  defineCustomeElementTag?: boolean
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, config: BaloiseDesignSystemVueConfig = baloiseDesignSystemDefaultConfig) {
    if (config && config.defineCustomeElementTag === true) {
      app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyDirectives(app)
  },
}
