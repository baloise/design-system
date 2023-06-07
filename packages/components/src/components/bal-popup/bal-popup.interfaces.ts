/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalPopupTouchPosition = 'top' | 'bottom'
  export type BalPopupVariant = 'popover' | 'fullscreen' | 'drawer'

  export type BalPopupPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
}

namespace BalEvents {
  export interface BalPopupCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalPopupElement
  }

  export type BalPopupChangeDetail = boolean
  export type BalPopupChange = BalPopupCustomEvent<BalPopupChangeDetail>

  export type BalPopupWillAnimateDetail = boolean
  export type BalPopupWillAnimate = BalPopupCustomEvent<BalPopupWillAnimateDetail>

  export type BalPopupDidAnimateDetail = boolean
  export type BalPopupDidAnimate = BalPopupCustomEvent<BalPopupDidAnimateDetail>
}
