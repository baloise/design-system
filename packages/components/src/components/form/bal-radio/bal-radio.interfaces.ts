/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalRadioGroupInterface = 'radio' | 'select-button'
  export type BalRadioInterface = BalRadioGroupInterface
}

namespace BalEvents {
  export type BalRadioChangeDetail = boolean
  export interface BalRadioChange extends CustomEvent {
    detail: BalRadioChangeDetail
    target: HTMLBalRadioElement
  }

  export type BalRadioBlurDetail = FocusEvent
  export interface BalRadioBlur extends CustomEvent {
    detail: BalRadioBlurDetail
    target: HTMLBalRadioElement
  }

  export type BalRadioFocusDetail = FocusEvent
  export interface BalRadioFocus extends CustomEvent {
    detail: BalRadioFocusDetail
    target: HTMLBalRadioElement
  }

  export type BalRadioGroupChangeDetail = number | string | boolean
  export interface BalRadioGroupChange extends CustomEvent {
    detail: BalRadioGroupChangeDetail
    target: HTMLBalRadioGroupElement
  }

  export type BalRadioGroupBlurDetail = FocusEvent
  export interface BalRadioGroupBlur extends CustomEvent {
    detail: BalRadioGroupBlurDetail
    target: HTMLBalRadioGroupElement
  }

  export type BalRadioGroupFocusDetail = FocusEvent
  export interface BalRadioGroupFocus extends CustomEvent {
    detail: BalRadioGroupFocusDetail
    target: HTMLBalRadioGroupElement
  }

  export type BalRadioGroupInputDetail = FocusEvent
  export interface BalRadioGroupInput extends CustomEvent {
    detail: BalRadioGroupInputDetail
    target: HTMLBalRadioGroupElement
  }
}
