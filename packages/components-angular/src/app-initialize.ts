import { BalConfig, initialize } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

export interface BaloiseDesignSystemAngularConfig {
  applyPolyfills?: boolean
  defaults?: BalConfig
}

export const appInitialize = (config: BaloiseDesignSystemAngularConfig) => () => {
  return (): Promise<void> => {
    initialize(config.defaults)
    if (config.applyPolyfills) {
      return applyPolyfills().then(() => {
        return defineCustomElements()
      })
    }
    return defineCustomElements()
  }
}
