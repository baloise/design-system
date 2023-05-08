/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalSnackbarColor = BalNotificationColor
}

namespace BalEvents {
  export interface BalSnackbarCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalSnackbarElement
  }

  export type BalSnackbarCloseDetail = string
  export type BalSnackbarClose = BalSnackbarCustomEvent<BalSnackbarCloseDetail>

  export type BalSnackbarActionDetail = string
  export type BalSnackbarAction = BalSnackbarCustomEvent<BalSnackbarActionDetail>
}
