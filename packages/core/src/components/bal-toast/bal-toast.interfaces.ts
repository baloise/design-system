/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalToastColor = 'base' | 'info' | 'success' | 'warning' | 'danger' | ''
}

namespace BalEvents {
  export interface BalToastCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalToastElement
  }

  export type BalToastCloseClickDetail = MouseEvent
  export type BalToastCloseClick = BalToastCustomEvent<BalToastCloseClickDetail>

  export type BalToastActionClickDetail = MouseEvent
  export type BalToastActionClick = BalToastCustomEvent<BalToastActionClickDetail>
}
