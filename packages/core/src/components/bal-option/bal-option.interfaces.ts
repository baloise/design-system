/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {}

namespace BalEvents {
  export interface BalOptionCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalOptionElement
  }

  export interface BalOption {
    value: string
    label: string
    selected: boolean
  }

  export type BalOptionFocusDetail = BalOption
  export type BalOptionFocus = BalOptionCustomEvent<BalOptionFocusDetail>

  export type BalOptionBlurDetail = FocusEvent
  export type BalOptionBlur = BalOptionCustomEvent<BalOptionBlurDetail>

  export type BalOptionChangeDetail = BalOption
  export type BalOptionChange = BalOptionCustomEvent<BalOptionChangeDetail>
}
