export * from './components'
import { initialize, BalConfig } from '@baloise/design-system-next-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-next-components/loader'

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
