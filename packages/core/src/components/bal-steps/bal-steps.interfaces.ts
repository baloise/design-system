/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalStepsColor = 'primary' | 'light-blue' | 'purple' | 'yellow' | 'red' | 'green'
}

namespace BalEvents {
  export interface BalStepsCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalStepsElement
  }

  export type BalStepsChangeDetail = string | undefined
  export type BalStepsChange = BalStepsCustomEvent<BalStepsChangeDetail>

  export interface BalStepItemCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalStepItemElement
  }

  export type BalStepItemNavigateDetail = MouseEvent
  export type BalStepItemNavigate = BalStepsCustomEvent<BalStepItemNavigateDetail>
}
