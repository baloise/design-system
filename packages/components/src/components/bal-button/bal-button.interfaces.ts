/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalButtonGroupPosition = 'right' | 'center' | ''
  export type BalButtonGroupDirection = 'auto' | 'row' | 'column'
  export type BalButtonColor =
    | 'text'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'link'
    | 'light'
    | 'primary-light'
    | 'info-light'
  export type BalButtonElementType = 'button' | 'reset' | 'submit'
  export type BalButtonSize = 'small' | ''
  export type BalButtonTarget = '_blank' | ' _parent' | '_self' | '_top'
}

namespace BalEvents {
  export type BalButtonBlurDetail = void
  export interface BalButtonBlur extends CustomEvent {
    detail: BalButtonBlurDetail
    target: HTMLBalButtonElement
  }

  export type BalButtonFocusDetail = void
  export interface BalButtonFocus extends CustomEvent {
    detail: BalButtonFocusDetail
    target: HTMLBalButtonElement
  }

  export type BalButtonNavigateDetail = MouseEvent
  export interface BalButtonNavigate extends CustomEvent {
    detail: BalButtonNavigateDetail
    target: HTMLBalButtonElement
  }

  export type BalButtonDidRenderDetail = void
  export interface BalButtonDidRender extends CustomEvent {
    detail: BalButtonDidRenderDetail
    target: HTMLBalButtonElement
  }
}
