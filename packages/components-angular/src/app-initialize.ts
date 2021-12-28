import { BaloiseDesignSystemConfig } from '@baloise/design-system-next-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-next-components/loader'

export const appInitialize = (config: BaloiseDesignSystemConfig) => () => {
  return (): Promise<void> => {
    if (config.applyPolyfills) {
      return applyPolyfills().then(() => {
        return defineCustomElements()
      })
    }
    return defineCustomElements()
  }
}
