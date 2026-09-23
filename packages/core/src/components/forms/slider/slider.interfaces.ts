import { InputColor } from '../input/input.interfaces'

export type { InputColor }

export const SLIDER_BRAND_COLORS = ['yellow', 'purple', 'red', 'green'] as const
export type SliderBrandColor = (typeof SLIDER_BRAND_COLORS)[number]

export interface SliderCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsSliderElement
}

export type SliderChangeDetail = number
export type SliderChange = SliderCustomEvent<SliderChangeDetail>

export type SliderInputDetail = number
export type SliderInput = SliderCustomEvent<SliderInputDetail>

export type SliderBlurDetail = FocusEvent
export type SliderBlur = SliderCustomEvent<SliderBlurDetail>

export type SliderFocusDetail = FocusEvent
export type SliderFocus = SliderCustomEvent<SliderFocusDetail>

export type SliderClickDetail = MouseEvent
export type SliderClick = SliderCustomEvent<SliderClickDetail>
