import type { Plugin } from 'vue'
import type { BalConfig } from '@baloise/ds-core'
import { initialize } from '@baloise/ds-core'
import { applyDirectives } from './directives'
import { BalApp } from './components/BalApp'

interface BaloiseDesignSystemVueConfig {
  defineCustomElementTag?: boolean
  defaults?: BalConfig
}

export const BaloiseDesignSystem: Plugin = {
  async install(app, config: BaloiseDesignSystemVueConfig = {}) {
    initialize(config.defaults)

    if (config && config.defineCustomElementTag === true) {
      app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-')
    }

    applyDirectives(app)

    app.component('bal-app', BalApp)
  },
}

export const createBaloiseDesignSystem = (config: BaloiseDesignSystemVueConfig = {}): Plugin => ({
  async install(app) {
    return BaloiseDesignSystem.install(app, config)
  },
})
