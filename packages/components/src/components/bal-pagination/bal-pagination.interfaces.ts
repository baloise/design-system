/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalPaginationSize = '' | 'small'
  export type BalPaginationInterface = '' | 'small'
  export type BalPaginationAlignment = '' | 'end' | 'start'
}

namespace BalEvents {
  export interface BalPaginationCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalPaginationElement
  }

  export type BalPaginationChangeDetail = number
  export type BalPaginationChange = BalPaginationCustomEvent<BalPaginationChangeDetail>
}
