/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalSelectFilter = 'includes' | 'starts-with'
}

namespace BalEvents {
  export type BalSelectChangeDetail = string | string[] | undefined
  export interface BalSelectChange extends CustomEvent {
    detail: BalSelectChangeDetail
    target: HTMLBalSelectElement
  }

  export type BalSelectBlurDetail = FocusEvent
  export interface BalSelectBlur extends CustomEvent {
    detail: BalSelectBlurDetail
    target: HTMLBalSelectElement
  }

  export type BalSelectKeyPressDetail = KeyboardEvent
  export interface BalSelectKeyPress extends CustomEvent {
    detail: BalSelectKeyPressDetail
    target: HTMLBalSelectElement
  }

  export type BalSelectFocusDetail = FocusEvent
  export interface BalSelectFocus extends CustomEvent {
    detail: BalSelectFocusDetail
    target: HTMLBalSelectElement
  }

  export type BalSelectInputDetail = string
  export interface BalSelectInput extends CustomEvent {
    detail: BalSelectInputDetail
    target: HTMLBalSelectElement
  }

  export type BalSelectInputClickDetail = MouseEvent
  export interface BalSelectInputClick extends CustomEvent {
    detail: BalSelectInputClickDetail
    target: HTMLBalSelectElement
  }

  export type BalSelectCancelDetail = KeyboardEvent
  export interface BalSelectCancel extends CustomEvent {
    detail: BalSelectCancelDetail
    target: HTMLBalSelectElement
  }
}
