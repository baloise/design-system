import { initialize } from '@baloise/ds-core'
import type { BalConfig } from '@baloise/ds-core'

interface BaloiseDesignSystemReactConfig {
  defaults?: BalConfig
}

export const useBaloiseDesignSystem = (config: BaloiseDesignSystemReactConfig = {}) => {
  initialize({
    ...config.defaults,
    httpFormSubmit: false,
  })
}

export * from './generated/proxies'
