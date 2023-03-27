/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalSnackbarColor = BalNotificationColor
}

namespace BalEvents {
  export type BalSnackbarCloseDetail = string
  export interface BalSnackbarClose extends CustomEvent {
    detail: BalSnackbarCloseDetail
    target: HTMLBalSnackbarElement
  }

  export type BalSnackbarActionDetail = string
  export interface BalSnackbarAction extends CustomEvent {
    detail: BalSnackbarActionDetail
    target: HTMLBalSnackbarElement
  }
}
