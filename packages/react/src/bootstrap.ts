import { DsConfig, initializeDesignSystem } from '@baloise/ds-core'

interface DsReactConfig {
  defaults?: DsConfig
}

/**
 * @deprecated Use `DsRootProvider` instead. Wrap the application in `<DsRootProvider>` and pass
 * brand, region, language, and other config as props.
 */
export const bootstrapDesignSystem = (config: DsReactConfig = {}) => {
  initializeDesignSystem({
    ...config.defaults,
  })
}
