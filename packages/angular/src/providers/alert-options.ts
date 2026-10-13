import type { Alert } from '@helvetia-design/core'

/**
 * Options for `DsToastService.create()` / `DsSnackbarService.create()`.
 * Mirrors core's `Alert`, with the closable flag and the callbacks optional.
 */
export type DsAlertOptions = Omit<Alert, 'closable' | 'closeHandler' | 'actionHandler'> &
  Partial<Pick<Alert, 'closable' | 'closeHandler' | 'actionHandler'>>

/**
 * Applies the defaults with `??` so an explicit `undefined` (e.g. a forwarded optional callback)
 * cannot replace them. Core's alert container calls both handlers unconditionally.
 */
export const toAlert = (options: DsAlertOptions): Alert => ({
  ...options,
  closable: options.closable ?? false,
  closeHandler: options.closeHandler ?? (() => void 0),
  actionHandler: options.actionHandler ?? (() => void 0),
})
