export * from './components'
import { BaloiseDesignSystemConfig, baloiseDesignSystemDefaultConfig } from '@baloise/design-system-next-components'
import { defineCustomElements, applyPolyfills } from '@baloise/design-system-next-components/loader'

export const useBaloiseDesignSystem = async (config: BaloiseDesignSystemConfig = baloiseDesignSystemDefaultConfig) => {
  if (config.applyPolyfills) {
    await applyPolyfills()
  }
  await defineCustomElements()
}
