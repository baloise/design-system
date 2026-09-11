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

export type * from './generated/components'
export * from './wrappers'
export { Modal } from './components/modal'
export type { ModalProps } from './components/modal'
export * from './hooks'
