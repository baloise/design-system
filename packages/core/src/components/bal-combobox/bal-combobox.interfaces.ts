/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {}

namespace BalEvents {
  export interface BalComboboxCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalComboboxElement
  }

  export type BalComboboxChangeDetail = string | string[]
  export type BalComboboxChange = BalComboboxCustomEvent<BalComboboxChangeDetail>

  export type BalComboboxBlurDetail = FocusEvent
  export type BalComboboxBlur = BalComboboxCustomEvent<BalComboboxBlurDetail>

  export type BalComboboxFocusDetail = FocusEvent
  export type BalComboboxFocus = BalComboboxCustomEvent<BalComboboxFocusDetail>
}
