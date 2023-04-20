/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalCheckboxGroupInterface = 'checkbox' | 'select-button' | 'switch'
  export type BalCheckboxGroupColumns = 1 | 2 | 3 | 4
  export type BalCheckboxButtonColor = '' | 'purple' | 'green' | 'yellow' | 'red'
  export type BalCheckboxInterface = BalCheckboxGroupInterface
}

namespace BalEvents {
  export type BalCheckboxChangeDetail = boolean
  export interface BalCheckboxChange extends CustomEvent {
    detail: BalCheckboxChangeDetail
    target: HTMLBalCheckboxElement
  }

  export type BalCheckboxGroupChangeDetail = any[]
  export interface BalCheckboxGroupChange extends CustomEvent {
    detail: BalCheckboxGroupChangeDetail
    target: HTMLBalCheckboxGroupElement
  }

  export type BalCheckboxFocusDetail = FocusEvent
  export interface BalCheckboxFocus extends CustomEvent {
    detail: BalCheckboxFocusDetail
    target: HTMLBalCheckboxElement
  }

  export type BalCheckboxBlurDetail = FocusEvent
  export interface BalCheckboxBlur extends CustomEvent {
    detail: BalCheckboxBlurDetail
    target: HTMLBalCheckboxElement
  }
}
