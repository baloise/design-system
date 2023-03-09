/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalDatepickerCallback = (dateString: string) => boolean
}

namespace BalEvents {
  export type BalDatepickerChangeDetail = string | undefined
  export type BalDatepickerChange = CustomEvent<BalDatepickerChangeDetail>
  export type BalDatepickerInputDetail = string | undefined
  export type BalDatepickerInput = CustomEvent<BalDatepickerInputDetail>
}
