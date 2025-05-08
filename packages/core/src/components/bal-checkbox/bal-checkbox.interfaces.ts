/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalCheckboxGroupInterface = 'checkbox' | 'switch' | 'button' | 'tile'
  export type BalCheckboxGroupColumns = 1 | 2 | 3 | 4
  export type BalCheckboxTileColor = '' | 'purple' | 'green' | 'yellow' | 'red'
  export type BalCheckboxInterface = BalCheckboxGroupInterface
}

namespace BalEvents {
  export interface BalCheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalCheckboxElement
  }

  export type BalCheckboxChangeDetail = boolean
  export type BalCheckboxChange = BalCheckboxCustomEvent<BalCheckboxChangeDetail>

  export type BalCheckboxFocusDetail = FocusEvent
  export type BalCheckboxFocus = BalCheckboxCustomEvent<BalCheckboxFocusDetail>

  export type BalCheckboxBlurDetail = FocusEvent
  export type BalCheckboxBlur = BalCheckboxCustomEvent<BalCheckboxBlurDetail>

  export interface BalCheckboxGroupCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalCheckboxGroupElement
  }

  export type BalCheckboxGroupChangeDetail = any[]
  export type BalCheckboxGroupChange = BalCheckboxGroupCustomEvent<BalCheckboxGroupChangeDetail>

  export type BalCheckboxGroupBlurDetail = FocusEvent
  export type BalCheckboxGroupBlur = BalCheckboxGroupCustomEvent<BalCheckboxGroupBlurDetail>

  export type BalCheckboxGroupFocusDetail = FocusEvent
  export type BalCheckboxGroupFocus = BalCheckboxGroupCustomEvent<BalCheckboxGroupFocusDetail>
}
