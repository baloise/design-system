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
export * from './components'
export { Modal, useModal } from './idioms/modal'
export type { ModalProps } from './idioms/modal'
export { useToast } from './idioms/toast'
export { useSnackbar } from './idioms/snackbar'
