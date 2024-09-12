/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalSegmentValue = string | number;
}

namespace BalEvents {


  export interface BalSegmentCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalSegmentElement
  }

  export type BalSegmentChangeDetail = BalProps.BalSegmentValue
  export type BalSegmentChange = BalSegmentCustomEvent<BalSegmentChangeDetail>
}
