export * from './components'
import { initialize, BaloiseDesignSystemDynamicConfig } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

interface BaloiseDesignSystemReactConfig extends BaloiseDesignSystemDynamicConfig {
  applyPolyfills?: boolean
}

export const useBaloiseDesignSystem = async (config: BaloiseDesignSystemReactConfig = {}) => {
  initialize(config)
  if (config.applyPolyfills) {
    await applyPolyfills()
  }
  await defineCustomElements()
}
