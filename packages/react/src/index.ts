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
    httpFormSubmit: false,
  })
}

export type * from './generated/components'
export * from './wrappers'
export { DsRootProvider } from './components/root-provider'
export type { DsRootProviderProps } from './components/root-provider'
export { Modal } from './components/modal'
export type { ModalProps } from './components/modal'
export * from './hooks'
