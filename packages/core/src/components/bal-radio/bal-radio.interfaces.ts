/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalRadioGroupInterface = 'radio' | 'button' | 'tile'
  export type BalRadioGroupColumns = 1 | 2 | 3 | 4
  export type BalRadioTileColor = '' | 'purple' | 'green' | 'yellow' | 'red'
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
}
