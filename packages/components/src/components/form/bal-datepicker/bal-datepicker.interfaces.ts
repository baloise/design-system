/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalDatepickerCallback = (dateString: string) => boolean
}

namespace BalEvents {
  export interface BalDatepickerCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalDatepickerElement
  }

  export type BalDatepickerChangeDetail = string | undefined
  export type BalDatepickerChange = BalDatepickerCustomEvent<BalDatepickerChangeDetail>

  export type BalDatepickerInputDetail = string | undefined
  export type BalDatepickerInput = BalDatepickerCustomEvent<BalDatepickerInputDetail>

  export type BalDatepickerBlurDetail = FocusEvent
  export type BalDatepickerBlur = BalDatepickerCustomEvent<BalDatepickerBlurDetail>

  export type BalDatepickerFocusDetail = FocusEvent
  export type BalDatepickerFocus = BalDatepickerCustomEvent<BalDatepickerFocusDetail>

  export type BalDatepickerInputClickDetail = MouseEvent
  export type BalDatepickerInputClick = BalDatepickerCustomEvent<BalDatepickerInputClickDetail>

  export type BalDatepickerIconClickDetail = MouseEvent
  export type BalDatepickerIconClick = BalDatepickerCustomEvent<BalDatepickerIconClickDetail>
}
