export * from './components'
import { initialize, BalConfig } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

interface BaloiseDesignSystemReactConfig {
  applyPolyfills?: boolean
  defaults?: BalConfig
}

export const useBaloiseDesignSystem = async (config: BaloiseDesignSystemReactConfig = {}) => {
  initialize(config.defaults)
  if (config.applyPolyfills) {
    await applyPolyfills()
  }
  await defineCustomElements()
}
