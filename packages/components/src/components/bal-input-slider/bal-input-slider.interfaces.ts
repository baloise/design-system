/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export interface BalInputSliderCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalInputSliderElement
  }

  export type BalInputSliderChangeDetail = string | number | null
  export type BalInputSliderChange = BalInputSliderCustomEvent<BalInputSliderChangeDetail>

  export type BalInputSliderInputDetail = string | number | null
  export type BalInputSliderInput = BalInputSliderCustomEvent<BalInputSliderInputDetail>

  export type BalInputSliderBlurDetail = FocusEvent
  export type BalInputSliderBlur = BalInputSliderCustomEvent<BalInputSliderBlurDetail>

  export type BalInputSliderKeyPressDetail = KeyboardEvent
  export type BalInputSliderKeyPress = BalInputSliderCustomEvent<BalInputSliderKeyPressDetail>

  export type BalInputSliderFocusDetail = FocusEvent
  export type BalInputSliderFocus = BalInputSliderCustomEvent<BalInputSliderFocusDetail>
}
