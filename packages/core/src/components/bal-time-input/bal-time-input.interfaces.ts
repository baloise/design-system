/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export interface BalTimeInputCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalTimeInputElement
  }

  export type BalTimeInputChangeDetail = string | undefined
  export type BalTimeInputChange = BalTimeInputCustomEvent<BalTimeInputChangeDetail>

  export type BalTimeInputInputDetail = string | undefined
  export type BalTimeInputInput = BalTimeInputCustomEvent<BalTimeInputInputDetail>

  export type BalTimeInputBlurDetail = FocusEvent
  export type BalTimeInputBlur = BalTimeInputCustomEvent<BalTimeInputBlurDetail>

  export type BalTimeInputKeyPressDetail = KeyboardEvent
  export type BalTimeInputKeyPress = BalTimeInputCustomEvent<BalTimeInputKeyPressDetail>

  export type BalTimeInputFocusDetail = FocusEvent
  export type BalTimeInputFocus = BalTimeInputCustomEvent<BalTimeInputFocusDetail>

  export type BalTimeInputClickDetail = MouseEvent
  export type BalTimeInputClick = BalTimeInputCustomEvent<BalTimeInputClickDetail>
}
