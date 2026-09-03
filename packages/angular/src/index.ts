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
// A named export (e.g. `DsInput` below) always wins over a colliding `export *` regardless of statement
// order, so this override doesn't depend on where it's placed relative to './generated/proxies' — it's
// listed after purely for readability, to read as "the generated proxies, then their overrides".
export * from './generated/proxies'
export * from './forms/value-accessor'
export { DsInput } from './forms/ds-input'
