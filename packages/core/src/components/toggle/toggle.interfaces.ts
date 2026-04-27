/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type ToggleGroupColumns = 1 | 2 | 3 | 4
  export type ToggleTileColor = '' | 'purple' | 'green' | 'yellow' | 'red'
  export type ToggleLabelPosition = 'left' | 'top' | 'right'

  export interface ToggleCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsToggleElement
  }

  export type ToggleChangeDetail = boolean
  export type ToggleChange = ToggleCustomEvent<ToggleChangeDetail>

  export type ToggleFocusDetail = FocusEvent
  export type ToggleFocus = ToggleCustomEvent<ToggleFocusDetail>

  export type ToggleBlurDetail = FocusEvent
  export type ToggleBlur = ToggleCustomEvent<ToggleBlurDetail>

  // export interface ToggleGroupCustomEvent<T> extends CustomEvent<T> {
  //   detail: T
  //   target: HTMLDsToggleGroupElement
  // }

  // export type ToggleGroupChangeDetail = boolean
  // export type ToggleGroupChange = ToggleGroupCustomEvent<ToggleGroupChangeDetail>

  // export type ToggleGroupFocusDetail = FocusEvent
  // export type ToggleGroupFocus = ToggleGroupCustomEvent<ToggleGroupFocusDetail>

  // export type ToggleGroupBlurDetail = FocusEvent
  // export type ToggleGroupBlur = ToggleGroupCustomEvent<ToggleGroupBlurDetail>
}
