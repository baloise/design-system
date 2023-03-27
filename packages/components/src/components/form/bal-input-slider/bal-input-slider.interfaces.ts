/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalInputSliderChangeDetail = string | number | null
  export interface BalInputSliderChange extends CustomEvent {
    detail: BalInputSliderChangeDetail
    target: HTMLBalInputSliderElement
  }

  export type BalInputSliderInputDetail = string | number | null
  export interface BalInputSliderInput extends CustomEvent {
    detail: BalInputSliderInputDetail
    target: HTMLBalInputSliderElement
  }

  export type BalInputSliderBlurDetail = FocusEvent
  export interface BalInputSliderBlur extends CustomEvent {
    detail: BalInputSliderBlurDetail
    target: HTMLBalInputSliderElement
  }

  export type BalInputSliderKeyPressDetail = KeyboardEvent
  export interface BalInputSliderKeyPress extends CustomEvent {
    detail: BalInputSliderKeyPressDetail
    target: HTMLBalInputSliderElement
  }

  export type BalInputSliderFocusDetail = FocusEvent
  export interface BalInputSliderFocus extends CustomEvent {
    detail: BalInputSliderFocusDetail
    target: HTMLBalInputSliderElement
  }
}
