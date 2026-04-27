/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export interface NumberInputCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsNumberInputElement
  }

  export type NumberInputChangeDetail = number | null
  export type NumberInputChange = NumberInputCustomEvent<NumberInputChangeDetail>

  export type NumberInputInputDetail = number | null
  export type NumberInputInput = NumberInputCustomEvent<NumberInputInputDetail>

  export type NumberInputBlurDetail = FocusEvent
  export type NumberInputBlur = NumberInputCustomEvent<NumberInputBlurDetail>

  export type NumberInputKeyPressDetail = KeyboardEvent
  export type NumberInputKeyPress = NumberInputCustomEvent<NumberInputKeyPressDetail>

  export type NumberInputFocusDetail = FocusEvent
  export type NumberInputFocus = NumberInputCustomEvent<NumberInputFocusDetail>

  export type NumberInputClickDetail = MouseEvent
  export type NumberInputClick = NumberInputCustomEvent<NumberInputClickDetail>
}
