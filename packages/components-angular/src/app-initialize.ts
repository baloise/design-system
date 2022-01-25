import { BaloiseDesignSystemUserConfig, initialize, getConfig } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

export const appInitialize = (userConfig: BaloiseDesignSystemUserConfig) => () => {
  return (): Promise<void> => {
    initialize(userConfig)
    const config = getConfig()
    if (config.applyPolyfills) {
      return applyPolyfills().then(() => {
        return defineCustomElements()
      })
    }
    return defineCustomElements()
  }
}
