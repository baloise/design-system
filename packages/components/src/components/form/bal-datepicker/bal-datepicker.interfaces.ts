/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalDatepickerCallback = (dateString: string) => boolean
}

namespace BalEvents {
  export type BalDatepickerChangeDetail = string | undefined
  export interface BalDatepickerChange extends CustomEvent {
    detail: BalDatepickerChangeDetail
    target: HTMLBalDatepickerElement
  }

  export type BalDatepickerInputDetail = string | undefined
  export interface BalDatepickerInput extends CustomEvent {
    detail: BalDatepickerInputDetail
    target: HTMLBalDatepickerElement
  }
}
