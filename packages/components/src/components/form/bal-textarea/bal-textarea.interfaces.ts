/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalTextareaWrap = 'hard' | 'soft' | 'off'
  export type BalTextareaInputMode = BalInputInputMode
}

namespace BalEvents {
  export type BalTextareaChangeDetail = string | undefined
  export type BalTextareaChange = CustomEvent<BalTextareaChangeDetail>
  export type BalTextareaInputDetail = string | undefined
  export type BalTextareaInput = CustomEvent<BalTextareaInputDetail>
}
