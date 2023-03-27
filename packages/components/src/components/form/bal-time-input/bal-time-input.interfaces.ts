/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalTimeInputChangeDetail = string | undefined
  export interface BalTimeInputChange extends CustomEvent {
    detail: BalTimeInputChangeDetail
    target: HTMLBalTimeInputElement
  }
  export type BalTimeInputInputDetail = string | undefined
  export interface BalTimeInputInput extends CustomEvent {
    detail: BalTimeInputInputDetail
    target: HTMLBalTimeInputElement
  }

  export type BalTimeInputBlurDetail = FocusEvent
  export interface BalTimeInputBlur extends CustomEvent {
    detail: BalTimeInputBlurDetail
    target: HTMLBalTimeInputElement
  }

  export type BalTimeInputKeyPressDetail = KeyboardEvent
  export interface BalTimeInputKeyPress extends CustomEvent {
    detail: BalTimeInputKeyPressDetail
    target: HTMLBalTimeInputElement
  }

  export type BalTimeInputFocusDetail = FocusEvent
  export interface BalTimeInputFocus extends CustomEvent {
    detail: BalTimeInputFocusDetail
    target: HTMLBalTimeInputElement
  }

  export type BalTimeInputClickDetail = MouseEvent
  export interface BalTimeInputClick extends CustomEvent {
    detail: BalTimeInputClickDetail
    target: HTMLBalTimeInputElement
  }
}
