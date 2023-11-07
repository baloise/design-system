/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export interface BalInputStepperCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalInputStepperElement
  }

  export type BalInputStepperChangeDetail = number | undefined
  export type BalInputStepperChange = BalInputStepperCustomEvent<BalInputStepperChangeDetail>

  export type BalInputStepperInputDetail = number | undefined
  export type BalInputStepperInput = BalInputStepperCustomEvent<BalInputStepperInputDetail>

  export type BalInputStepperIncreaseDetail = number | undefined
  export type BalInputStepperIncrease = BalInputStepperCustomEvent<BalInputStepperIncreaseDetail>

  export type BalInputStepperDecreaseDetail = number | undefined
  export type BalInputStepperDecrease = BalInputStepperCustomEvent<BalInputStepperDecreaseDetail>

  export type BalInputStepperBlurDetail = FocusEvent
  export type BalInputStepperBlur = BalInputStepperCustomEvent<BalInputStepperBlurDetail>

  export type BalInputStepperFocusDetail = FocusEvent
  export type BalInputStepperFocus = BalInputStepperCustomEvent<BalInputStepperFocusDetail>
}
