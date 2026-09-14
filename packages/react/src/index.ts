import { DsConfig, initializeDesignSystem } from '@baloise/ds-core'

interface DsReactConfig {
  defaults?: DsConfig
}

/**
 * @deprecated Use `DsContext` instead. Wrap the application in `<DsContext>` and pass
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
export { DsContext } from './components/context'
export type { DsContextProps } from './components/context'
export { Modal } from './components/modal'
export type { ModalProps } from './components/modal'
export * from './hooks'
