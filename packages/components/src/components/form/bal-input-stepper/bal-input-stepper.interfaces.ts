/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalInputStepperChangeDetail = number | undefined
  export interface BalInputStepperChange extends CustomEvent {
    detail: BalInputStepperChangeDetail
    target: HTMLBalInputStepperElement
  }

  export type BalInputStepperInputDetail = number | undefined
  export interface BalInputStepperInput extends CustomEvent {
    detail: BalInputStepperInputDetail
    target: HTMLBalInputStepperElement
  }

  export type BalInputStepperIncreaseDetail = number | undefined
  export interface BalInputStepperIncrease extends CustomEvent {
    detail: BalInputStepperIncreaseDetail
    target: HTMLBalInputStepperElement
  }

  export type BalInputStepperDecreaseDetail = number | undefined
  export interface BalInputStepperDecrease extends CustomEvent {
    detail: BalInputStepperDecreaseDetail
    target: HTMLBalInputStepperElement
  }
}
