/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalToastColor = BalNotificationColor
}

namespace BalEvents {
  export type BalToastCloseDetail = string
  export interface BalToastClose extends CustomEvent {
    detail: BalToastCloseDetail
    target: HTMLBalToastElement
  }
}
