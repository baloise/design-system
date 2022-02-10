import { BalConfig, initialize } from '@baloise/design-system-next-components'
import { applyPolyfills } from '@baloise/design-system-next-components/loader'

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
