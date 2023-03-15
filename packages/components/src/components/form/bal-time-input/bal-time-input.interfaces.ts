/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalEvents {
  export type BalInputTimeChangeDetail = string | undefined
  export type BalInputTimeChange = CustomEvent<BalInputTimeChangeDetail>
  export type BalInputTimeInputDetail = string | undefined
  export type BalInputTimeInput = CustomEvent<BalInputTimeInputDetail>
}
