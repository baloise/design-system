import { BalConfig, initialize } from '@baloise/design-system-next-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-next-components/loader'

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
