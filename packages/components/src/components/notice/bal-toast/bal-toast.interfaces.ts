/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalToastColor = BalNotificationColor
}

namespace BalEvents {
  export interface BalToastCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalToastElement
  }

  export type BalToastCloseDetail = string
  export type BalToastClose = BalToastCustomEvent<BalToastCloseDetail>
}
