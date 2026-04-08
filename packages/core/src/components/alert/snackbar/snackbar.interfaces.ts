/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace DS {
  export type SnackbarDuration = number | 'infinite'
  export type SnackbarColor = 'base' | 'info' | 'success' | 'warning' | 'danger'

  export interface SnackbarCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalSnackbarElement
  }

  export type SnackbarCloseClickDetail = MouseEvent
  export type SnackbarCloseClick = SnackbarCustomEvent<SnackbarCloseClickDetail>

  export type SnackbarActionClickDetail = MouseEvent
  export type SnackbarActionClick = SnackbarCustomEvent<SnackbarActionClickDetail>
}
