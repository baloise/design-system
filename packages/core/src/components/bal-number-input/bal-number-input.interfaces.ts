/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export interface BalNumberInputCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNumberInputElement
  }

  export type BalNumberInputChangeDetail = number | undefined
  export type BalNumberInputChange = BalNumberInputCustomEvent<BalNumberInputChangeDetail>

  export type BalNumberInputInputDetail = number | undefined
  export type BalNumberInputInput = BalNumberInputCustomEvent<BalNumberInputInputDetail>

  export type BalNumberInputBlurDetail = FocusEvent
  export type BalNumberInputBlur = BalNumberInputCustomEvent<BalNumberInputBlurDetail>

  export type BalNumberInputKeyPressDetail = KeyboardEvent
  export type BalNumberInputKeyPress = BalNumberInputCustomEvent<BalNumberInputKeyPressDetail>

  export type BalNumberInputFocusDetail = FocusEvent
  export type BalNumberInputFocus = BalNumberInputCustomEvent<BalNumberInputFocusDetail>
}
