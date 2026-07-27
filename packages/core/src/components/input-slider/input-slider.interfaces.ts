import { InputColor } from '../input/input.interfaces'

export type { InputColor }

export interface InputSliderCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsInputSliderElement
}

export type InputSliderChangeDetail = number
export type InputSliderChange = InputSliderCustomEvent<InputSliderChangeDetail>

export type InputSliderInputDetail = number
export type InputSliderInput = InputSliderCustomEvent<InputSliderInputDetail>

export type InputSliderBlurDetail = FocusEvent
export type InputSliderBlur = InputSliderCustomEvent<InputSliderBlurDetail>

export type InputSliderFocusDetail = FocusEvent
export type InputSliderFocus = InputSliderCustomEvent<InputSliderFocusDetail>

export type InputSliderClickDetail = MouseEvent
export type InputSliderClick = InputSliderCustomEvent<InputSliderClickDetail>
