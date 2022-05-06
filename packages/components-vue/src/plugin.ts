import { Plugin } from 'vue'
import { BalConfig, initialize } from '@baloise/design-system-components'
import { applyDirectives } from './directives'
// import { applyComponents } from './components.generated'
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
    // applyComponents(app)
  },
}

export const createBaloiseDesignSystem = (config: BaloiseDesignSystemVueConfig = {}): Plugin => ({
  async install(app) {
    return BaloiseDesignSystem.install(app, config)
  },
})
