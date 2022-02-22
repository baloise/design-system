import { initialize, BalConfig } from '@baloise/design-system-next-components'

interface BaloiseDesignSystemReactConfig {
  defaults?: BalConfig
}

export const useBaloiseDesignSystem = (config: BaloiseDesignSystemReactConfig = {}) => {
  initialize(config.defaults)
}

export * from './components'
