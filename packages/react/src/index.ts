import { DsConfig, initializeDesignSystem } from '@baloise/ds-core'

interface DsReactConfig {
  defaults?: DsConfig
}

export const bootstrapDesignSystem = (config: DsReactConfig = {}) => {
  initializeDesignSystem({
    ...config.defaults,
    httpFormSubmit: false,
  })
}

export * from './generated/components'
