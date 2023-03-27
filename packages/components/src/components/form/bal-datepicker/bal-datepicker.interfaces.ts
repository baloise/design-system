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

  export type BalDatepickerBlurDetail = FocusEvent
  export interface BalDatepickerBlur extends CustomEvent {
    detail: BalDatepickerBlurDetail
    target: HTMLBalDatepickerElement
  }

  export type BalDatepickerFocusDetail = FocusEvent
  export interface BalDatepickerFocus extends CustomEvent {
    detail: BalDatepickerFocusDetail
    target: HTMLBalDatepickerElement
  }

  export type BalDatepickerInputClickDetail = MouseEvent
  export interface BalDatepickerInputClick extends CustomEvent {
    detail: BalDatepickerInputClickDetail
    target: HTMLBalDatepickerElement
  }

  export type BalDatepickerIconClickDetail = MouseEvent
  export interface BalDatepickerIconClick extends CustomEvent {
    detail: BalDatepickerIconClickDetail
    target: HTMLBalDatepickerElement
  }
}
