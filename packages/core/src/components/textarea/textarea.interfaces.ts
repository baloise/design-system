/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type TextareaWrap = 'hard' | 'soft' | 'off'
  export type TextareaInputMode = InputInputMode

  export interface TextareaCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsTextareaElement
  }

  export type TextareaInputDetail = string | null
  export type TextareaInput = TextareaCustomEvent<TextareaInputDetail>

  export type TextareaChangeDetail = string | null
  export type TextareaChange = TextareaCustomEvent<TextareaChangeDetail>

  export type TextareaBlurDetail = FocusEvent
  export type TextareaBlur = TextareaCustomEvent<TextareaBlurDetail>

  export type TextareaKeyPressDetail = KeyboardEvent
  export type TextareaKeyPress = TextareaCustomEvent<TextareaKeyPressDetail>

  export type TextareaFocusDetail = FocusEvent
  export type TextareaFocus = TextareaCustomEvent<TextareaFocusDetail>

  export type TextareaClickDetail = MouseEvent
  export type TextareaClick = TextareaCustomEvent<TextareaClickDetail>
}
