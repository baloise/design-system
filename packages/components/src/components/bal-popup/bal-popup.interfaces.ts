/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {}

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
