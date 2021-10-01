export * from './components'
import { BaloiseDesignSystemConfig, baloiseDesignSystemDefaultConfig } from '@baloise/design-system-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

export const useBaloiseDesignSystem = async (config: BaloiseDesignSystemConfig = baloiseDesignSystemDefaultConfig) => {
  if (config.applyPolyfills) {
    await applyPolyfills()
  }
  await defineCustomElements()
}
