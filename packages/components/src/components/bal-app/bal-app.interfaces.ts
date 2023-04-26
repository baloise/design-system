/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export interface BalAppCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalAppElement
  }

  export type BalAppLoadDetail = boolean
  export type BalAppLoad = BalAppCustomEvent<BalAppLoadDetail>
}
