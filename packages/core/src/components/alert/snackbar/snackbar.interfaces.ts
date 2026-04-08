/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalSnackbarDuration = number | 'infinite'
  export type BalSnackbarColor = 'base' | 'info' | 'success' | 'warning' | 'danger'
}

namespace BalEvents {
  export interface BalSnackbarCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalSnackbarElement
  }

  export type BalSnackbarCloseClickDetail = MouseEvent
  export type BalSnackbarCloseClick = BalSnackbarCustomEvent<BalSnackbarCloseClickDetail>

  export type BalSnackbarActionClickDetail = MouseEvent
  export type BalSnackbarActionClick = BalSnackbarCustomEvent<BalSnackbarActionClickDetail>
}
