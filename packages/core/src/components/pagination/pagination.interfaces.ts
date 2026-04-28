/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  // --- Props types ---
  export type PaginationSize = '' | 'sm'
  export type PaginationVariant = '' | 'dots'
  export type PaginationAlignment = '' | 'end' | 'start'

  // --- Event types ---
  export interface PaginationCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsPaginationElement
  }

  export type PaginationChangeDetail = number
  export type PaginationChange = PaginationCustomEvent<PaginationChangeDetail>
}
