import { InputColor } from '../input/input.interfaces'

export type { InputColor }

export interface InputStepperCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsInputStepperElement
}

export type InputStepperChangeDetail = number
export type InputStepperChange = InputStepperCustomEvent<InputStepperChangeDetail>

export type InputStepperInputDetail = number
export type InputStepperInput = InputStepperCustomEvent<InputStepperInputDetail>

export type InputStepperIncreaseDetail = number
export type InputStepperIncrease = InputStepperCustomEvent<InputStepperIncreaseDetail>

export type InputStepperDecreaseDetail = number
export type InputStepperDecrease = InputStepperCustomEvent<InputStepperDecreaseDetail>

export type InputStepperFocusDetail = void
export type InputStepperFocus = InputStepperCustomEvent<InputStepperFocusDetail>

export type InputStepperBlurDetail = void
export type InputStepperBlur = InputStepperCustomEvent<InputStepperBlurDetail>
