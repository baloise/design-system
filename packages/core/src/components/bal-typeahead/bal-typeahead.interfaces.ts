/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTypeaheadSize = '' | 'small'
  export type BalTypeaheadTheme = '' | 'purple'
}

namespace BalEvents {
  export interface BalTypeaheadCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: any // HTMLBalTypeaheadElement
  }

  export type BalTypeaheadChangeDetail = string | string[]
  export type BalTypeaheadChange = BalTypeaheadCustomEvent<BalTypeaheadChangeDetail>

  export type BalTypeaheadBlurDetail = FocusEvent
  export type BalTypeaheadBlur = BalTypeaheadCustomEvent<BalTypeaheadBlurDetail>

  export type BalTypeaheadFocusDetail = FocusEvent
  export type BalTypeaheadFocus = BalTypeaheadCustomEvent<BalTypeaheadFocusDetail>
}
