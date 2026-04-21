/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type RadioGroupColumns = 1 | 2 | 3 | 4
  export type RadioTileColor = '' | 'purple' | 'green' | 'yellow' | 'red'
  export type RadioLabelPosition = 'left' | 'top' | 'right'

  export interface RadioCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsRadioElement
  }

  export type RadioChangeDetail = boolean
  export type RadioChange = RadioCustomEvent<RadioChangeDetail>

  export type RadioFocusDetail = FocusEvent
  export type RadioFocus = RadioCustomEvent<RadioFocusDetail>

  export type RadioBlurDetail = FocusEvent
  export type RadioBlur = RadioCustomEvent<RadioBlurDetail>

  export interface RadioGroupCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsRadioGroupElement
  }

  export type RadioGroupChangeDetail = boolean
  export type RadioGroupChange = RadioGroupCustomEvent<RadioGroupChangeDetail>

  export type RadioGroupFocusDetail = FocusEvent
  export type RadioGroupFocus = RadioGroupCustomEvent<RadioGroupFocusDetail>

  export type RadioGroupBlurDetail = FocusEvent
  export type RadioGroupBlur = RadioGroupCustomEvent<RadioGroupBlurDetail>
}
