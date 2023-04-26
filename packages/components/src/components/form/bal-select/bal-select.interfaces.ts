/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalSelectFilter = 'includes' | 'starts-with'
}

namespace BalEvents {
  export interface BalSelectCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalSelectElement
  }

  export type BalSelectChangeDetail = string | string[] | undefined
  export type BalSelectChange = BalSelectCustomEvent<BalSelectChangeDetail>

  export type BalSelectBlurDetail = FocusEvent
  export type BalSelectBlur = BalSelectCustomEvent<BalSelectBlurDetail>

  export type BalSelectKeyPressDetail = KeyboardEvent
  export type BalSelectKeyPress = BalSelectCustomEvent<BalSelectKeyPressDetail>

  export type BalSelectFocusDetail = FocusEvent
  export type BalSelectFocus = BalSelectCustomEvent<BalSelectFocusDetail>

  export type BalSelectInputDetail = string
  export type BalSelectInput = BalSelectCustomEvent<BalSelectInputDetail>

  export type BalSelectInputClickDetail = MouseEvent
  export type BalSelectInputClick = BalSelectCustomEvent<BalSelectInputClickDetail>

  export type BalSelectCancelDetail = KeyboardEvent
  export type BalSelectCancel = BalSelectCustomEvent<BalSelectCancelDetail>
}
