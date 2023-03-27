/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalNumberInputChangeDetail = number | undefined
  export interface BalNumberInputChange extends CustomEvent {
    detail: BalNumberInputChangeDetail
    target: HTMLBalNumberInputElement
  }

  export type BalNumberInputInputDetail = number | undefined
  export interface BalNumberInputInput extends CustomEvent {
    detail: BalNumberInputInputDetail
    target: HTMLBalNumberInputElement
  }

  export type BalNumberInputBlurDetail = FocusEvent
  export interface BalNumberInputBlur extends CustomEvent {
    detail: BalNumberInputBlurDetail
    target: HTMLBalNumberInputElement
  }

  export type BalNumberInputKeyPressDetail = KeyboardEvent
  export interface BalNumberInputKeyPress extends CustomEvent {
    detail: BalNumberInputKeyPressDetail
    target: HTMLBalNumberInputElement
  }

  export type BalNumberInputFocusDetail = FocusEvent
  export interface BalNumberInputFocus extends CustomEvent {
    detail: BalNumberInputFocusDetail
    target: HTMLBalNumberInputElement
  }
}
