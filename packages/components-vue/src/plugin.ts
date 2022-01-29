import { Plugin } from 'vue'
import { BalConfig, initialize } from '@baloise/design-system-components'
import { applyDirectives } from './directives'

interface BaloiseDesignSystemVueConfig {
  defineCustomeElementTag?: boolean
  defaults?: BalConfig
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, config: BaloiseDesignSystemVueConfig = {}) {
    initialize(config.defaults)

    if (config && config.defineCustomeElementTag === true) {
      app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyDirectives(app)
  },
}

export const createBaloiseDesignSystem = (config: BaloiseDesignSystemVueConfig = {}): Plugin => ({
  async install(app) {
    return BaloiseDesignSystem.install(app, config)
  },
})
