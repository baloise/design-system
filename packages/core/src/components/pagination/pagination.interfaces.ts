/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  // --- Props types ---
  export const PAGINATION_SIZES = ['', 'sm'] as const
  export const PAGINATION_VARIANTS = ['', 'dots'] as const
  export const PAGINATION_ALIGNMENTS = ['', 'end', 'start'] as const

  export type PaginationSize = (typeof PAGINATION_SIZES)[number]
  export type PaginationVariant = (typeof PAGINATION_VARIANTS)[number]
  export type PaginationAlignment = (typeof PAGINATION_ALIGNMENTS)[number]

  // --- Event types ---
  export interface PaginationCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsPaginationElement
  }

  export type PaginationChangeDetail = number
  export type PaginationChange = PaginationCustomEvent<PaginationChangeDetail>
}
