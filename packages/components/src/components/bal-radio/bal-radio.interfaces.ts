/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalRadioGroupInterface = 'radio' | 'select-button'
  export type BalRadioGroupColumns = 1 | 2 | 3 | 4
  export type BalRadioButtonColor = '' | 'purple' | 'green' | 'yellow' | 'red'
  export type BalRadioInterface = BalRadioGroupInterface
}

namespace BalEvents {
  export interface BalRadioCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalRadioElement
  }

  export type BalRadioChangeDetail = boolean
  export type BalRadioChange = BalRadioCustomEvent<BalRadioChangeDetail>

  export type BalRadioBlurDetail = FocusEvent
  export type BalRadioBlur = BalRadioCustomEvent<BalRadioBlurDetail>

  export type BalRadioFocusDetail = FocusEvent
  export type BalRadioFocus = BalRadioCustomEvent<BalRadioFocusDetail>

  export interface BalRadioGroupCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalRadioGroupElement
  }

  export type BalRadioGroupChangeDetail = number | string | boolean
  export type BalRadioGroupChange = BalRadioGroupCustomEvent<BalRadioGroupChangeDetail>

  export type BalRadioGroupBlurDetail = FocusEvent
  export type BalRadioGroupBlur = BalRadioGroupCustomEvent<BalRadioGroupBlurDetail>

  export type BalRadioGroupFocusDetail = FocusEvent
  export type BalRadioGroupFocus = BalRadioGroupCustomEvent<BalRadioGroupFocusDetail>

  export interface BalRadioButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalRadioButtonElement
  }

  export type BalRadioButtonBlurDetail = FocusEvent
  export type BalRadioButtonBlur = BalRadioButtonCustomEvent<BalRadioButtonBlurDetail>

  export type BalRadioButtonFocusDetail = FocusEvent
  export type BalRadioButtonFocus = BalRadioButtonCustomEvent<BalRadioButtonFocusDetail>

  export type BalRadioButtonAriaLabelledByDetail = HTMLElement
  export type BalRadioButtonAriaLabelledBy = BalRadioButtonCustomEvent<BalRadioButtonAriaLabelledByDetail>
}
