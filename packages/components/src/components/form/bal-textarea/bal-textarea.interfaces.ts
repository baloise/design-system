/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalTextareaWrap = 'hard' | 'soft' | 'off'
  export type BalTextareaInputMode = BalInputInputMode
}

namespace BalEvents {
  export interface BalTextareaCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalTextareaElement
  }

  export type BalTextareaChangeDetail = string | undefined
  export type BalTextareaChange = BalTextareaCustomEvent<BalTextareaChangeDetail>

  export type BalTextareaInputDetail = string | undefined
  export type BalTextareaInput = BalTextareaCustomEvent<BalTextareaInputDetail>

  export type BalTextareaBlurDetail = FocusEvent
  export type BalTextareaBlur = BalTextareaCustomEvent<BalTextareaBlurDetail>

  export type BalTextareaKeyPressDetail = KeyboardEvent
  export type BalTextareaKeyPress = BalTextareaCustomEvent<BalTextareaKeyPressDetail>

  export type BalTextareaFocusDetail = FocusEvent
  export type BalTextareaFocus = BalTextareaCustomEvent<BalTextareaFocusDetail>
}
