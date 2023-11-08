/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalDateCallback = (dateString: string) => boolean
}

namespace BalEvents {
  export interface BalDateCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalDateElement
  }

  export type BalDateChangeDetail = string | undefined
  export type BalDateChange = BalDateCustomEvent<BalDateChangeDetail>

  export type BalDateInputDetail = string | undefined
  export type BalDateInput = BalDateCustomEvent<BalDateInputDetail>

  export type BalDateBlurDetail = FocusEvent
  export type BalDateBlur = BalDateCustomEvent<BalDateBlurDetail>

  export type BalDateFocusDetail = FocusEvent
  export type BalDateFocus = BalDateCustomEvent<BalDateFocusDetail>

  export type BalDateInputClickDetail = MouseEvent
  export type BalDateInputClick = BalDateCustomEvent<BalDateInputClickDetail>

  export type BalDateIconClickDetail = MouseEvent
  export type BalDateIconClick = BalDateCustomEvent<BalDateIconClickDetail>

  export type BalDateWillAnimateDetail = boolean
  export type BalDateWillAnimate = BalDateCustomEvent<BalDateWillAnimateDetail>

  export type BalDateDidAnimateDetail = boolean
  export type BalDateDidAnimate = BalDateCustomEvent<BalDateDidAnimateDetail>
}
