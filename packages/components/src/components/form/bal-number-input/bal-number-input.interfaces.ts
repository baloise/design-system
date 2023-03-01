/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalInputNumberChangeDetail = number | undefined
  export type BalInputNumberChange = CustomEvent<BalInputNumberChangeDetail>
  export type BalInputNumberInputDetail = number | undefined
  export type BalInputNumberInput = CustomEvent<BalInputNumberInputDetail>
}
