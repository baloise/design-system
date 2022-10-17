import { BalConfig, initialize } from '@baloise/design-system-components'
import { applyPolyfills } from '@baloise/design-system-components/loader'

export interface BaloiseDesignSystemAngularConfig {
  applyPolyfills?: boolean
  defaults?: BalConfig
}

export const appInitialize = (config: BaloiseDesignSystemAngularConfig) => () => {
  return async (): Promise<void> => {
    initialize(config.defaults)
    if (config.applyPolyfills) {
      await applyPolyfills()
    }
  }
}
