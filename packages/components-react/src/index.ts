export * from './components'
import { BaloiseDesignSystemUserConfig, initialize, getConfig } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

export const useBaloiseDesignSystem = async (userConfig: BaloiseDesignSystemUserConfig = {}) => {
  initialize(userConfig)
  const config = getConfig()
  if (config.applyPolyfills) {
    await applyPolyfills()
  }
  await defineCustomElements()
}
