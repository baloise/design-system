/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalPaginationInterface = '' | 'small'
}

namespace BalEvents {
  export type BalPaginationChangeDetail = number
  export interface BalPaginationChange extends CustomEvent {
    detail: BalPaginationChangeDetail
    target: HTMLBalPaginationElement
  }
}
