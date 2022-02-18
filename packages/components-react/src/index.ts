import { initialize, BalConfig } from '@baloise/design-system-components'

interface BaloiseDesignSystemReactConfig {
  defaults?: BalConfig
}

export const useBaloiseDesignSystem = (config: BaloiseDesignSystemReactConfig = {}) => {
  initialize(config.defaults)
}

export * from './components'
