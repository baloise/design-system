import { Plugin } from 'vue'
import { BaloiseDesignSystemUserConfig, initialize } from '@baloise/design-system-components'
import { applyDirectives } from './directives'

interface BaloiseDesignSystemVueConfig extends BaloiseDesignSystemUserConfig {
  defineCustomeElementTag?: boolean
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, userConfig: BaloiseDesignSystemVueConfig = {}) {
    initialize(userConfig)

    if (userConfig && userConfig.defineCustomeElementTag === true) {
      app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyDirectives(app)
  },
}
