/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalButtonGroupPosition = 'right' | 'center' | ''
  export type BalButtonGroupDirection = 'auto' | 'row' | 'column'
  export type BalButtonColor =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-purple'
    | 'tertiary-red'
    | 'tertiary-yellow'
    | 'tertiary-green'
    | 'link'
    | 'light'
    | 'success'
    | 'warning'
    | 'danger'
    | 'text' // deprecated
    | 'info' // deprecated
    | 'primary-light' // deprecated
    | 'info-light' // deprecated
  export type BalButtonElementType = 'button' | 'reset' | 'submit'
  export type BalButtonSize = 'small' | ''
  export type BalButtonTarget = '_blank' | ' _parent' | '_self' | '_top'
  export type BalButtonAria = {
    controls?: string
    title?: string
    label?: string
    haspopup?: string
  }
}

namespace BalEvents {
  export interface BalButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalButtonElement
  }

  export type BalButtonBlurDetail = void
  export type BalButtonBlur = BalButtonCustomEvent<BalButtonBlurDetail>

  export type BalButtonFocusDetail = void
  export type BalButtonFocus = BalButtonCustomEvent<BalButtonFocusDetail>

  export type BalButtonNavigateDetail = MouseEvent
  export type BalButtonNavigate = BalButtonCustomEvent<BalButtonNavigateDetail>

  export type BalButtonDidRenderDetail = void
  export type BalButtonDidRender = BalButtonCustomEvent<BalButtonDidRenderDetail>
}
