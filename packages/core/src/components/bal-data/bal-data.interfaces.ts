/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export interface BalDataValueCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalDataValueElement
  }

  export type BalDataValueClickDetail = MouseEvent
  export type BalDataValueClick = BalDataValueCustomEvent<BalDataValueClickDetail>

  export type BalDataValueFocusDetail = void
  export type BalDataValueFocus = BalDataValueCustomEvent<BalDataValueFocusDetail>

  export type BalDataValueBlurDetail = void
  export type BalDataValueBlur = BalDataValueCustomEvent<BalDataValueBlurDetail>
}
