/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalTextareaWrap = 'hard' | 'soft' | 'off'
  export type BalTextareaInputMode = BalInputInputMode
}

namespace BalEvents {
  export type BalTextareaChangeDetail = string | undefined
  export interface BalTextareaChange extends CustomEvent {
    detail: BalTextareaChangeDetail
    target: HTMLBalTextareaElement
  }

  export type BalTextareaInputDetail = string | undefined
  export interface BalTextareaInput extends CustomEvent {
    detail: BalTextareaInputDetail
    target: HTMLBalTextareaElement
  }

  export type BalTextareaBlurDetail = FocusEvent
  export interface BalTextareaBlur extends CustomEvent {
    detail: BalTextareaBlurDetail
    target: HTMLBalTextareaElement
  }

  export type BalTextareaKeyPressDetail = KeyboardEvent
  export interface BalTextareaKeyPress extends CustomEvent {
    detail: BalTextareaKeyPressDetail
    target: HTMLBalTextareaElement
  }

  export type BalTextareaFocusDetail = FocusEvent
  export interface BalTextareaFocus extends CustomEvent {
    detail: BalTextareaFocusDetail
    target: HTMLBalTextareaElement
  }
}
