import { DsConfig, initializeDesignSystem } from '@baloise/ds-core'

interface DsAngularConfig {
  defaults?: DsConfig
}

export const bootstrapDesignSystem = (config: DsAngularConfig = {}) => {
  initializeDesignSystem({
    ...config.defaults,
    httpFormSubmit: false,
  })
}

export * from './generated/proxies'
export * from './forms/value-accessor'
export * from './forms/text-value-accessor'
