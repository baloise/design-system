import { BaloiseDesignSystemDynamicConfig, initialize } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

export interface BaloiseDesignSystemAngularConfig extends BaloiseDesignSystemDynamicConfig {
  applyPolyfills?: boolean
}

export const appInitialize = (config: BaloiseDesignSystemAngularConfig) => () => {
  return (): Promise<void> => {
    initialize(config)
    if (config.applyPolyfills) {
      return applyPolyfills().then(() => {
        return defineCustomElements()
      })
    }
    return defineCustomElements()
  }
}
