import { DsConfig, initializeDesignSystem } from '@helvetia-design/core'

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
