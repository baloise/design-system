import type { BalConfig } from '@baloise/ds-core/components'
import { initializeBaloiseDesignSystem } from '@baloise/ds-core/components'

interface BaloiseDesignSystemReactConfig {
  defaults?: BalConfig
}

export const useBaloiseDesignSystem = (config: BaloiseDesignSystemReactConfig = {}) => {
  initializeBaloiseDesignSystem({
    ...config.defaults,
    httpFormSubmit: false,
    _generateHydrateForCustomElementsOutput: true,
  })
}

export * from './generated/components'
