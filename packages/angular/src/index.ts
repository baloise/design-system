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
// Export order matters here: the explicit component exports below must come after
// './generated/proxies' so that they override the auto-generated ones, ensuring the
// versions wired up with the ValueAccessors are the ones consumers actually import.
export * from './generated/proxies'
export * from './forms/value-accessor'
export { DsInput } from './forms/ds-input'
