/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type CheckboxGroupColumns = 1 | 2 | 3 | 4
  export type CheckboxTileColor = '' | 'purple' | 'green' | 'yellow' | 'red'
  export type CheckboxLabelPosition = 'left' | 'top' | 'right'

  export interface CheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsCheckboxElement
  }

  export type CheckboxChangeDetail = boolean
  export type CheckboxChange = CheckboxCustomEvent<CheckboxChangeDetail>

  export type CheckboxFocusDetail = FocusEvent
  export type CheckboxFocus = CheckboxCustomEvent<CheckboxFocusDetail>

  export type CheckboxBlurDetail = FocusEvent
  export type CheckboxBlur = CheckboxCustomEvent<CheckboxBlurDetail>

  export interface CheckboxGroupCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsCheckboxGroupElement
  }

  export type CheckboxGroupChangeDetail = any[]
  export type CheckboxGroupChange = CheckboxGroupCustomEvent<CheckboxGroupChangeDetail>

  export type CheckboxGroupFocusDetail = FocusEvent
  export type CheckboxGroupFocus = CheckboxGroupCustomEvent<CheckboxGroupFocusDetail>

  export type CheckboxGroupBlurDetail = FocusEvent
  export type CheckboxGroupBlur = CheckboxGroupCustomEvent<CheckboxGroupBlurDetail>
}
