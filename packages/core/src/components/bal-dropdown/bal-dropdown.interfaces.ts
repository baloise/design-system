/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalDropdownSize = '' | 'small'
  export type BalDropdownTheme = '' | 'purple'
}

namespace BalEvents {
  export interface BalDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalDropdownElement
  }

  export type BalDropdownChangeDetail = string | string[]
  export type BalDropdownChange = BalDropdownCustomEvent<BalDropdownChangeDetail>

  export type BalDropdownBlurDetail = FocusEvent
  export type BalDropdownBlur = BalDropdownCustomEvent<BalDropdownBlurDetail>

  export type BalDropdownFocusDetail = FocusEvent
  export type BalDropdownFocus = BalDropdownCustomEvent<BalDropdownFocusDetail>
}
