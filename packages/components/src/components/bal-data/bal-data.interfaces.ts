/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export type BalDataValueClickDetail = MouseEvent
  export interface BalDataValueClick extends CustomEvent {
    detail: BalDataValueClickDetail
    target: HTMLBalDataValueElement
  }

  export type BalDataValueFocusDetail = void
  export interface BalDataValueFocus extends CustomEvent {
    detail: BalDataValueFocusDetail
    target: HTMLBalDataValueElement
  }

  export type BalDataValueBlurDetail = void
  export interface BalDataValueBlur extends CustomEvent {
    detail: BalDataValueBlurDetail
    target: HTMLBalDataValueElement
  }
}
