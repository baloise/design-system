/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace DS {
  export type SnackbarDuration = number | 'infinite'
  export const SNACKBAR_COLORS = ['base', 'info', 'success', 'warning', 'danger'] as const

  export type SnackbarColor = (typeof SNACKBAR_COLORS)[number]

  export interface SnackbarCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsSnackbarElement
  }

  export type SnackbarCloseClickDetail = MouseEvent
  export type SnackbarCloseClick = SnackbarCustomEvent<SnackbarCloseClickDetail>

  export type SnackbarActionClickDetail = MouseEvent
  export type SnackbarActionClick = SnackbarCustomEvent<SnackbarActionClickDetail>
}
