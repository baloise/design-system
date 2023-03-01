/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalInputStepperChangeDetail = number | undefined
  export type BalInputStepperChange = CustomEvent<BalInputStepperChangeDetail>
  export type BalInputStepperInputDetail = number | undefined
  export type BalInputStepperInput = CustomEvent<BalInputStepperInputDetail>
}
